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
  ruleDetails: any;
  description: any;
  loadingMeta: boolean = true;
  loadingRule: boolean = false;
  ruleId: any = null;
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
    this.loadingMeta = true;
    this.loadingRule = false;
    this.env = this.route.snapshot.params['env'];
    this.description = "Fetches all rules meta details.";
    this.getRuleMetaDetails();
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
}
