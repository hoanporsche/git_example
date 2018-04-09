import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MODEL_ROUTING } from '../../shared/constants/routing.constant';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { StoreGuard } from '../../shared/guards/store.guard';
import { StaffGuard } from '../../shared/guards/staff.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: MODEL_ROUTING.CATEGORY,
        canActivate: [AdminGuard],
        loadChildren: './../model/category/category.module#CategoryModule'
      },
      {
        path: MODEL_ROUTING.ITEM,
        canActivate: [AdminGuard],
        loadChildren: './../model/item/item.module#ItemModule'
      },
      {
        path: MODEL_ROUTING.MATERIAL,
        canActivate: [AdminGuard],
        loadChildren: './../model/material/material.module#MaterialModule'
      },
      {
        path: MODEL_ROUTING.MATERIAL_DAILY_REPORT,
        canActivate: [StaffGuard],
        loadChildren: './../model/material-daily-report/material-daily-report.module#MaterialDailyReportModule'
      },
      {
        path: MODEL_ROUTING.ORDER,
        canActivate: [StaffGuard],
        loadChildren: './../model/order/order.module#OrderModule'
      },
      {
        path: MODEL_ROUTING.ORDER_STATUS,
        canActivate: [AdminGuard],
        loadChildren: './../model/order-status/order-status.module#OrderStatusModule'
      },
      { path: MODEL_ROUTING.QUANTITY, loadChildren: './../model/quantity/quantity.module#QuantityModule' },
      {
        path: MODEL_ROUTING.ROLE,
        canActivate: [AdminGuard],
        loadChildren: './../model/role/role.module#RoleModule'
      },
      {
        path: MODEL_ROUTING.STAFF,
        canActivate: [StoreGuard],
        loadChildren: './../model/staff/staff.module#StaffModule'
      },
      {
        path: MODEL_ROUTING.SUPPLY,
        canActivate: [StoreGuard],
        loadChildren: './../model/supply/supply.module#SupplyModule'
      },
      {
        path: MODEL_ROUTING.TIMEKEEPING,
        canActivate: [StaffGuard],
        loadChildren: './../model/timekeeping/timekeeping.module#TimekeepingModule'
      },
      {
        path: MODEL_ROUTING.TIMEKEEPING_STATUS,
        canActivate: [AdminGuard],
        loadChildren: './../model/timekeeping-status/timekeeping-status.module#TimekeepingStatusModule'
      },
      {
        path: MODEL_ROUTING.USER,
        canActivate: [AdminGuard],
        loadChildren: './../model/user/user.module#UserModule'
      },
      {
        path: MODEL_ROUTING.WORKING_CALENDER,
        canActivate: [AdminGuard],
        loadChildren: './../model/working-calender/working-calender.module#WorkingCalenderModule'
      },
      {
        path: MODEL_ROUTING.STORE,
        canActivate: [AdminGuard],
        loadChildren: './../model/store/store.module#StoreModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
