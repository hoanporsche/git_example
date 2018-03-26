import { WorkingCalenderDetailComponent } from './page/working-calender-detail/working-calender-detail.component';
import { WorkingCalenderCreateComponent } from './page/working-calender-create/working-calender-create.component';
import { WorkingCalenderListComponent } from './page/working-calender-list/working-calender-list.component';
import { WorkingCalenderComponent } from './working-calender.component';
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path: '',
    component: WorkingCalenderComponent,
    children: [
      { path: 'create', component: WorkingCalenderCreateComponent},
      { path: 'detail', component: WorkingCalenderDetailComponent},
      { path: '', component: WorkingCalenderListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkingCalenderRoutingModule { }