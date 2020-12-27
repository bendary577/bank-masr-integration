import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWebServiceInvokerComponent } from './add-web-service-invoker.component';

describe('AddWebServiceInvokerComponent', () => {
  let component: AddWebServiceInvokerComponent;
  let fixture: ComponentFixture<AddWebServiceInvokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWebServiceInvokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWebServiceInvokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
