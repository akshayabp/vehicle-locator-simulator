import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import {RouteListComponent} from './route/route-list.component';
import {RouteDetailComponent} from './route/route-detail.component';


import { AppRoutingModule } from './app-routing.module';
import {MockRouteService} from './route/mock-route-service';




@NgModule({
  declarations: [
    AppComponent,
    RouteListComponent,
    RouteDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MockRouteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
