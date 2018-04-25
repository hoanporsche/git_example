import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimekeepingStatusComponent } from './timekeeping-status.component';
import { NgModule } from '@angular/core';
import { TimekeepingStatusCreateComponent } from './page/timekeeping-status-create/timekeeping-status-create.component';
import { TimekeepingStatusDetailComponent } from './page/timekeeping-status-detail/timekeeping-status-detail.component';
import { TimekeepingStatusListComponent } from './page/timekeeping-status-list/timekeeping-status-list.component';
import { TimekeepingStatusRoutingModule } from './timekeeping-status.routing';
import { SharedModule } from '../../../shared/shared.module';
import { TimekeepingStatusService } from './service/timekeeping-status.service';

@NgModule({
  imports: [
    TimekeepingStatusRoutingModule,
    SharedModule,
    NgbModule,
  ],
  declarations: [
    TimekeepingStatusComponent,
    TimekeepingStatusCreateComponent, 
    TimekeepingStatusDetailComponent, 
    TimekeepingStatusListComponent
  ],
  providers: [
    TimekeepingStatusService
  ]
})
export class TimekeepingStatusModule { }
