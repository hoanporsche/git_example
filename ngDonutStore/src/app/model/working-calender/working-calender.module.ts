import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkingCalenderComponent } from './working-calender.component';
import { WorkingCalenderService } from './service/working-calender.service';
import { WorkingCalenderRoutingModule } from './working-calender.routing';
import { NgModule } from '@angular/core';
import { WorkingCalenderCreateComponent } from './page/working-calender-create/working-calender-create.component';
import { WorkingCalenderDetailComponent } from './page/working-calender-detail/working-calender-detail.component';
import { WorkingCalenderListComponent } from './page/working-calender-list/working-calender-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    NgbModule,
    WorkingCalenderRoutingModule,
    SharedModule,
  ],
  declarations: [
    WorkingCalenderComponent,
    WorkingCalenderCreateComponent, 
    WorkingCalenderDetailComponent, 
    WorkingCalenderListComponent
  ],
  providers: [
    WorkingCalenderService
  ]
})
export class WorkingCalenderModule { }
