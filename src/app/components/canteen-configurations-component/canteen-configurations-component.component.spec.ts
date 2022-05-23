import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanteenConfigurationsComponentComponent } from './canteen-configurations-component.component';

describe('CanteenConfigurationsComponentComponent', () => {
  let component: CanteenConfigurationsComponentComponent;
  let fixture: ComponentFixture<CanteenConfigurationsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanteenConfigurationsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanteenConfigurationsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
