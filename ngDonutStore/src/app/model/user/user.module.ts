import { SharedModule } from './../../shared/shared.module';
import { UserRoutingModule } from './user.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './page/user-create/user-create.component';
import { UserDetailComponent } from './page/user-detail/user-detail.component';
import { UserListComponent } from './page/user-list/user-list.component';
import { UserService } from './service/user.service';
import { UserComponent } from './user.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ],
  declarations: [
    UserComponent,
    UserCreateComponent, 
    UserDetailComponent, 
    UserListComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
