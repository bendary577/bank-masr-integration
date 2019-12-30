import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedInvoiceConfigurationComponent } from './approved-invoice-configuration.component';

describe('ApprovedInvoiceConfigurationComponent', () => {
  let component: ApprovedInvoiceConfigurationComponent;
  let fixture: ComponentFixture<ApprovedInvoiceConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedInvoiceConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedInvoiceConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
