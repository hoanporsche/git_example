import { RoleListComponent } from './page/role-list/role-list.component';
import { Routes, RouterModule } from "@angular/router";
import { RoleComponent } from "./role.component";
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path: '',
    component: RoleComponent,
    children: [
      { path: '', component: RoleListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }