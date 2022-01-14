import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRewardPointsUsersComponent } from './manage-reward-points-users.component';

describe('ManageRewardPointsUsersComponent', () => {
  let component: ManageRewardPointsUsersComponent;
  let fixture: ComponentFixture<ManageRewardPointsUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRewardPointsUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRewardPointsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
