import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardPointsActivitiesComponent } from './reward-points-activities.component';

describe('RewardPointsActivitiesComponent', () => {
  let component: RewardPointsActivitiesComponent;
  let fixture: ComponentFixture<RewardPointsActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardPointsActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardPointsActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
