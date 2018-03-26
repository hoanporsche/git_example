import { StaffCreateComponent } from './page/staff-create/staff-create.component';
import { StaffListComponent } from './page/staff-list/staff-list.component';
import { StaffComponent } from './staff.component';
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { StaffDetailComponent } from './page/staff-detail/staff-detail.component';

const routes: Routes = [
  { 
    path: '',
    component: StaffComponent,
    children: [
      { path: 'detail', component: StaffDetailComponent},
      { path: 'create', component: StaffCreateComponent},
      { path: '', component: StaffListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }