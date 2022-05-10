import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanteenAddAppUserAccompiedComponentComponent } from './canteen-add-app-user-accompied-component.component';

describe('CanteenAddAppUserAccompiedComponentComponent', () => {
  let component: CanteenAddAppUserAccompiedComponentComponent;
  let fixture: ComponentFixture<CanteenAddAppUserAccompiedComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanteenAddAppUserAccompiedComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanteenAddAppUserAccompiedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
