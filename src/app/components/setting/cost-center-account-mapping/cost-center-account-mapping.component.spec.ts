import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterAccountMappingComponent } from './cost-center-account-mapping.component';

describe('CostCenterAccountMappingComponent', () => {
  let component: CostCenterAccountMappingComponent;
  let fixture: ComponentFixture<CostCenterAccountMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCenterAccountMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterAccountMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
