import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelOpiComponent } from './hotel-opi.component';

describe('HotelOpiComponent', () => {
  let component: HotelOpiComponent;
  let fixture: ComponentFixture<HotelOpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelOpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelOpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
