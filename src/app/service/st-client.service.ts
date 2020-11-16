import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

export interface Location{
  locationId: string;
  name: string;
  latitude: number;
  longitude: number;
  regionRadius: number;
  temperatureScale: string;
  timeZoneId: string;
  locale: string;
}

export interface DeviceMeta{
  deviceId: string;
  deviceLabelName: string;
  deviceTypeName: string;
}

export interface RuleMeta{
  ruleId: string;
  ruleName: string;
}

export interface OcfRuleMeta{
  ocfRuleId: string;
  ocfRuleName: string;
}

export interface SceneMeta{
  sceneId: string;
  sceneName: string;
}

export interface SmartAppMeta{
  installedAppId: string;
  installedAppName: string;
}

@Injectable({
  providedIn: 'root'
})
export class StClientService {

  constructor(private httpClient: HttpClient) { }

  // Location API

  getTestLocationDetails(env: string) {
    console.log(env);
    return this.httpClient.get<Location>('http://localhost:5200/st/testlocation?env=' + env);
  }

  getAllLocationsDetails(env: string) {
    console.log(env);
    return this.httpClient.get<Location[]>('http://localhost:5200/st/locations?env=' + env);
  }

  // Device API
  getDeviceMetaDetails(env: string) {
    console.log(env);
    return this.httpClient.get<DeviceMeta[]>('http://localhost:5200/st/devicesNames?env=' + env);
  }

  getDeviceDetails(env: string, deviceId: string) {
    console.log(env);
    return this.httpClient.get('http://localhost:5200/st/deviceDetails?deviceId=' + deviceId +  '&env=' + env);
  }

  postDeviceCommand(env: string, deviceId: string, component: string, capability: string, command: string, argument: string, isSimulatedDevice: boolean) {
    console.log(env);
    var simulated = "0";
    if (isSimulatedDevice === true) {
      simulated = "1";
    }
    // mediaInputSource
    // 0 - "AM",
    // 1 - "CD",
    // 2 - "FM",
    // 3 - "HDMI",
    // 4 - "HDMI1",
    // 5 - "HDMI2",
    // 6 - "HDMI3",
    // 7 - "HDMI4",
    // 8 - "HDMI5",
    // 9 - "HDMI6",
    // 10 - "digitalTv",
    // 11 - "USB",
    // 12 - "YouTube",
    // 13 - "aux",
    // 14 - "bluetooth",
    // 15 - "digital",
    // 16 - "melon",
    // 17 - "wifi"
    var queryPatamer: string;
    queryPatamer = "deviceId=" + deviceId + "&component=" + component + "&capability=" + capability + "&command=" + command + "&argument=" + argument + "&isSimulatedDevice=" + simulated;
    console.log("Query: ", queryPatamer);
    return this.httpClient.get('http://localhost:5200/st/deviceCommands?' + queryPatamer +  '&env=' + env);
  }

  //Execute scene
  executeScene(env: string, sceneId: string) {
    console.log("Scene execute: ", 'http://localhost:5200/st/executeScene?sceneId=' + sceneId +  '&env=' + env)
    return this.httpClient.post('http://localhost:5200/st/executeScene?sceneId=' + sceneId +  '&env=' + env, "");
  }
  // Rule API
  getRuleMetaDetails(env: string) {
    console.log(env);
    return this.httpClient.get<RuleMeta[]>('http://localhost:5200/st/rulesNames?env=' + env);
  }

  getRuleDetails(env: string, ruleId: string) {
    console.log(env);
    return this.httpClient.get('http://localhost:5200/st/ruleDetails?ruleId=' + ruleId + '&env=' + env);
  }

  // Scene API
  getSceneMetaDetails(env: string) {
    console.log(env);
    return this.httpClient.get<SceneMeta[]>('http://localhost:5200/st/scenesNames?env=' + env);
  }

  getSceneDetails(env: string, sceneId: string) {
    console.log(env);
    return this.httpClient.get('http://localhost:5200/st/sceneDetails?sceneId=' + sceneId + '&env=' + env);
  }

  // SmartApp API
  getSmartAppMetaDetails(env: string) {
    console.log(env);
    return this.httpClient.get<SmartAppMeta[]>('http://localhost:5200/st/smartAppNames?env=' + env);
  }

  getSmartAppDetails(env: string, appId: string) {
    console.log(env);
    return this.httpClient.get('http://localhost:5200/st/smartAppDetails?appId=' + appId + '&env=' + env);
  }

  // OCF Stuff
    getOCFRuleMetaDetails(env: string) {
      console.log(env);
      return this.httpClient.get<OcfRuleMeta[]>('http://localhost:5200/st/ocfRulesNames?env=' + env);
    }

    getOCFRuleDetails(env: string, ruleId: string) {
      console.log(env);
      return this.httpClient.get('http://localhost:5200/st/ocfRuleDetails?ruleId=' + ruleId + '&env=' + env);
    }

    getOCFSceneMetaDetails(env: string) {
      console.log(env);
      return this.httpClient.get<OcfRuleMeta[]>('http://localhost:5200/st/ocfScenesNames?env=' + env);
    }

    getOCFSceneDetails(env: string, ruleId: string) {
      console.log(env);
      return this.httpClient.get('http://localhost:5200/st/ocfSceneDetails?sceneId=' + ruleId + '&env=' + env);
    }
}
