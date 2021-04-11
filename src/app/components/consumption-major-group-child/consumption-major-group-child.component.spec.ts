import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionMajorGroupChildComponent } from './consumption-major-group-child.component';

describe('ConsumptionMajorGroupChildComponent', () => {
  let component: ConsumptionMajorGroupChildComponent;
  let fixture: ComponentFixture<ConsumptionMajorGroupChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumptionMajorGroupChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionMajorGroupChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
