import { StaffListComponent } from './page/staff-list/staff-list.component';
import { StaffComponent } from './staff.component';
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path: '',
    component: StaffComponent,
    children: [
      { path: '', component: StaffListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }