import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import { StClientService } from '../service/st-client.service';
//import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import {EventSourcePolyfill} from 'ng-event-source';
import { NgxAutoScroll } from 'ngx-auto-scroll';

@Component({
  selector: 'app-live-logging',
  templateUrl: './live-logging.component.html',
  styleUrls: ['./live-logging.component.css']
})
export class LiveLoggingComponent implements OnInit {
  @ViewChild(NgxAutoScroll) ngxAutoScroll: NgxAutoScroll;
  eventList: any[];
  env: any;
  locationId: any;
  patToken: any;

  constructor(
    private _zone: NgZone,
    private route: ActivatedRoute,
    private stClient: StClientService) { }


  ngOnInit(): void {
    this.eventList = new Array();
    this.env = this.route.snapshot.params['env'];
    this.stClient.getSubscriptionUrl(this.env).subscribe(
      response => this.parseSubscriptionResponse(response)
    );

  }
  public forceScrollDown(): void {
    this.ngxAutoScroll.forceScrollDown();
  }
  parseLocationIdResponse(response) {
    console.log('get location live logging meta: ', response);
     this.locationId = response.locationId;
     this.patToken = response.patToken;
     var subscriptionUrl: string = null;

     if (this.env === 'prd') {
      subscriptionUrl = 'https://api.smartthings.com/subscriptions'
     } else if (this.env === 'acpt') {
      subscriptionUrl = 'https://api.stacceptance.com/subscriptions'
     } else {
      subscriptionUrl = 'https://apis.smartthingsgdev.com/subscriptions';
     }

     console.log('subscription url: ', subscriptionUrl);
   }

  parseSubscriptionResponse(response) {
    console.log('subscription response: ', response);
    var registrationUrl = response.registrationUrl;

    this.getSSEvents(registrationUrl);
  }

  getSSEvents(registrationUrl: string) {
    console.log('getSSEvents link: ', registrationUrl);

    let eventSource = new EventSourcePolyfill(registrationUrl, {headers: {
              Authorization: 'Bearer c128ab58-8ef7-4abd-9d02-2651298ae9bb',
              'Content-Type': 'application/json'
              }});

    eventSource.addEventListener('DEVICE_EVENT', message => {
        console.log('getSSEvents event: ', message);
        console.log('getSSEvents event.type: ', message.type);
        var node = JSON.parse(JSON.stringify(message));
        console.log('getSSEvents node: ', node);
        this.eventList.push(node.data);
    });

    eventSource.addEventListener('LOCATION_LIFECYCLE_EVENT', message => {
      console.log('getSSEvents event: ', message);
      console.log('getSSEvents event.type: ', message.type);
      var node = JSON.parse(JSON.stringify(message));
      console.log('getSSEvents node: ', node);
      this.eventList.push(node.data);
    });

    eventSource.addEventListener('DEVICE_LIFECYCLE_EVENT', message => {
      console.log('getSSEvents event: ', message);
      console.log('getSSEvents event.type: ', message.type);
      var node = JSON.parse(JSON.stringify(message));
      console.log('getSSEvents node: ', node);
      this.eventList.push(node.data);
    });

    eventSource.addEventListener('MODE_EVENT', message => {
      console.log('getSSEvents event: ', message);
      console.log('getSSEvents event.type: ', message.type);
      var node = JSON.parse(JSON.stringify(message));
      console.log('getSSEvents node: ', node);
      this.eventList.push(node.data);
    });

    eventSource.onopen = (a) => {
      console.log('getSSEvents on-open: ', a);
    };
    eventSource.onerror = (e) => {
      console.log('getSSEvents on-error: ', e);
    };
  }

  clearTable() {
    this.eventList = null;
    this.eventList = new Array();
  }
}
