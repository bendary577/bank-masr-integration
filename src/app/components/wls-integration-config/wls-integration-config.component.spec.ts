import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WlsIntegrationConfigComponent } from './wls-integration-config.component';

describe('WlsIntegrationConfigComponent', () => {
  let component: WlsIntegrationConfigComponent;
  let fixture: ComponentFixture<WlsIntegrationConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WlsIntegrationConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WlsIntegrationConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
