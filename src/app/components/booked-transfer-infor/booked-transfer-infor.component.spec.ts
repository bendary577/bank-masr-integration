import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookedTransferInforComponent } from './booked-transfer-infor.component';

describe('BookedTransferInforComponent', () => {
  let component: BookedTransferInforComponent;
  let fixture: ComponentFixture<BookedTransferInforComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedTransferInforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedTransferInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
