import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import {Route} from './route';
import {ROUTE_MOCKS} from './mock-routes';

@Component({
    templateUrl: './route-list.component.html'
})
export class RouteListComponent implements OnInit {

    mockRoutes: Route[];

    constructor(private router: Router) { }

    ngOnInit() {
        this.mockRoutes= ROUTE_MOCKS;
    }
    
}