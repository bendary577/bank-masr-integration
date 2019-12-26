import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedTransferComponent } from './booked-transfer.component';

describe('BookedTransferComponent', () => {
  let component: BookedTransferComponent;
  let fixture: ComponentFixture<BookedTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
