import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvokerComponent } from './view-invoker.component';

describe('ViewInvokerComponent', () => {
  let component: ViewInvokerComponent;
  let fixture: ComponentFixture<ViewInvokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInvokerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInvokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
