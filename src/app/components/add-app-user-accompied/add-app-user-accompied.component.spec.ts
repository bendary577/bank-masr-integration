import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppUserAccompiedComponent } from './add-app-user-accompied.component';

describe('AddAppUserAccompiedComponent', () => {
  let component: AddAppUserAccompiedComponent;
  let fixture: ComponentFixture<AddAppUserAccompiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppUserAccompiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppUserAccompiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
