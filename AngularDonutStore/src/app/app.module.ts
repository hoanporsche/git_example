import { NavigationService } from './core/services/navigation.service';
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
import { AgmCoreModule } from '@agm/core';


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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAg44sIHbBu2Ex5DLSvMRFL4SVBr6qDuwM',
      libraries: ['places']
    })
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
