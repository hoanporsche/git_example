import { HomeComponent } from './page/home/home.component';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }