import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from './service/role.service';
import { SharedModule } from './../../../shared/shared.module';
import { RoleRoutingModule } from './role.routing';
import { NgModule } from '@angular/core';
import { RoleCreateComponent } from './page/role-create/role-create.component';
import { RoleDetailComponent } from './page/role-detail/role-detail.component';
import { RoleListComponent } from './page/role-list/role-list.component';
import { RoleComponent } from './role.component';

@NgModule({
  imports: [
    RoleRoutingModule,
    SharedModule,
    NgbModule
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
