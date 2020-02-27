import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedTransferInforConfigurationComponent } from './booked-transfer-infor-configuration.component';

describe('BookedTransferInforConfigurationComponent', () => {
  let component: BookedTransferInforConfigurationComponent;
  let fixture: ComponentFixture<BookedTransferInforConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedTransferInforConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedTransferInforConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
