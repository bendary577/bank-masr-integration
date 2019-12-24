import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedInvoiceComponent } from './approved-invoice.component';

describe('ApprovedInvoiceComponent', () => {
  let component: ApprovedInvoiceComponent;
  let fixture: ComponentFixture<ApprovedInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
