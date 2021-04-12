import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppGroupComponent } from './add-app-group.component';

describe('AddAppGroupComponent', () => {
  let component: AddAppGroupComponent;
  let fixture: ComponentFixture<AddAppGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
