import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CostCenterLocationMappingComponent } from './cost-center-location-mapping.component';

describe('CostCenterLocationMappingComponent', () => {
  let component: CostCenterLocationMappingComponent;
  let fixture: ComponentFixture<CostCenterLocationMappingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCenterLocationMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterLocationMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
