import { HttpClient } from '@angular/common/http';
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
}

export interface RuleMeta{
  ruleId: string;
  ruleName: string;
}

export interface SceneMeta{
  sceneId: string;
  sceneName: string;
}

@Injectable({
  providedIn: 'root'
})
export class StClientService {

  constructor(private httpClient: HttpClient) { }

  // Location API
  getLocationsDetails(env: string) {
    console.log(env);
    return this.httpClient.get<Location[]>('http://localhost:5200/st/locations?env=' + env);
  }

  // Device API
  getDeviceMetaDetails(env: string) {
    console.log(env);
    return this.httpClient.get<DeviceMeta[]>('http://localhost:5200/st/devicesNames?env=' + env);
  }

  // Rule API
  getRuleMetaDetails(env: string) {
    console.log(env);
    return this.httpClient.get<RuleMeta[]>('http://localhost:5200/st/rulesNames?env=' + env);
  }

  getRuleDetails(env: string, ruleId: string) {
    console.log(env);
    return this.httpClient.get<RuleMeta[]>('http://localhost:5200/st/ruleDetails?ruleId=' + ruleId + '&env=' + env);
  }

  // Scene API
  getSceneMetaDetails(env: string) {
    console.log(env);
    return this.httpClient.get<SceneMeta[]>('http://localhost:5200/st/scenesNames?env=' + env);
  }
}
