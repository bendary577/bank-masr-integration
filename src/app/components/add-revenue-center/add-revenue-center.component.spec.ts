import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRevenueCenterComponent } from './add-revenue-center.component';

describe('AddRevenueCenterComponent', () => {
  let component: AddRevenueCenterComponent;
  let fixture: ComponentFixture<AddRevenueCenterComponent>;

  beforeEach(async(() => {
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
