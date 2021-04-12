import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddTenderChildComponent } from './add-tender-child.component';

describe('AddTenderChildComponent', () => {
  let component: AddTenderChildComponent;
  let fixture: ComponentFixture<AddTenderChildComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTenderChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTenderChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
