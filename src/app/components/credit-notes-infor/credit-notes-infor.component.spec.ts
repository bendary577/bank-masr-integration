import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditNotesInforComponent } from './credit-notes-infor.component';

describe('CreditNotesInforComponent', () => {
  let component: CreditNotesInforComponent;
  let fixture: ComponentFixture<CreditNotesInforComponent>;

  beforeEach(async(() => {
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
