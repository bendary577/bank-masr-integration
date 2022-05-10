import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanteenActivitiesComponentComponent } from './canteen-activities-component.component';

describe('CanteenActivitiesComponentComponent', () => {
  let component: CanteenActivitiesComponentComponent;
  let fixture: ComponentFixture<CanteenActivitiesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanteenActivitiesComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanteenActivitiesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
