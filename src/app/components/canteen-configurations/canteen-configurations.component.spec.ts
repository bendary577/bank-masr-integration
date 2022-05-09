import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanteenConfigurationsComponent } from './canteen-configurations.component';

describe('CanteenConfigurationsComponent', () => {
  let component: CanteenConfigurationsComponent;
  let fixture: ComponentFixture<CanteenConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanteenConfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanteenConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
