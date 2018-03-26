import { MaterialListComponent } from './page/material-list/material-list.component';
import { MaterialComponent } from './material.component';
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path: '',
    component: MaterialComponent,
    children: [
      { path: '', component: MaterialListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }