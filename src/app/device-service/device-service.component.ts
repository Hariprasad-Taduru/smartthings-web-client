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
  deviceCommand: any;
  commandArgument: any;
  componentArray: string[];
  capabilityArray: string[];
  commandArray: string[];
  argumentArray: string[];
  deviceCommandResponse: any;
  isSimulatedDevice: boolean = false;
  public editorOptions: JsonEditorOptions;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;

  ignoreCapabilities = [
    "configuration", "refresh", "actuator", "healthCheck", "battery", "sensor",
    "threeAxis", "accelerationSensor", "light", "ocf"
  ];

  simulatedDeviceTypeNames = [
    "Simulated Motion Sensor", "Simulated Contact Sensor", "Simulated Presence Sensor", "Simulated Smoke Alarm",
    "Simulated Temperature Sensor"
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
    this.isSimulatedDevice = false;
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

reset() {
  this.isSimulatedDevice = false;
  this.deviceComponent = null;
  this.deviceCapability = null;
  this.deviceCommand = null;
  this.commandArgument = null;
  this.commandArray = null;
  this.componentArray = null;
  this.capabilityArray = null;
  this.argumentArray = null;
 }

populateComponents() {
  console.log("populateComponents() called.");
  this.reset();

  this.componentArray = new Array();

  for (var index in this.devices) {
    if (this.devices[index].deviceId === this.deviceId) {
      var selectedDevice = this.devices[index];

      console.log("deviceId: {}", selectedDevice.deviceSnapshot.deviceId);
      if (this.simulatedDeviceTypeNames.indexOf(selectedDevice.deviceTypeName) !== -1) {
        this.isSimulatedDevice = true;
      }
      for (var componentIndex in selectedDevice.deviceSnapshot.components) {
        console.log("component: {}", selectedDevice.deviceSnapshot.components[componentIndex].id);
        this.componentArray[componentIndex] = selectedDevice.deviceSnapshot.components[componentIndex].id;
      }
    }
  }

}

populateCapabilities() {
  console.log("populateCapabilities() called.");
  this.capabilityArray = null;
  this.commandArray = null;
  this.argumentArray = null;
  this.capabilityArray = new Array();

  for (var index in this.devices) {
    if (this.devices[index].deviceId === this.deviceId) {
      var selectedDevice = this.devices[index];

      for (var componentIndex in selectedDevice.deviceSnapshot.components) {
        //console.log("device component: {}", this.devices[index].deviceSnapshot.components[0].id[1]);
        // this.componentArray[index] = this.devices[index].deviceSnapshot.components[0].id;

        console.log("component: {}", selectedDevice.deviceSnapshot.components[componentIndex].id);
        if(this.deviceComponent === selectedDevice.deviceSnapshot.components[componentIndex].id) {
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
        }
      }
    }
  }
}

populateCommands() {
  console.log("populateCommands() called.");
  this.deviceCommand = null;
  this.commandArgument = null;
  this.commandArray = null;
  this.argumentArray = null;
  this.commandArray = new Array();

  // TV commands
  if (this.deviceCapability === "switch") {
    this.commandArray.push('on');
    this.commandArray.push('off');
  } else if (this.deviceCapability === "audioMute") {
    this.commandArray.push('mute');
    this.commandArray.push('unmute');
  }  else if (this.deviceCapability === "audioVolume") {
    this.commandArray.push('setVolume');
    this.populateArguments();
  } else if (this.deviceCapability === "tvChannel") {
    this.commandArray.push('channelUp');
    this.commandArray.push('channelDown');
  } else if (this.deviceCapability === "mediaInputSource") {
    this.commandArray.push('setInputSource');
    this.populateArguments();
  }
 // Bulb commands
  else if (this.deviceCapability === "switchLevel") {
    this.commandArray.push('setLevel');
    this.populateArguments();
  }
  // Conntact Sensor
  else if (this.deviceCapability === "contactSensor") {
    if (this.isSimulatedDevice === true) {
      this.commandArray.push('open');
      this.commandArray.push('close');
    }
  }
  // Motion Sensor
  else if (this.deviceCapability === "motionSensor") {
    if (this.isSimulatedDevice === true) {
      this.commandArray.push('active');
      this.commandArray.push('inactive');
    }
  }
  // Presence Sensor cannot be simulated.
  // else if (this.deviceCapability === "presenceSensor") {
  //   if (this.isSimulatedDevice === true) {
  //     this.commandArray.push('present');
  //     this.commandArray.push('not present');
  //   }
  // }

  // Smoke Sensor
  else if (this.deviceCapability === "smokeDetector") {
    if (this.isSimulatedDevice === true) {
      this.commandArray.push('clear');
      // we cannnot perform detected command
      //this.commandArray.push('detected');
    }
  }

  // Smart Locks
  else if (this.deviceCapability === "lock") {
    this.commandArray.push('lock');
    this.commandArray.push('unlock');
  }

  // Robot Vacuum
  else if (this.deviceCapability === "robotCleanerCleaningMode") {
    this.commandArray.push('setRobotCleanerCleaningMode');
    this.populateArguments();
  } else if (this.deviceCapability === "robotCleanerMovement") {
    this.commandArray.push('setRobotCleanerMovement');
    this.populateArguments();
  } else if (this.deviceCapability === "robotCleanerTurboMode") {
    this.commandArray.push('setRobotCleanerTurboMode');
    this.populateArguments();
  }

  // Samsung Oven
  else if (this.deviceCapability === "ovenMode") {
    this.commandArray.push('setOvenMode');
    this.populateArguments();
  } else if (this.deviceCapability === "ovenOperatingState") {
    this.commandArray.push('stop');
  } else if (this.deviceCapability === "ovenSetpoint") {
    this.commandArray.push('setOvenSetpoint');
     this.populateArguments();
  }
}

populateArguments() {
  console.log("populateArguments() called.");
  this.argumentArray = null;
  if (this.deviceCapability === "switchLevel") {
    this.argumentArray = new Array();
    this.argumentArray.push('20');
    this.argumentArray.push('40');
    this.argumentArray.push('60');
    this.argumentArray.push('80');
    this.argumentArray.push('100');
  } else if (this.deviceCapability === "audioVolume") {
    this.argumentArray = new Array();
    this.argumentArray.push('20');
    this.argumentArray.push('40');
    this.argumentArray.push('60');
    this.argumentArray.push('80');
    this.argumentArray.push('100');
  } else if (this.deviceCapability === "mediaInputSource") {
    this.argumentArray = new Array();
    this.argumentArray.push('HDMI1');
    this.argumentArray.push('HDMI2');
    this.argumentArray.push('HDMI3');
    this.argumentArray.push('HDMI4');
    this.argumentArray.push('USB');
    this.argumentArray.push('digitalTv');
    this.argumentArray.push('bluetooth');
    this.argumentArray.push('YouTube');
    this.argumentArray.push('melon');
    this.argumentArray.push('aux');
  } else if (this.deviceCapability === "robotCleanerCleaningMode") {
    this.argumentArray = new Array();
    this.argumentArray.push('auto');
    this.argumentArray.push('part');
    this.argumentArray.push('repeat');
    this.argumentArray.push('manual');
    this.argumentArray.push('stop');
  } else if (this.deviceCapability === "robotCleanerMovement") {
    this.argumentArray = new Array();
    this.argumentArray.push('homing');
    this.argumentArray.push('idle');
    this.argumentArray.push('charging');
    this.argumentArray.push('alarm');
    this.argumentArray.push('reserve');
    this.argumentArray.push('point');
    this.argumentArray.push('after');
    this.argumentArray.push('cleaning');
  }  else if (this.deviceCapability === "robotCleanerTurboMode") {
    this.argumentArray = new Array();
    this.argumentArray.push('on');
    this.argumentArray.push('off');
    this.argumentArray.push('silence');
  } else if (this.deviceCapability === "ovenMode") {
    this.argumentArray = new Array();
    this.argumentArray.push('heating');
    this.argumentArray.push('grill');
    this.argumentArray.push('warming');
    this.argumentArray.push('defrosting');
  } else if (this.deviceCapability === "ovenSetpoint") {
    this.argumentArray = new Array();
    this.argumentArray.push('20');
    this.argumentArray.push('40');
    this.argumentArray.push('60');
    this.argumentArray.push('80');
    this.argumentArray.push('100');
  }
}

populateComponentsAndCapabilities() {
  this.deviceCommandResponse = null;
  this.isSimulatedDevice = false;
  console.log("populateComponentsAndCapabilities() called.");
  console.log("devices", this.devices);
  this.commandArray = null;
  this.componentArray = new Array();
  this.capabilityArray = new Array();
  for (var index in this.devices) {
    if (this.devices[index].deviceId === this.deviceId) {
      var selectedDevice = this.devices[index];

      console.log("deviceId: {}", selectedDevice.deviceSnapshot.deviceId);
      if (this.simulatedDeviceTypeNames.indexOf(selectedDevice.deviceTypeName) !== -1) {
        this.isSimulatedDevice = true;
      }
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

populateCommandsAndArguments() {
  this.commandArray = null;
  this.argumentArray = null;
  console.log("selected capability: {}", this.deviceCapability);

  this.commandArray = new Array();
  if (this.deviceCapability === "switch") {
    this.commandArray.push('on');
    this.commandArray.push('off');
    this.argumentArray = null;
  } else if (this.deviceCapability === "switchLevel") {
    this.commandArray.push('setLevel');
    this.argumentArray = new Array();
    this.argumentArray.push('20');
    this.argumentArray.push('40');
    this.argumentArray.push('60');
    this.argumentArray.push('80');
    this.argumentArray.push('100');
  } else if (this.deviceCapability === "contactSensor") {
    if (this.isSimulatedDevice === true) {
      this.commandArray.push('open');
      this.commandArray.push('close');
      this.argumentArray = null;
    }
  } else if (this.deviceCapability === "motionSensor") {
    if (this.isSimulatedDevice === true) {
      this.commandArray.push('active');
      this.commandArray.push('inactive');
      this.argumentArray = null;
    }
  } else if (this.deviceCapability === "presenceSensor") {
    if (this.isSimulatedDevice === true) {
      this.commandArray.push('present');
      this.commandArray.push('not present');
      this.argumentArray = null;
    }
  } else if (this.deviceCapability === "smokeDetector") {
    if (this.isSimulatedDevice === true) {
      this.commandArray.push('clear');
      this.commandArray.push('detected');
      this.argumentArray = null;
    }
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
  console.log("command:", this.deviceCommand);
  console.log("argument: ", this.commandArgument);
  console.log("isSumulated: ", this.isSimulatedDevice);

  this.stClient.postDeviceCommand(this.env, this.deviceId, this.deviceComponent, this.deviceCapability, this.deviceCommand, this.commandArgument, this.isSimulatedDevice).subscribe(
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
    this.deviceCommandResponse = "Command execution is failed. Error: " + response.commandResponse;
  }
}
}
