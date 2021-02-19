import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZealVoucherConfigComponent } from './zeal-voucher-config.component';

describe('ZealVoucherConfigComponent', () => {
  let component: ZealVoucherConfigComponent;
  let fixture: ComponentFixture<ZealVoucherConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZealVoucherConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZealVoucherConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
