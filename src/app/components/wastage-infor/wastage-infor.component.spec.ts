import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WastageInforComponent } from './wastage-infor.component';

describe('WastageInforComponent', () => {
  let component: WastageInforComponent;
  let fixture: ComponentFixture<WastageInforComponent>;

  beforeEach(async(() => {
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
