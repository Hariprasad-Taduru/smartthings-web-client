import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StClientService } from '../service/st-client.service';
import { validate as uuidValidate } from 'uuid';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-rule-service',
  templateUrl: './rule-service.component.html',
  styleUrls: ['./rule-service.component.css']
})
export class RuleServiceComponent implements OnInit {

  env = '';
  ruleMetaDetails: any;
  ruleOcfMetaDetails: any;
  ruleDetails: any;
  ocfRuleDetails: any;
  description: any;
  loadingMeta: boolean = true;
  loadingRule: boolean = false;
  ruleId: any = null;
  ocfRuleId: any = null;
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
    this.ruleId = null;
    this.ocfRuleId = null;
    this.loadingMeta = true;
    this.loadingRule = false;
    this.env = this.route.snapshot.params['env'];
    this.description = "Fetches all rules meta details.";
    this.getRuleMetaDetails();
    this.getOcfRuleMetaDetails();
    console.log('RuleServiceComponent ngOnInit() is called.');
  }

  getRuleMetaDetails(): void {
    this.stClient.getRuleMetaDetails(this.env).subscribe(
      response => this.parseRuleMetaResponse(response)
    );
  }

  getRuleDetails(): void {
    if (this.ruleId === null) {
      console.log('ruleId is null');
      return;
    }
    if (uuidValidate(this.ruleId) === false) {
      console.log('ruleId is not in UUID format.');
    }
    this.loadingRule = true;
    this.stClient.getRuleDetails(this.env, this.ruleId).subscribe(
      response => this.parseRuleResponse(response)
    );
  }

  parseRuleMetaResponse(response) {
    console.log('Rules: {}', response);
    this.loadingMeta = false;
    this.ruleMetaDetails = response;
  }

  parseRuleResponse(response) {
    console.log('Rule detail: {}', response);
    this.loadingRule = false;
    this.ruleDetails = response;
  }

  // OCF Stuff
  getOcfRuleMetaDetails(): void {
    this.stClient.getOCFRuleMetaDetails(this.env).subscribe(
      response => this.parseOcfRuleMetaResponse(response)
    );
  }
  parseOcfRuleMetaResponse(response) {
    console.log('OCf Rules: {}', response);
    this.loadingMeta = false;
    this.ruleOcfMetaDetails = response;
  }

  getOcfRuleDetails(): void {
    if (this.ocfRuleId === null) {
      console.log('ocfRuleId is null');
      return;
    }
    if (uuidValidate(this.ocfRuleId) === false) {
      console.log('ocfRuleId is not in UUID format.');
    }
    this.loadingRule = true;
    this.stClient.getOCFRuleDetails(this.env, this.ocfRuleId).subscribe(
      response => this.parseOcfRuleResponse(response)
    );
  }

  parseOcfRuleResponse(response) {
    console.log('OCF Rule detail: {}', response);
    this.loadingRule = false;
    this.ocfRuleDetails = response;
  }

}
