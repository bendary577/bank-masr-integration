import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditNoteConfigurationComponent } from './credit-note-configuration.component';

describe('CreditNoteConfigurationComponent', () => {
  let component: CreditNoteConfigurationComponent;
  let fixture: ComponentFixture<CreditNoteConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditNoteConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditNoteConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
