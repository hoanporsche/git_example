import { NgModule } from '@angular/core';
import { StaffCreateComponent } from './page/staff-create/staff-create.component';
import { StaffDetailComponent } from './page/staff-detail/staff-detail.component';
import { StaffListComponent } from './page/staff-list/staff-list.component';
import { StaffRoutingModule } from './staff.routing';
import { SharedModule } from '../../shared/shared.module';
import { StaffService } from './service/staff.service';
import { StaffComponent } from './staff.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    NgbModule,
    StaffRoutingModule,
    SharedModule,
  ],
  declarations: [
    StaffComponent,
    StaffCreateComponent, 
    StaffDetailComponent, 
    StaffListComponent
  ],
  providers: [
    StaffService
  ]
})
export class StaffModule { }
