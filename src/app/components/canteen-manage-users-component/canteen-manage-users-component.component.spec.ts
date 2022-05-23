import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanteenManageUsersComponentComponent } from './canteen-manage-users-component.component';

describe('CanteenManageUsersComponentComponent', () => {
  let component: CanteenManageUsersComponentComponent;
  let fixture: ComponentFixture<CanteenManageUsersComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanteenManageUsersComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanteenManageUsersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
