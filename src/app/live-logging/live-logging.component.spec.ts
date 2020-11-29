import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveLoggingComponent } from './live-logging.component';

describe('LiveLoggingComponent', () => {
  let component: LiveLoggingComponent;
  let fixture: ComponentFixture<LiveLoggingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveLoggingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveLoggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
