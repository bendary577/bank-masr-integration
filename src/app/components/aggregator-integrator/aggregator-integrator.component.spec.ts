import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorIntegratorComponent } from './aggregator-integrator.component';

describe('AggregatorIntegratorComponent', () => {
  let component: AggregatorIntegratorComponent;
  let fixture: ComponentFixture<AggregatorIntegratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatorIntegratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorIntegratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
