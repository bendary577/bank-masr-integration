import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueVoucherComponent } from './unique-voucher.component';

describe('UniqueVoucherComponent', () => {
  let component: UniqueVoucherComponent;
  let fixture: ComponentFixture<UniqueVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniqueVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniqueVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
