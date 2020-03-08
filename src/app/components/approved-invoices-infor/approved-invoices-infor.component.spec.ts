import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedInvoicesInforComponent } from './approved-invoices-infor.component';

describe('ApprovedInvoicesInforComponent', () => {
  let component: ApprovedInvoicesInforComponent;
  let fixture: ComponentFixture<ApprovedInvoicesInforComponent>;

  beforeEach(async(() => {
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
