import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StClientService } from '../service/st-client.service';

@Component({
  selector: 'app-scene-service',
  templateUrl: './scene-service.component.html',
  styleUrls: ['./scene-service.component.css']
})
export class SceneServiceComponent implements OnInit {

  env = '';
  sceneMetaDetails: any;
  sceneDetails: any;
  sceneId: any;
  description: any;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private stClient: StClientService) {}

  ngOnInit(): void {
    this.loading = true;
    this.env = this.route.snapshot.params['env'];
    this.description = "Fetches all scene meta details.";
    this.getSceneMetaDetails();
    console.log('SceneServiceComponent ngOnInit() is called.');
  }

  getSceneMetaDetails(): void {
    this.stClient.getSceneMetaDetails(this.env).subscribe(
     response => this.parseResponse(response)
   );
 }

 getSceneDetails(): void {
  this.sceneDetails = 'TODO';
  //   this.stClient.getDeviceMetaDetails(this.env).subscribe(
  //    response => this.parseResponse(response)
  //  )
  }

 parseResponse(response) {
   this.loading = false;
   this.sceneMetaDetails = response;
 }

}
