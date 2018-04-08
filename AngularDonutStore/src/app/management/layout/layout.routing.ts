import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MODEL_ROUTING } from '../../shared/constants/routing.constant';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: MODEL_ROUTING.CATEGORY, loadChildren: './../model/category/category.module#CategoryModule' },
      { path: MODEL_ROUTING.ITEM, loadChildren: './../model/item/item.module#ItemModule' },
      { path: MODEL_ROUTING.MATERIAL, loadChildren: './../model/material/material.module#MaterialModule' },
      { path: MODEL_ROUTING.MATERIAL_DAILY_REPORT, loadChildren: './../model/material-daily-report/material-daily-report.module#MaterialDailyReportModule' },
      { path: MODEL_ROUTING.ORDER, loadChildren: './../model/order/order.module#OrderModule' },
      { path: MODEL_ROUTING.ORDER_STATUS, loadChildren: './../model/order-status/order-status.module#OrderStatusModule' },
      { path: MODEL_ROUTING.QUANTITY, loadChildren: './../model/quantity/quantity.module#QuantityModule' },
      { path: MODEL_ROUTING.ROLE, loadChildren: './../model/role/role.module#RoleModule' },
      { path: MODEL_ROUTING.STAFF, loadChildren: './../model/staff/staff.module#StaffModule' },
      { path: MODEL_ROUTING.SUPPLY, loadChildren: './../model/supply/supply.module#SupplyModule' },
      { path: MODEL_ROUTING.TIMEKEEPING, loadChildren: './../model/timekeeping/timekeeping.module#TimekeepingModule' },
      { path: MODEL_ROUTING.TIMEKEEPING_STATUS, loadChildren: './../model/timekeeping-status/timekeeping-status.module#TimekeepingStatusModule' },
      { path: MODEL_ROUTING.USER, loadChildren: './../model/user/user.module#UserModule' },
      { path: MODEL_ROUTING.WORKING_CALENDER, loadChildren: './../model/working-calender/working-calender.module#WorkingCalenderModule' },
      { path: MODEL_ROUTING.STORE, loadChildren: './../model/store/store.module#StoreModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
