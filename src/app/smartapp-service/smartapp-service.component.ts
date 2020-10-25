import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StClientService } from '../service/st-client.service';

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
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private stClient: StClientService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.env = this.route.snapshot.params['env'];
    this.description = "Fetches all smartapp meta details.";
    this.getSmartAppMetaDetails();
    console.log('SmartappServiceComponent ngOnInit() is called.');
  }

  getSmartAppMetaDetails(): void {
  //   this.stClient.getSceneMetaDetails(this.env).subscribe(
  //    response => this.parseResponse(response)
  //  );
  this.smartAppMetaDetails = "Implementation is still in progress...";
 }

}
