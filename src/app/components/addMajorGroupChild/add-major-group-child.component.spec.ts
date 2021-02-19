import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMajorGroupChildComponent } from './add-major-group-child.component';

describe('AddMajorGroupChildComponent', () => {
  let component: AddMajorGroupChildComponent;
  let fixture: ComponentFixture<AddMajorGroupChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMajorGroupChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMajorGroupChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
