import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddTenderComponent } from './add-tender.component';

describe('AddTenderComponent', () => {
  let component: AddTenderComponent;
  let fixture: ComponentFixture<AddTenderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
