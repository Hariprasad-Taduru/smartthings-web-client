import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneServiceComponent } from './scene-service.component';

describe('SceneServiceComponent', () => {
  let component: SceneServiceComponent;
  let fixture: ComponentFixture<SceneServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
