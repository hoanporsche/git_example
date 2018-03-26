import { TimekeepingStatusListComponent } from './page/timekeeping-status-list/timekeeping-status-list.component';
import { Routes, RouterModule } from "@angular/router";
import { TimekeepingStatusComponent } from "./timekeeping-status.component";
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path: '',
    component: TimekeepingStatusComponent,
    children: [
      { path: '', component: TimekeepingStatusListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimekeepingStatusRoutingModule { }