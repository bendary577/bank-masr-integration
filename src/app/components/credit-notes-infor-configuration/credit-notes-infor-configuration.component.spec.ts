import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditNotesInforConfigurationComponent } from './credit-notes-infor-configuration.component';

describe('CreditNotesInforConfigurationComponent', () => {
  let component: CreditNotesInforConfigurationComponent;
  let fixture: ComponentFixture<CreditNotesInforConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditNotesInforConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditNotesInforConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
