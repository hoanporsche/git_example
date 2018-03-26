import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffCreateComponent } from './page/staff-create/staff-create.component';
import { StaffDetailComponent } from './page/staff-detail/staff-detail.component';
import { StaffListComponent } from './page/staff-list/staff-list.component';
import { StaffRoutingModule } from './staff.routing';
import { SharedModule } from '../../shared/shared.module';
import { StaffService } from './service/staff.service';
import { StaffComponent } from './staff.component';

@NgModule({
  imports: [
    CommonModule,
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
