import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSimphonyLocationComponent } from './add-simphony-location.component';

describe('AddSimphonyLocationComponent', () => {
  let component: AddSimphonyLocationComponent;
  let fixture: ComponentFixture<AddSimphonyLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSimphonyLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSimphonyLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
