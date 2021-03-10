import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PosSalesConfigurationComponent } from './pos-sales-configuration.component';

describe('PosSalesConfigurationComponent', () => {
  let component: PosSalesConfigurationComponent;
  let fixture: ComponentFixture<PosSalesConfigurationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PosSalesConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosSalesConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
