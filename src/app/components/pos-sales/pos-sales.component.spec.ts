import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PosSalesComponent } from './pos-sales.component';

describe('PosSalesComponent', () => {
  let component: PosSalesComponent;
  let fixture: ComponentFixture<PosSalesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PosSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
