import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimekeepingCreateComponent } from './page/timekeeping-create/timekeeping-create.component';
import { TimekeepingDetailComponent } from './page/timekeeping-detail/timekeeping-detail.component';
import { TimekeepingListComponent } from './page/timekeeping-list/timekeeping-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TimekeepingCreateComponent, TimekeepingDetailComponent, TimekeepingListComponent]
})
export class TimekeepingModule { }
