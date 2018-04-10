import { LayoutMainComponent } from "./layout-main.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      { path: 'order', loadChildren: './../page/order/order.module#OrderModule' },
      { path: 'detail', loadChildren: './../page/detail/detail.module#DetailModule' },
      { path: 'contact', loadChildren: './../page/contact/contact.module#ContactModule' },
      { path: '', loadChildren: './../page/home/home.module#HomeModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutMainRoutingModule { }
