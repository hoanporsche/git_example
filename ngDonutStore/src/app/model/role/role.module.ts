import { RoleService } from './service/role.service';
import { SharedModule } from './../../shared/shared.module';
import { RoleRoutingModule } from './role.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleCreateComponent } from './page/role-create/role-create.component';
import { RoleDetailComponent } from './page/role-detail/role-detail.component';
import { RoleListComponent } from './page/role-list/role-list.component';
import { RoleComponent } from './role.component';

@NgModule({
  imports: [
    CommonModule,
    RoleRoutingModule,
    SharedModule,
  ],
  declarations: [
    RoleComponent,
    RoleCreateComponent, 
    RoleDetailComponent, 
    RoleListComponent
  ],
  providers: [
    RoleService
  ]
})
export class RoleModule { }
