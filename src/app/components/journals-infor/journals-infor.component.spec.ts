import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalsInforComponent } from './journals-infor.component';

describe('JournalsInforComponent', () => {
  let component: JournalsInforComponent;
  let fixture: ComponentFixture<JournalsInforComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalsInforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalsInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
