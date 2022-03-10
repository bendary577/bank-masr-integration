import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorIntegratorConfigComponent } from './aggregator-integrator-config.component';

describe('AggregatorIntegratorConfigComponent', () => {
  let component: AggregatorIntegratorConfigComponent;
  let fixture: ComponentFixture<AggregatorIntegratorConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatorIntegratorConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorIntegratorConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
