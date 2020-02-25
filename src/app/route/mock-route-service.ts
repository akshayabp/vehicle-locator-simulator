import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {Route} from './route';
import {HOSTNAME, PUBLISHER_PORT, WEBSOCKET_HOSTNAME, WEBSOCKET_PORT, ROUTESERVICE_HOSTNAME, ROUTESERVICE_PORT} from '../../environments/environment';
import {Marker} from './logfeed';
import { RouteInfo } from './route-info';

@Injectable()
export class MockRouteService {
    constructor(private http: HttpClient) {
    }

    getMockRoute(id: number): Observable<Route> {
        //return this.http.get<Product>(API_URL + id.toString());
        return this.http.get<Route>('/assets/route' + id.toString()+'.json');
    }

    getRouteDescription(id:string):Observable<any> {
        return this.http.get<any>('http://'+HOSTNAME+':'+8088+'/route/'+id);
    }

    simulateRoute(marker: Marker):  Observable<Marker>{
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        //return this.http.post<Marker>('http://'+HOSTNAME+':'+PUBLISHER_PORT+'/log-feed/', marker, options);     
        return this.http.post<Marker>('/logfeed-api/log-feed/', marker, options);
    }

    simulateRouteToSocketService(marker: Marker):  Observable<Marker>{
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };        
        //return this.http.post<Marker>('http://'+WEBSOCKET_HOSTNAME+':'+WEBSOCKET_PORT+'/log/', marker, options);  
        return this.http.post<Marker>('/websocket-api/log/', marker, options);     
    }
    
    createRoute(route: RouteInfo): Observable<string> {
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json' };
        //return this.http.post<string>('http://'+ROUTESERVICE_HOSTNAME+':'+ROUTESERVICE_PORT+'/route/', route, options);
        return this.http.post<string>('/route-api/route/', route, options);
        
    }


}