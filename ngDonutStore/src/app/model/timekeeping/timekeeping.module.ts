import { TimekeepingComponent } from './timekeeping.component';
import { TimekeepingService } from './service/timekeeping.service';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimekeepingCreateComponent } from './page/timekeeping-create/timekeeping-create.component';
import { TimekeepingDetailComponent } from './page/timekeeping-detail/timekeeping-detail.component';
import { TimekeepingListComponent } from './page/timekeeping-list/timekeeping-list.component';
import { TimekeepingRoutingModule } from './timekeeping.routing';

@NgModule({
  imports: [
    CommonModule,
    TimekeepingRoutingModule,
    SharedModule,
  ],
  declarations: [
    TimekeepingComponent,
    TimekeepingCreateComponent, 
    TimekeepingDetailComponent, 
    TimekeepingListComponent
  ],
  providers: [
    TimekeepingService
  ]
})
export class TimekeepingModule { }
