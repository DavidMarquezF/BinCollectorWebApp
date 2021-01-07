import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesPlanningComponent } from './routes-planning.component';

describe('RoutesPlanningComponent', () => {
  let component: RoutesPlanningComponent;
  let fixture: ComponentFixture<RoutesPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutesPlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
