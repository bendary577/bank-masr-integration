import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimphonyLocationConfigurationComponent } from './simphony-location-configuration.component';

describe('SimphonyLocationConfigurationComponent', () => {
  let component: SimphonyLocationConfigurationComponent;
  let fixture: ComponentFixture<SimphonyLocationConfigurationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SimphonyLocationConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimphonyLocationConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
