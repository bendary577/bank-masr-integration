import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCanteenUserComponent } from './add-canteen-user.component';

describe('AddCanteenUserComponent', () => {
  let component: AddCanteenUserComponent;
  let fixture: ComponentFixture<AddCanteenUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCanteenUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCanteenUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
