import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperaPaymentsComponent } from './opera-payments.component';

describe('OperaPaymentsComponent', () => {
  let component: OperaPaymentsComponent;
  let fixture: ComponentFixture<OperaPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperaPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperaPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
