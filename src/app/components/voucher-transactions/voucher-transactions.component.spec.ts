import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherTransactionsComponent } from './voucher-transactions.component';

describe('VoucherTransactionsComponent', () => {
  let component: VoucherTransactionsComponent;
  let fixture: ComponentFixture<VoucherTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
