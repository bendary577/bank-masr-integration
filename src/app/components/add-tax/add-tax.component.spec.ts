import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddTaxComponent } from './add-tax.component';

describe('AddTaxComponent', () => {
  let component: AddTaxComponent;
  let fixture: ComponentFixture<AddTaxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
