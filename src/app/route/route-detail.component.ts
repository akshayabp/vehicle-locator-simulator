
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';

import { MockRouteService } from './mock-route-service';

import { Marker } from './logfeed';
import { Route } from './route';
import {RouteInfo} from './route-info';
import {Location} from './location';

declare var H: any;

@Component({
    templateUrl: './route-detail.component.html',
    styleUrls: ['./route-detail.component.css']
})
export class RouteDetailComponent implements OnInit {
    mockRoute: Route;

    // google maps zoom level
    zoom: number = 8;

    // initial center position for the map
    lat: number = 42.689883;
    lng: number = -73.848734;

    driverId: number;
    vehicleId: number;

    routeId: string;

    marker: Marker;

    private platform: any;

    private ui: any;

    private map: any;

    private uiMarker: any;

    private panelCollapse: boolean;

    @ViewChild("map")
    public mapElement: ElementRef;

    constructor(private mockRouteService: MockRouteService,
        private route: ActivatedRoute, private router: Router) {
        this.platform = new H.service.Platform({
            "app_id": "yuvy56OxxbpWvOvl7HGv",
            "app_code": "DSJ_bb-9LHfAw1h1Romvtg"
        });
    }

    ngOnInit() {
        let id = +this.route.snapshot.paramMap.get('id');

        if (id) {
            this.mockRouteService.getMockRoute(id).subscribe(mockRoute => {
                this.mockRoute = mockRoute;
            });
        }

        this.panelCollapse = false;
    }

    public ngAfterViewInit() {
        let defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
                zoom: 10,
                center: { lat: this.lat, lng: this.lng }
            }
        );

        let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
        this.ui = H.ui.UI.createDefault(this.map, defaultLayers);

        let that = this;

       
        this.uiMarker = new H.map.Marker({ "lat": 42.689883, "lng": -73.848734 });

        let marker = this.uiMarker;
        

        marker.addEventListener('tap', event => {

           
            let markerData: Marker = event.target.getData();

            let routeId = markerData.route_id;

            this.mockRouteService.getRouteDescription(routeId).subscribe((resp)=>{

                console.log(resp);

                let source:any = resp.source;
                let destination:any = resp.destination;
                let driver:any = resp.driver;

                let bubble =  new H.ui.InfoBubble(event.target.getPosition(), {
                    content: 'Source:' + source.description +'<br/>'+
                    'Destination:' + destination.description +'<br/>'+
                    'Driver ID:'+driver.id+'<br/>'+
                    'Driver Name:'+driver.name
                });
                that.ui.addBubble(bubble);
            }, (error)=>{
                console.log(error);
            });
            
            
        }, false);
        this.map.addObject(marker);

        //group.addObject(marker);

    
    }

    createRoute(): void{
        let source:Location = new Location();
        let destination:Location = new Location();

        source.description = this.mockRoute.source;
        destination.description = this.mockRoute.destination;

        let routeInfo:RouteInfo = new RouteInfo();
        routeInfo.source = source;
        routeInfo.destination =destination;
        routeInfo.driverId = this.mockRoute.driverId;
        routeInfo.vehcileId = this.mockRoute.vehicleId;

        let that = this;

        this.mockRouteService.createRoute(routeInfo).subscribe(routeId => {
            that.routeId = routeId;
        });
    }

    save(): void {
        this.simulateRoute(false);        
    }

    togglePanel():void{
        this.panelCollapse = !this.panelCollapse;
    }

    simulateToSocketService(): void{
        this.simulateRoute(true); 
    }

    simulateRoute(simulateToSocketService: boolean){
        let pathTrackerIndex = 0;

        let that = this;

        let simulateLocationChanging = () => {
            let currentPath = that.mockRoute.path[pathTrackerIndex];

            if (that.marker) {
                that.marker.lat = currentPath.lat;
                that.marker.long = currentPath.lng;
            } else {
                
                that.marker = {
                    lat: currentPath.lat,
                    long: currentPath.lng,
                    route_id: that.routeId,
                    vehicle_id: Number(that.mockRoute.vehicleId),
                    driver_id: Number(that.mockRoute.driverId),
                    lastStop: false
                };
            }

            that.marker.lat = currentPath.lat;
            that.marker.long = currentPath.lng;

            that.uiMarker.setData(that.marker);

            that.uiMarker.setPosition( {lat:currentPath.lat, lng: currentPath.lng} );


            console.log(that.marker);

            if (pathTrackerIndex === that.mockRoute.path.length - 1) {
                that.marker.lastStop = true;
            }

            let observable:Observable<Marker> = null;

            if(simulateToSocketService){
                observable= that.mockRouteService.simulateRouteToSocketService(that.marker);
            }else{
                observable= that.mockRouteService.simulateRoute(that.marker);                
            }

            observable.subscribe(() => {
                pathTrackerIndex++;

                if (pathTrackerIndex < that.mockRoute.path.length) {
                    setTimeout(simulateLocationChanging, 500);
                }
            }, (err) =>{
                pathTrackerIndex++;

                if (pathTrackerIndex < that.mockRoute.path.length) {
                    setTimeout(simulateLocationChanging, 500);
                }
            }
            );

            

        };

        setTimeout(simulateLocationChanging, 500);
    }

    changeCentre(){
        this.map.setCenter({lat:this.lat, lng:this.lng});
    }

    cancel(): void {
        this.router.navigate(['vehicles']);
    }
}

