import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkingCalenderCreateComponent } from './page/working-calender-create/working-calender-create.component';
import { WorkingCalenderDetailComponent } from './page/working-calender-detail/working-calender-detail.component';
import { WorkingCalenderListComponent } from './page/working-calender-list/working-calender-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WorkingCalenderCreateComponent, WorkingCalenderDetailComponent, WorkingCalenderListComponent]
})
export class WorkingCalenderModule { }
