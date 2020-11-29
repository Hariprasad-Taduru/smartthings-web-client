import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  title = 'Welcome to SmartThings Postman Tool';
  description = "A web client for testing SmartThings cloud platform.";

  constructor() { }

  ngOnInit(): void {
  }

}
