import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardPointsSettingsComponent } from './reward-points-settings.component';

describe('RewardPointsSettingsComponent', () => {
  let component: RewardPointsSettingsComponent;
  let fixture: ComponentFixture<RewardPointsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardPointsSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardPointsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
