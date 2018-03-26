import { MaterialDailyReportDetailComponent } from './page/material-daily-report-detail/material-daily-report-detail.component';
import { MaterialDailyReportCreateComponent } from './page/material-daily-report-create/material-daily-report-create.component';
import { MaterialDailyReportListComponent } from './page/material-daily-report-list/material-daily-report-list.component';
import { MaterialDailyReportComponent } from './material-daily-report.component';
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path: '',
    component: MaterialDailyReportComponent,
    children: [
      { path: 'detail', component: MaterialDailyReportDetailComponent},
      { path: 'create', component: MaterialDailyReportCreateComponent},
      { path: '', component: MaterialDailyReportListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialDailyReportRoutingModule { }