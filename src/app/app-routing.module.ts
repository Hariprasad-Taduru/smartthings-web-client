import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DeviceServiceComponent } from './device-service/device-service.component';
import { LocationServiceComponent } from './location-service/location-service.component';
import { RuleServiceComponent } from './rule-service/rule-service.component';
import { SceneServiceComponent } from './scene-service/scene-service.component';
import { SmartappServiceComponent } from './smartapp-service/smartapp-service.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HelpComponent } from './help/help.component';
import { LiveLoggingComponent } from './live-logging/live-logging.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'locations/:env', component: LocationServiceComponent},
  {path: 'devices/:env', component: DeviceServiceComponent},
  {path: 'rules/:env', component: RuleServiceComponent},
  {path: 'scenes/:env', component: SceneServiceComponent},
  {path: 'apps/:env', component: SmartappServiceComponent},
  {path: 'livelogging/:env', component: LiveLoggingComponent},
  {path: 'help', component: HelpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
