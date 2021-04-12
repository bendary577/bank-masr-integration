import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApprovedInvoicesInforComponent } from './approved-invoices-infor.component';

describe('ApprovedInvoicesInforComponent', () => {
  let component: ApprovedInvoicesInforComponent;
  let fixture: ComponentFixture<ApprovedInvoicesInforComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedInvoicesInforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedInvoicesInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
