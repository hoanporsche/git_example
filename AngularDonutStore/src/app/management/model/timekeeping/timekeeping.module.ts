import { TimekeepingStatusService } from './../timekeeping-status/service/timekeeping-status.service';
import { TimekeepingComponent } from './timekeeping.component';
import { TimekeepingService } from './service/timekeeping.service';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { TimekeepingCreateComponent } from './page/timekeeping-create/timekeeping-create.component';
import { TimekeepingDetailComponent } from './page/timekeeping-detail/timekeeping-detail.component';
import { TimekeepingListComponent } from './page/timekeeping-list/timekeeping-list.component';
import { TimekeepingRoutingModule } from './timekeeping.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreService } from '../store/service/store.service';
import { StaffService } from '../staff/service/staff.service';

@NgModule({
  imports: [
    NgbModule,
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
    TimekeepingService,
    StoreService,
    StaffService,
    TimekeepingStatusService,
  ]
})
export class TimekeepingModule { }
