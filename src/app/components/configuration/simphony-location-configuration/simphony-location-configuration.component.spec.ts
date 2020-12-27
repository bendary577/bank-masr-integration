import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimphonyLocationConfigurationComponent } from './simphony-location-configuration.component';

describe('SimphonyLocationConfigurationComponent', () => {
  let component: SimphonyLocationConfigurationComponent;
  let fixture: ComponentFixture<SimphonyLocationConfigurationComponent>;

  beforeEach(async(() => {
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
