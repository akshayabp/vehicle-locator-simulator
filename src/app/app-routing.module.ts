import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RouteListComponent} from './route/route-list.component';
import {RouteDetailComponent} from './route/route-detail.component';


const routes: Routes = [
  
  {
    path: 'routes', 
    component: RouteListComponent
  },
   {
    path: 'route', 
    component: RouteDetailComponent
  },
  {
    path: 'route/:id', 
    component: RouteDetailComponent
  }, 
   
  {
    path: '', redirectTo: 'routes', 
    pathMatch: 'full'
  },
  {
    path: '**', component: RouteListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
