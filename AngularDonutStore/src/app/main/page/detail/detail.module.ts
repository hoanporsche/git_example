import { DetailService } from './service/detail.service';
import { DetailComponent } from './detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailRoutingModule } from './detail.routing';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { DetailMainComponent } from './component/detail-main/detail-main.component';

@NgModule({
  imports: [
    SharedModule,
    DetailRoutingModule,
    NgbModule
  ],
  declarations: [
    DetailComponent,
    DetailMainComponent
  ],
  providers: [
    DetailService
  ]
})
export class DetailModule { }
