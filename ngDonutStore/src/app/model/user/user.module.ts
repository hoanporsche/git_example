import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './page/user-create/user-create.component';
import { UserDetailComponent } from './page/user-detail/user-detail.component';
import { UserListComponent } from './page/user-list/user-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserCreateComponent, UserDetailComponent, UserListComponent]
})
export class UserModule { }
