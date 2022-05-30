import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorIntegrationErrorComponent } from './aggregator-integration-error.component';

describe('AggregatorIntegrationErrorComponent', () => {
  let component: AggregatorIntegrationErrorComponent;
  let fixture: ComponentFixture<AggregatorIntegrationErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatorIntegrationErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorIntegrationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
