import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDailyReportCreateComponent } from './page/material-daily-report-create/material-daily-report-create.component';
import { MaterialDailyReportDetailComponent } from './page/material-daily-report-detail/material-daily-report-detail.component';
import { MaterialDailyReportListComponent } from './page/material-daily-report-list/material-daily-report-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MaterialDailyReportCreateComponent, MaterialDailyReportDetailComponent, MaterialDailyReportListComponent]
})
export class MaterialDailyReportModule { }
