import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCostCenterAccountCodeComponent } from './map-cost-center-account-code.component';

describe('MapCostCenterAccountCodeComponent', () => {
  let component: MapCostCenterAccountCodeComponent;
  let fixture: ComponentFixture<MapCostCenterAccountCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapCostCenterAccountCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCostCenterAccountCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
