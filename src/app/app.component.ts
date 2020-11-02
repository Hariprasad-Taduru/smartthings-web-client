import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  env = 'stg';
  ruleService = '';
  count = 0;

  time = new Date();

  constructor(private router: Router) {
    setInterval(() => {
      this.time = new Date();
   }, 1000);
  }

  handleLocationsButton() {
    this.router.navigate(['locations', this.env]);
  }

  handleDevicesButton() {
    this.router.navigate(['devices', this.env]);
  }

  handleRulesButton() {
    console.log('handleRulesButton called.');
    this.count = this.count + 1;
    this.ruleService = "Initial set of rules. Count: " + this.count;
    this.router.navigate(['rules', this.env]);
  }

  handleScenesButton() {
    this.router.navigate(['scenes', this.env]);
  }

  handleSmartAppsButton() {
    this.router.navigate(['apps', this.env]);
  }

  handleHelpButton() {
    this.router.navigate(['help']);
  }

  handleHomeButton() {
    this.router.navigate(['']);
  }
}
