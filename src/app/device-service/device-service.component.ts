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
  loadingCommand: boolean = false;
  devices: any;
  deviceComponent: any;
  deviceCapability: any;
  deviceAttribute: any;
  commandArgument: any;
  componentArray: string[];
  capabilityArray: string[];
  attributeArray: string[];
  argumentArray: string[];
  deviceCommandResponse: any;
  public editorOptions: JsonEditorOptions;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;

  ignoreCapabilities = [
    "configuration", "refresh", "actuator", "healthCheck", "battery", "sensor", "temperatureMeasurement",
    "contactSensor", "threeAxis", "accelerationSensor", "light"
  ];
  constructor(private route: ActivatedRoute,
    private httpClient: HttpClient,
    private stClient: StClientService) {
      this.editorOptions = new JsonEditorOptions();
      this.editorOptions.mode = 'text';
      this.editorOptions.onChange = () => console.log(this.editor.get());
  }

  ngOnInit(): void {
    this.deviceId = null;
    this.deviceComponent = null;
    this.deviceCapability = null;
    this.loadingMeta = true;
    this.loadingDevice = false;
    this.loadingCommand = false;
    this.deviceCommandResponse = null;
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
   this.devices = response;
 }

 parseDeviceResponse(response) {
  console.log('Device detail: {}', response);
  this.loadingDevice = false;
  this.deviceDetails = response;
}

populateComponents() {
  this.deviceCommandResponse = null;
  console.log("populateComponents() called.");
  console.log("devices", this.devices);
  this.attributeArray = null;
  this.componentArray = new Array();
  this.capabilityArray = new Array();
  for (var index in this.devices) {
    if (this.devices[index].deviceId === this.deviceId) {
      var selectedDevice = this.devices[index];

      console.log("deviceId: {}", selectedDevice.deviceSnapshot.deviceId);
      for (var componentIndex in selectedDevice.deviceSnapshot.components) {
        //console.log("device component: {}", this.devices[index].deviceSnapshot.components[0].id[1]);
        // this.componentArray[index] = this.devices[index].deviceSnapshot.components[0].id;

        console.log("component: {}", selectedDevice.deviceSnapshot.components[componentIndex].id);
        this.componentArray[componentIndex] = selectedDevice.deviceSnapshot.components[componentIndex].id;

        //Capabilities
        var i = 0;
        console.log("all capabilities: {}", selectedDevice.deviceSnapshot.components[componentIndex].capabilities);
        for (var capIndex in selectedDevice.deviceSnapshot.components[componentIndex].capabilities) {
          console.log(" capIndex: {}, capability: {}", capIndex, selectedDevice.deviceSnapshot.components[componentIndex].capabilities[capIndex]);
          var capbilityId = selectedDevice.deviceSnapshot.components[componentIndex].capabilities[capIndex].id;
          if (this.ignoreCapabilities.indexOf(capbilityId) === -1) {
            this.capabilityArray[i] = selectedDevice.deviceSnapshot.components[componentIndex].capabilities[capIndex].id;
            i = i + 1;
          }
        }
        break;
      }
    }
  }

}

populateCapabilities() {

}
populateAttributes() {
  this.attributeArray = null;
 console.log("selected capability: {}", this.deviceCapability);
 this.attributeArray = new Array();
 if (this.deviceCapability === "switch") {
  this.attributeArray.push('on');
  this.attributeArray.push('off');
 } else if (this.deviceCapability === "switchLevel") {
  this.attributeArray.push('');
  this.attributeArray.push('20');
  this.attributeArray.push('40');
  this.attributeArray.push('60');
  this.attributeArray.push('80');
  this.attributeArray.push('100');
 }
}

// device command
onCommandSubmit() {
  this.loadingCommand = true;
  this.deviceCommandResponse = null;
  console.log("Device command called.");
  console.log("deviceId: ", this.deviceId, );
  console.log("component:", this.deviceComponent);
  console.log("capability:", this.deviceCapability);
  console.log("attribute:", this.deviceAttribute);

  this.stClient.postDeviceCommand(this.env, this.deviceId, this.deviceComponent, this.deviceCapability, this.deviceAttribute).subscribe(
    response => this.parseDeviceCommandResponse(response)
  );
}
parseDeviceCommandResponse(response) {
  this.deviceCommandResponse = null;
  this.loadingCommand = false;
  console.log("device command response: {}", response);
  if (response.commandResponse === "success") {
    this.deviceCommandResponse = "Command execution is successful.";
  } else {
    this.deviceCommandResponse = "Command execution is failed.";
  }
}
}
