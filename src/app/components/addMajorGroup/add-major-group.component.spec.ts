import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddMajorGroupComponent } from './add-major-group.component';

describe('AddMajorGroupComponent', () => {
  let component: AddMajorGroupComponent;
  let fixture: ComponentFixture<AddMajorGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMajorGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMajorGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
