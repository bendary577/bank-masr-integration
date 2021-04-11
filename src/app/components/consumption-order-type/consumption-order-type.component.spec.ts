import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionOrderTypeComponent } from './consumption-order-type.component';

describe('ConsumptionOrderTypeComponent', () => {
  let component: ConsumptionOrderTypeComponent;
  let fixture: ComponentFixture<ConsumptionOrderTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumptionOrderTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionOrderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
