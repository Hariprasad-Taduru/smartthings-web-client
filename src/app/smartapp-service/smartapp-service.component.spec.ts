import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartappServiceComponent } from './smartapp-service.component';

describe('SmartappServiceComponent', () => {
  let component: SmartappServiceComponent;
  let fixture: ComponentFixture<SmartappServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartappServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartappServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
