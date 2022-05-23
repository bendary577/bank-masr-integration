import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorBranchesMappingComponent } from './aggregator-branches-mapping.component';

describe('AggregatorBranchesMappingComponent', () => {
  let component: AggregatorBranchesMappingComponent;
  let fixture: ComponentFixture<AggregatorBranchesMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatorBranchesMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorBranchesMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
