import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddDiscountComponent } from './add-discount.component';

describe('AddDiscountComponent', () => {
  let component: AddDiscountComponent;
  let fixture: ComponentFixture<AddDiscountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
