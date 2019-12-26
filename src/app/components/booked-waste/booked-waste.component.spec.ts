import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedWasteComponent } from './booked-waste.component';

describe('BookedWasteComponent', () => {
  let component: BookedWasteComponent;
  let fixture: ComponentFixture<BookedWasteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedWasteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedWasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
