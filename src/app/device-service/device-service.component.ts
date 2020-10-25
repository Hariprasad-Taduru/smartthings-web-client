import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StClientService } from '../service/st-client.service';

@Component({
  selector: 'app-device-service',
  templateUrl: './device-service.component.html',
  styleUrls: ['./device-service.component.css']
})
export class DeviceServiceComponent implements OnInit {

  private REST_API_SERVER = "http://localhost:9090/stg/devicesNames";
  env = '';
  deviceMetaDetails: any;
  deviceStatus: any;
  description: any;
  loading: boolean = true;

  constructor(private route: ActivatedRoute,
    private httpClient: HttpClient,
    private stClient: StClientService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.env = this.route.snapshot.params['env'];
    this.description = "Fetches all device meta details.";
    this.getDeviceMetaDetails();
    console.log('DeviceServiceComponent ngOnInit() is called.');
  }

  getDeviceMetaDetails(): void {
    this.stClient.getDeviceMetaDetails(this.env).subscribe(
     response => this.parseResponse(response)
   );
 }

 getDeviceStatus(): void {
  this.deviceStatus = 'TODO';
  //   this.stClient.getDeviceMetaDetails(this.env).subscribe(
  //    response => this.parseResponse(response)
  //  )
  }

 parseResponse(response) {
   this.loading = false;
   this.deviceMetaDetails = response;
 }

}
