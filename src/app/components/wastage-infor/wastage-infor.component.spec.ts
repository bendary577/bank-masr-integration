import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WastageInforComponent } from './wastage-infor.component';

describe('WastageInforComponent', () => {
  let component: WastageInforComponent;
  let fixture: ComponentFixture<WastageInforComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WastageInforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WastageInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
