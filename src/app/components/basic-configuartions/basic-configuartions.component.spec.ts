import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BasicConfiguartionsComponent } from './basic-configuartions.component';

describe('BasicConfiguartionsComponent', () => {
  let component: BasicConfiguartionsComponent;
  let fixture: ComponentFixture<BasicConfiguartionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicConfiguartionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicConfiguartionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
