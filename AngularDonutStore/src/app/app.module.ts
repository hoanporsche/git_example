import { NavigationService } from './core/services/navigation.service';
import { StaffGuard } from './shared/guards/staff.guard';
import { StoreGuard } from './shared/guards/store.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScriptLoaderService } from './core/services/script-loader.service';
import { IdentityService } from './core/services/identity.service';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthGuard } from './auth/guards';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    CoreModule,
    NgbModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [
    ScriptLoaderService,
    AdminGuard,
    StoreGuard,
    StaffGuard,
    AuthGuard,
    NavigationService,
    IdentityService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
