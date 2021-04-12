import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperaBookingDashBoardComponent } from './opera-booking-dash-board.component';

describe('OperaBookingDashBoardComponent', () => {
  let component: OperaBookingDashBoardComponent;
  let fixture: ComponentFixture<OperaBookingDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperaBookingDashBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperaBookingDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
