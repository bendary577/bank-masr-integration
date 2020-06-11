import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosSalesInforComponent } from './pos-sales-infor.component';

describe('PosSalesInforComponent', () => {
  let component: PosSalesInforComponent;
  let fixture: ComponentFixture<PosSalesInforComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosSalesInforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosSalesInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
