import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LocationServiceComponent } from './location-service/location-service.component';
import { DeviceServiceComponent } from './device-service/device-service.component';
import { RuleServiceComponent } from './rule-service/rule-service.component';
import { SceneServiceComponent } from './scene-service/scene-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SmartappServiceComponent } from './smartapp-service/smartapp-service.component';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { HelpComponent } from './help/help.component';
import { LiveLoggingComponent } from './live-logging/live-logging.component';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LocationServiceComponent,
    DeviceServiceComponent,
    RuleServiceComponent,
    SceneServiceComponent,
    SmartappServiceComponent,
    HelpComponent,
    LiveLoggingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    NgJsonEditorModule,
    NgxAutoScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
