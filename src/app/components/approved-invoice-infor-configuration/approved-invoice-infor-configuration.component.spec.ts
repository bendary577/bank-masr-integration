import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApprovedInvoiceInforConfigurationComponent } from './approved-invoice-infor-configuration.component';

describe('ApprovedInvoiceInforConfigurationComponent', () => {
  let component: ApprovedInvoiceInforConfigurationComponent;
  let fixture: ComponentFixture<ApprovedInvoiceInforConfigurationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedInvoiceInforConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedInvoiceInforConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
