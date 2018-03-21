import { MainComponent } from './main.component';
import { MainService } from './service/main.service';
import { MainRoutingModule } from './main.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  declarations: [HomeComponent,MainComponent],
  providers: [MainService]
})
export class MainModule { }
