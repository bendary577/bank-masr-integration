import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreditNotesInforComponent } from './credit-notes-infor.component';

describe('CreditNotesInforComponent', () => {
  let component: CreditNotesInforComponent;
  let fixture: ComponentFixture<CreditNotesInforComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditNotesInforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditNotesInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
