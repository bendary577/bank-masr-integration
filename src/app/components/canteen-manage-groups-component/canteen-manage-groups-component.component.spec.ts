import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanteenManageGroupsComponentComponent } from './canteen-manage-groups-component.component';

describe('CanteenManageGroupsComponentComponent', () => {
  let component: CanteenManageGroupsComponentComponent;
  let fixture: ComponentFixture<CanteenManageGroupsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanteenManageGroupsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanteenManageGroupsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
