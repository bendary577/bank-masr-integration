import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JournalInforComponent } from './journal-infor.component';

describe('JournalInforComponent', () => {
  let component: JournalInforComponent;
  let fixture: ComponentFixture<JournalInforComponent>;

  beforeEach(waitForAsync(() => {
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
