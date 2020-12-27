import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebServiceInvokerConfigurationComponent } from './web-service-invoker-configuration.component';

describe('WebServiceInvokerConfigurationComponent', () => {
  let component: WebServiceInvokerConfigurationComponent;
  let fixture: ComponentFixture<WebServiceInvokerConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebServiceInvokerConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebServiceInvokerConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
