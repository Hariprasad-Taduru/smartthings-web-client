import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StClientService } from '../service/st-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  timeLeft: number = 10;

  env = '';
  uuid = '';
  fullName = '';
  email = '';
  countryCode = '';

  locationName = '';
  locationId = '';

  devicesCount = 0;
  scenesCount = 0;
  rulesCount = 0;
  smartAppsCount = 0;
  deviceDetails = null;
  devices = '';

  loadingUserDetails: boolean = true;
  loadingDevices: boolean = true;
  loadingRules: boolean = true;
  loadingScenes: boolean = true;
  loadingSmartApps: boolean = true;
  loadingDeviceStatuses: boolean = true;

  time = new Date();

  constructor(private route: ActivatedRoute,
              private stClient: StClientService) {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    this.env = this.route.snapshot.params['env'];
    this.uuid = '';
    this.fullName = '';
    this.email = '';
    this.countryCode = '';
    this.locationName = '';
    this.locationId = '';

    this.loadingUserDetails = true; // set it to true here
    this.loadingDevices = true; // set it to true here
    this.loadingRules = true;
    this.loadingScenes = true;
    this.loadingSmartApps = true;
    this.loadingDeviceStatuses = true;

    this.devicesCount = 0;
    this.scenesCount = 0;
    this.rulesCount = 0;
    this.smartAppsCount = 0;
    this.deviceDetails = null;
    this.devices = '';

    this.getUserDetails();

    this.getLocationName();

    this.getDeviceCount();

    this.getRulesCount();

    this.getScenesCount();

    this.getSmartAppsCount();

  }

  getUserDetails(): void {
    this.stClient.getUserDetails(this.env).subscribe(
      response => this.parseUserDetailsResponse(response)
    );
  }

  parseUserDetailsResponse(response) {
    this.loadingUserDetails = false;
    this.uuid = response.uuid;
    this.fullName = response.fullName;
    this.email = response.email;
    this.countryCode = response.countryCode;
  }

  getLocationName(): void {
    this.stClient.getTestLocationDetails(this.env).subscribe(
      response => this.parseLocationDetailsResponse(response)
    );
  }

  parseLocationDetailsResponse(response) {
    this.locationName = response.name;
    this.locationId = response.locationId;
  }

  getDeviceCount(): void {
    this.stClient.getDeviceMetaDetails(this.env).subscribe(
       response => this.parseDeviceDetailsResponse(response)
    )
  }

  parseDeviceDetailsResponse(response) {
    this.loadingDevices = false;
    this.deviceDetails = response;
    this.devices = response;

    for (let device of this.devices) {
      //console.log(device);
      this.devicesCount++;
    }
  }

  getRulesCount(): void {
    this.stClient.getOCFRuleMetaDetails(this.env).subscribe(
       response => this.parseRulesDetailsResponse(response)
    )
  }

  parseRulesDetailsResponse(response) {
    this.loadingRules = false;

    for (let rule of response) {
      //console.log(rule);
      this.rulesCount++;
    }
  }

  getScenesCount(): void {
    this.stClient.getOCFSceneMetaDetails(this.env).subscribe(
       response => this.parseScenesDetailsResponse(response)
    )
  }

  parseScenesDetailsResponse(response) {
    this.loadingScenes = false;

    for (let scene of response) {
      //console.log(rule);
      this.scenesCount++;
    }
  }

  getSmartAppsCount(): void {
    this.stClient.getSmartAppMetaDetails(this.env).subscribe(
       response => this.parseSmartAppsDetailsResponse(response)
    )
  }

  parseSmartAppsDetailsResponse(response) {
    this.loadingSmartApps = false;

    for (let smartApp of response) {
      //console.log(rule);
      this.smartAppsCount++;
    }
  }

  refresh() {
    this.devicesCount = 0;
    this.scenesCount = 0;
    this.rulesCount = 0;
    this.smartAppsCount = 0;
    this.deviceDetails = null;
    this.devices = '';

    this.loadingDevices = true;
    this.loadingRules = true;
    this.loadingScenes = true;
    this.loadingSmartApps = true;

    this.getUserDetails();

    this.getDeviceCount();

    this.getRulesCount();

    this.getScenesCount();

    this.getSmartAppsCount();
  }
}
