import { StaffGuard } from './shared/guards/staff.guard';
import { StoreGuard } from './shared/guards/store.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from './auth/guards';


export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'management',
    canActivate: [AuthGuard],
    loadChildren: './management/layout/layout.module#LayoutModule'
  },
  {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  },
  {
    path: '',
    loadChildren: './main/layout-main/layout-main.module#LayoutMainModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }