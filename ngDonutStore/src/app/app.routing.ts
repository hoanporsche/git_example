import { StaffGuard } from './shared/guards/staff.guard';
import { StoreGuard } from './shared/guards/store.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: './layout/layout.module#LayoutModule'
  },
  {
    path: 'store',
    canActivate: [StoreGuard],
    loadChildren: './layout/layout.module#LayoutModule'
  },
  {
    path: 'staff',
    canActivate: [StaffGuard],
    loadChildren: './layout/layout.module#LayoutModule'
  },

  {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  },
  {
    path: '',
    loadChildren: './main/main.module#MainModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }