import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorMappingComponent } from './aggregator-mapping.component';

describe('AggregatorMappingComponent', () => {
  let component: AggregatorMappingComponent;
  let fixture: ComponentFixture<AggregatorMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatorMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
