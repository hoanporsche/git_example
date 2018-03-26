import { TimekeepingDetailComponent } from './page/timekeeping-detail/timekeeping-detail.component';
import { TimekeepingListComponent } from './page/timekeeping-list/timekeeping-list.component';
import { Routes, RouterModule } from "@angular/router";
import { TimekeepingComponent } from "./timekeeping.component";
import { NgModule } from '@angular/core';
import { TimekeepingCreateComponent } from './page/timekeeping-create/timekeeping-create.component';

const routes: Routes = [
  { 
    path: '',
    component: TimekeepingComponent,
    children: [
      { path: 'create', component: TimekeepingCreateComponent},
      { path: 'detail', component: TimekeepingDetailComponent},
      { path: '', component: TimekeepingListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimekeepingRoutingModule { }