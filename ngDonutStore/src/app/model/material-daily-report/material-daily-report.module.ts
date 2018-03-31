import { MaterialModule } from './../material/material.module';
import { MaterialDailyReportComponent } from './material-daily-report.component';
import { MaterialDailyReportService } from './service/material-daily-report.service';
import { SharedModule } from './../../shared/shared.module';
import { MaterialDailyReportRoutingModule } from './material-daily-report.routing';
import { NgModule } from '@angular/core';
import { MaterialDailyReportCreateComponent } from './page/material-daily-report-create/material-daily-report-create.component';
import { MaterialDailyReportDetailComponent } from './page/material-daily-report-detail/material-daily-report-detail.component';
import { MaterialDailyReportListComponent } from './page/material-daily-report-list/material-daily-report-list.component';
import { StoreModule } from '../store/store.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    MaterialDailyReportRoutingModule,
    SharedModule,
    StoreModule,
    MaterialModule,
    NgbModule
  ],
  declarations: [
    MaterialDailyReportComponent,
    MaterialDailyReportCreateComponent, 
    MaterialDailyReportDetailComponent, 
    MaterialDailyReportListComponent
  ],
  providers: [
    MaterialDailyReportService
  ]
})
export class MaterialDailyReportModule { }
