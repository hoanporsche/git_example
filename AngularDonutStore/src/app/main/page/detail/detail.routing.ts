import { Routes, RouterModule } from "@angular/router";
import { DetailComponent } from "./detail.component";
import { DetailMainComponent } from "./component/detail-main/detail-main.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: DetailComponent,
    children: [
      { path: '', component: DetailMainComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailRoutingModule { }