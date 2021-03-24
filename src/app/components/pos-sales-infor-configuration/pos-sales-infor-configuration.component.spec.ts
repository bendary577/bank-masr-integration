import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PosSalesInforConfigurationComponent } from './pos-sales-infor-configuration.component';

describe('PosSalesInforConfigurationComponent', () => {
  let component: PosSalesInforConfigurationComponent;
  let fixture: ComponentFixture<PosSalesInforConfigurationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PosSalesInforConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosSalesInforConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
