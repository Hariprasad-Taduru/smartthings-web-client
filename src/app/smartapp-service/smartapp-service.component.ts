import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StClientService } from '../service/st-client.service';
import { validate as uuidValidate } from 'uuid';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-smartapp-service',
  templateUrl: './smartapp-service.component.html',
  styleUrls: ['./smartapp-service.component.css']
})
export class SmartappServiceComponent implements OnInit {

  env = '';
  smartAppMetaDetails: any;
  smartAppDetails: any;
  smartAppId: any;
  description: any;
  loadingMeta: boolean = true;
  loadingSmartApp: boolean = false;
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
    this.env = this.route.snapshot.params['env'];
    this.description = "Fetches all smartapp meta details.";
    this.getSmartAppMetaDetails();
    console.log('SmartappServiceComponent ngOnInit() is called.');
  }

  getSmartAppMetaDetails(): void {
    this.stClient.getSmartAppMetaDetails(this.env).subscribe(
     response => this.parseResponse(response)
   );
 }

 getSmartAppDetails(): void {
  if (this.smartAppId === null) {
    console.log('smartAppId is null');
    return;
  }
  if (uuidValidate(this.smartAppId) === false) {
    console.log('smartAppId is not in UUID format.');
  }
  this.loadingSmartApp = true;
  this.stClient.getSmartAppDetails(this.env, this.smartAppId).subscribe(
    response => this.parseSmartAppResponse(response)
  );
}

 parseResponse(response) {
   this.loadingMeta = false;
   this.smartAppMetaDetails = response;
 }

 parseSmartAppResponse(response) {
  console.log('SmartApp detail: {}', response);
  this.loadingSmartApp = false;
  this.smartAppDetails = response;
}

}
