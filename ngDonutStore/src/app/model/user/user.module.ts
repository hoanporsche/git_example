import { RoleModule } from './../role/role.module';
import { StoreModule } from './../store/store.module';
import { SharedModule } from './../../shared/shared.module';
import { UserRoutingModule } from './user.routing';
import { NgModule } from '@angular/core';
import { UserCreateComponent } from './page/user-create/user-create.component';
import { UserListComponent } from './page/user-list/user-list.component';
import { UserService } from './service/user.service';
import { UserComponent } from './user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailComponent } from './page/user-detail/user-detail.component';
import { ChangePasswordComponent } from './page/change-password/change-password.component';

@NgModule({
  imports: [
    NgbModule,
    UserRoutingModule,
    SharedModule,
    StoreModule,
    RoleModule
  ],
  declarations: [
    UserComponent,
    UserCreateComponent, 
    UserDetailComponent,
    UserListComponent,
    ChangePasswordComponent
  ],
  providers: [
    UserService
  ],
  exports: [
    ChangePasswordComponent
  ]
})
export class UserModule { }
