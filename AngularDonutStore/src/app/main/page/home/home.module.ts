import { SingleItemComponent } from './../../component/single-item/single-item.component';
import { HomeRoutingModule } from './home.routing';
import { HomeService } from './service/home.service';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeMainComponent } from './component/home-main/home-main.component';
import { HomeComponent } from './home.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    NgbModule,
    AgmCoreModule
  ],
  declarations: [
    HomeComponent,
    HomeMainComponent,
    SingleItemComponent,
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
