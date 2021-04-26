import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsumptionLocationItemsComponent } from './add-consumption-location-items.component';

describe('AddConsumptionLocationItemsComponent', () => {
  let component: AddConsumptionLocationItemsComponent;
  let fixture: ComponentFixture<AddConsumptionLocationItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConsumptionLocationItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConsumptionLocationItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
