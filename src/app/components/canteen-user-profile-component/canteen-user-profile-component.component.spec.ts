import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanteenUserProfileComponentComponent } from './canteen-user-profile-component.component';

describe('CanteenUserProfileComponentComponent', () => {
  let component: CanteenUserProfileComponentComponent;
  let fixture: ComponentFixture<CanteenUserProfileComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanteenUserProfileComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanteenUserProfileComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
