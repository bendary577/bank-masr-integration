import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalConfigurationComponent } from './journal-configuration.component';

describe('JournalConfigurationComponent', () => {
  let component: JournalConfigurationComponent;
  let fixture: ComponentFixture<JournalConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
