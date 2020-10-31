import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StClientService } from '../service/st-client.service';

@Component({
  selector: 'app-location-service',
  templateUrl: './location-service.component.html',
  styleUrls: ['./location-service.component.css']
})
export class LocationServiceComponent implements OnInit {
  env = '';

  testLocation: any;
  description: any;
  loadingLocation: boolean = true;
  loadingAllLocations: boolean = false;
  allLocations: any;

  constructor(private route: ActivatedRoute,
              private stClient: StClientService) {}

  ngOnInit(): void {
    this.loadingLocation = true;
    this.loadingAllLocations = false;
    this.env = this.route.snapshot.params['env'];
    this.description = "Fetching test location details.";
    this.getTestLocationDetails();
    console.log('LocationServiceComponent ngOnInit() is called.');
  }

  getTestLocationDetails(): void {
    this.stClient.getTestLocationDetails(this.env).subscribe(
      response => this.parseTestLocationResponse(response)
    );
  }
  getLocationsDetails(): void {
     this.loadingAllLocations = true;
     this.stClient.getAllLocationsDetails(this.env).subscribe(
      response => this.parseResponse(response)
    );
  }

  parseTestLocationResponse(response) {
    this.loadingLocation = false;
    this.testLocation = response;
  }

  parseResponse(response) {
    this.loadingAllLocations = false;
    this.allLocations = response;
  }
}
