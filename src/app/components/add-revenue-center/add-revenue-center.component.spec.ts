import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddRevenueCenterComponent } from './add-revenue-center.component';

describe('AddRevenueCenterComponent', () => {
  let component: AddRevenueCenterComponent;
  let fixture: ComponentFixture<AddRevenueCenterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRevenueCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRevenueCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
