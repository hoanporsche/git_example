import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleCreateComponent } from './page/role-create/role-create.component';
import { RoleDetailComponent } from './page/role-detail/role-detail.component';
import { RoleListComponent } from './page/role-list/role-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RoleCreateComponent, RoleDetailComponent, RoleListComponent]
})
export class RoleModule { }
