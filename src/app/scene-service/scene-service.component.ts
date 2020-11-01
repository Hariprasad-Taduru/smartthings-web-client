import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StClientService } from '../service/st-client.service';
import { validate as uuidValidate } from 'uuid';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-scene-service',
  templateUrl: './scene-service.component.html',
  styleUrls: ['./scene-service.component.css']
})
export class SceneServiceComponent implements OnInit {

  env = '';
  sceneMetaDetails: any;
  sceneDetails: any;
  ocfSceneDetails: any;
  sceneId: any;
  ocfSceneId: any;
  sceneOcfMetaDetails: any;
  description: any;
  loadingMeta: boolean = true;
  loadingScene: boolean = false;
  public editorOptions: JsonEditorOptions;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;

  constructor(
    private route: ActivatedRoute,
    private stClient: StClientService) {
      this.editorOptions = new JsonEditorOptions();
      this.editorOptions.mode = 'text';
      this.editorOptions.onChange = () => console.log(this.editor.get());
    }

  ngOnInit(): void {
    this.loadingMeta = true;
    this.ocfSceneId = null;
    this.env = this.route.snapshot.params['env'];
    this.description = "Fetches all scene meta details.";
    this.getSceneMetaDetails();
    this.getOcfSceneMetaDetails();
    console.log('SceneServiceComponent ngOnInit() is called.');
  }

  getSceneMetaDetails(): void {
    this.stClient.getSceneMetaDetails(this.env).subscribe(
     response => this.parseResponse(response)
   );
 }

 getSceneDetails(): void {
  if (this.sceneId === null) {
    console.log('sceenId is null');
    return;
  }
  if (uuidValidate(this.sceneId) === false) {
    console.log('deviceId is not in UUID format.');
  }
  this.loadingScene = true;
  this.stClient.getSceneDetails(this.env, this.sceneId).subscribe(
    response => this.parseSceneResponse(response)
  );
}

 parseResponse(response) {
   this.loadingMeta = false;
   this.sceneMetaDetails = response;
 }

 parseSceneResponse(response) {
  console.log('Scene detail: {}', response);
  this.loadingScene = false;
  this.sceneDetails = response;
}

// OCF Stuff
getOcfSceneMetaDetails(): void {
  this.stClient.getOCFSceneMetaDetails(this.env).subscribe(
    response => this.parseOcfSceneMetaResponse(response)
  );
}
parseOcfSceneMetaResponse(response) {
  console.log('OCF Scenes: {}', response);
  this.loadingMeta = false;
  this.sceneOcfMetaDetails = response;
}

getOcfSceneDetails(): void {
  if (this.ocfSceneId === null) {
    console.log('ocfSceneId is null');
    return;
  }
  if (uuidValidate(this.ocfSceneId) === false) {
    console.log('ocfSceneId is not in UUID format.');
  }
  this.loadingScene = true;
  this.stClient.getOCFSceneDetails(this.env, this.ocfSceneId).subscribe(
    response => this.parseOcfSceneResponse(response)
  );
}

parseOcfSceneResponse(response) {
  console.log('OCF Scene detail: {}', response);
  this.loadingScene = false;
  this.ocfSceneDetails = response;
}
}
