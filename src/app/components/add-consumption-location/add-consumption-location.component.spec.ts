import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsumptionLocationComponent } from './add-consumption-location.component';

describe('AddConsumptionLocationComponent', () => {
  let component: AddConsumptionLocationComponent;
  let fixture: ComponentFixture<AddConsumptionLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConsumptionLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConsumptionLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
