import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRewardPointsUserComponent } from './add-reward-points-user.component';

describe('AddRewardPointsUserComponent', () => {
  let component: AddRewardPointsUserComponent;
  let fixture: ComponentFixture<AddRewardPointsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRewardPointsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRewardPointsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
