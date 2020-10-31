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
  deviceTypeName: string;
}

export interface RuleMeta{
  ruleId: string;
  ruleName: string;
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
}
