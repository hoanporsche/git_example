import { Routes, RouterModule } from "@angular/router";
import { OrderComponent } from "./order.component";
import { OrderCreateComponent } from "./component/order-create/order-create.component";
import { NgModule } from "@angular/core";
import { OrderDetailComponent } from "./component/order-detail/order-detail.component";

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    children: [
      { path: 'detail/:orderCode', component: OrderDetailComponent },
      { path: '', component: OrderCreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }