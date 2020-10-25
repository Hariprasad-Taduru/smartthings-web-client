import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleServiceComponent } from './rule-service.component';

describe('RuleServiceComponent', () => {
  let component: RuleServiceComponent;
  let fixture: ComponentFixture<RuleServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
