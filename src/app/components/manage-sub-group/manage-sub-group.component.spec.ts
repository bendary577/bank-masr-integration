import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubGroupComponent } from './manage-sub-group.component';

describe('ManageSubGroupComponent', () => {
  let component: ManageSubGroupComponent;
  let fixture: ComponentFixture<ManageSubGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSubGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
