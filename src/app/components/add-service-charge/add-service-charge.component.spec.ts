import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceChargeComponent } from './add-service-charge.component';

describe('AddServiceChargeComponent', () => {
  let component: AddServiceChargeComponent;
  let fixture: ComponentFixture<AddServiceChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServiceChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
