import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimekeepingStatusCreateComponent } from './page/timekeeping-status-create/timekeeping-status-create.component';
import { TimekeepingStatusDetailComponent } from './page/timekeeping-status-detail/timekeeping-status-detail.component';
import { TimekeepingStatusListComponent } from './page/timekeeping-status-list/timekeeping-status-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TimekeepingStatusCreateComponent, 
    TimekeepingStatusDetailComponent, 
    TimekeepingStatusListComponent
  ]
})
export class TimekeepingStautsModule { }
