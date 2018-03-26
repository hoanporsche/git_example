import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'category', loadChildren: './../model/category/category.module#CategoryModule' },
      { path: 'item', loadChildren: './../model/item/item.module#ItemModule' },
      { path: 'material', loadChildren: './../model/material/material.module#MaterialModule' },
      { path: 'material-daily-report', loadChildren: './../model/material-daily-report/material-daily-report.module#MaterialDailyReportModule' },
      { path: 'order', loadChildren: './../model/order/order.module#OrderModule' },
      { path: 'order-status', loadChildren: './../model/order-status/order-status.module#OrderStatusModule' },
      { path: 'quantity', loadChildren: './../model/quantity/quantity.module#QuantityModule' },
      { path: 'role', loadChildren: './../model/role/role.module#RoleModule' },
      { path: 'staff', loadChildren: './../model/staff/staff.module#StaffModule' },
      { path: 'supply', loadChildren: './../model/supply/supply.module#SupplyModule' },
      { path: 'timekeeping', loadChildren: './../model/timekeeping/timekeeping.module#TimekeepingModule' },
      { path: 'timekeeping-status', loadChildren: './../model/timekeeping-status/timekeeping-status.module#TimekeepingStatusModule' },
      { path: 'user', loadChildren: './../model/user/user.module#UserModule' },
      { path: 'working-calender', loadChildren: './../model/working-calender/working-calender.module#WorkingCalenderModule' },
      { path: 'store', loadChildren: './../model/store/store.module#StoreModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
