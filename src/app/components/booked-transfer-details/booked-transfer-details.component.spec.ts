import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookedTransferDetailsComponent } from './booked-transfer-details.component';

describe('BookedTransferDetailsComponent', () => {
  let component: BookedTransferDetailsComponent;
  let fixture: ComponentFixture<BookedTransferDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedTransferDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedTransferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
