import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZealVoucherComponent } from './zeal-voucher.component';

describe('ZealVoucherComponent', () => {
  let component: ZealVoucherComponent;
  let fixture: ComponentFixture<ZealVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZealVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZealVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
