import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StClientService } from '../service/st-client.service';
import { validate as uuidValidate } from 'uuid';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-device-service',
  templateUrl: './device-service.component.html',
  styleUrls: ['./device-service.component.css']
})
export class DeviceServiceComponent implements OnInit {

  private REST_API_SERVER = "http://localhost:9090/stg/devicesNames";
  env = '';
  deviceId: any = null;
  deviceMetaDetails: any;
  deviceDetails: any;
  deviceStatus: any;
  description: any;
  loadingMeta: boolean = true;
  loadingDevice: boolean = false;
  public editorOptions: JsonEditorOptions;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;

  constructor(private route: ActivatedRoute,
    private httpClient: HttpClient,
    private stClient: StClientService) {
      this.editorOptions = new JsonEditorOptions();
      this.editorOptions.mode = 'text';
      this.editorOptions.onChange = () => console.log(this.editor.get());
  }

  ngOnInit(): void {
    this.deviceId = null;
    this.loadingMeta = true;
    this.loadingDevice = false;
    this.env = this.route.snapshot.params['env'];
    this.description = "Fetches all device meta details.";
    this.getDeviceMetaDetails();
    console.log('DeviceServiceComponent ngOnInit() is called.');
  }

  getDeviceMetaDetails(): void {
    this.stClient.getDeviceMetaDetails(this.env).subscribe(
     response => this.parseDeviceMetaResponse(response)
   );
 }

 getDeviceDetails(): void {
  if (this.deviceId === null) {
    console.log('deviceId is null');
    return;
  }
  if (uuidValidate(this.deviceId) === false) {
    console.log('deviceId is not in UUID format.');
  }
  this.loadingDevice = true;
  this.stClient.getDeviceDetails(this.env, this.deviceId).subscribe(
    response => this.parseDeviceResponse(response)
  );
}

 parseDeviceMetaResponse(response) {
   this.loadingMeta = false;
   this.deviceMetaDetails = response;
 }

 parseDeviceResponse(response) {
  console.log('Device detail: {}', response);
  this.loadingDevice = false;
  this.deviceDetails = response;
}

}
