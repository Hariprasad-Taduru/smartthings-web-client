import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  title = 'Welcome to SmartThings Postman Tool';
  description = "A web client for testing SmartThings's API's for a configured test location.";

  constructor() { }

  ngOnInit(): void {
  }

}
