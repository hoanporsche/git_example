import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { HomeMainComponent } from "./component/home-main/home-main.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: HomeMainComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }