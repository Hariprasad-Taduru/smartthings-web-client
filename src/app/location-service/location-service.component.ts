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

  locationService: any;
  description: any;
  loading: boolean = true;

  constructor(private route: ActivatedRoute,
              private stClient: StClientService) {}

  ngOnInit(): void {
    this.loading = true;
    this.env = this.route.snapshot.params['env'];
    this.description = "Fetches all location details.";
    this.getLocationsDetails();
    console.log('LocationServiceComponent ngOnInit() is called.');
  }

  getLocationsDetails(): void {
     this.stClient.getLocationsDetails(this.env).subscribe(
      response => this.parseResponse(response)
    );
  }

  parseResponse(response) {
    this.loading = false;
    this.locationService = response;
  }
}
