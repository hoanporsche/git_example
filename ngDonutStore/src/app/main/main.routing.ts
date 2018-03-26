import { ContactComponent } from './page/contact/contact.component';
import { DetailComponent } from './page/detail/detail.component';
import { HomeComponent } from './page/home/home.component';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path: '',
    component: MainComponent,
    children: [
      { path: 'order', loadChildren: './../model/order/order.module#OrderModule'},
      { path: 'contact', component: ContactComponent},
      { path: 'detail', component: DetailComponent},
      { path: '', component: HomeComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }