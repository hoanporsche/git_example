import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffCreateComponent } from './page/staff-create/staff-create.component';
import { StaffDetailComponent } from './page/staff-detail/staff-detail.component';
import { StaffListComponent } from './page/staff-list/staff-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StaffCreateComponent, StaffDetailComponent, StaffListComponent]
})
export class StaffModule { }
