import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMajorGroupComponent } from './add-major-group.component';

describe('AddMajorGroupComponent', () => {
  let component: AddMajorGroupComponent;
  let fixture: ComponentFixture<AddMajorGroupComponent>;

  beforeEach(async(() => {
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
