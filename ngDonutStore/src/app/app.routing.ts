import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'admin',
    canActivate: ,
    loadChildren: 
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }