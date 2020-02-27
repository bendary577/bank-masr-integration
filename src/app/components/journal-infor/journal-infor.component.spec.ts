import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalInforComponent } from './journal-infor.component';

describe('JournalInforComponent', () => {
  let component: JournalInforComponent;
  let fixture: ComponentFixture<JournalInforComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalInforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
