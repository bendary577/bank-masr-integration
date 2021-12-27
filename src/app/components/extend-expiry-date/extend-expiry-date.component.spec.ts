import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendExpiryDateComponent } from './extend-expiry-date.component';

describe('ExtendExpiryDateComponent', () => {
  let component: ExtendExpiryDateComponent;
  let fixture: ComponentFixture<ExtendExpiryDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendExpiryDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendExpiryDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
