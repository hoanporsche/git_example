import { UserDetailComponent } from './page/user-detail/user-detail.component';
import { UserCreateComponent } from './page/user-create/user-create.component';
import { UserListComponent } from './page/user-list/user-list.component';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path: '',
    component: UserComponent,
    children: [
      { path: 'create', component: UserCreateComponent},
      { path: 'detail', component: UserDetailComponent},
      { path: '', component: UserListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }