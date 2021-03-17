import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WlsIntegrationComponent } from './wls-integration.component';

describe('WlsIntegrationComponent', () => {
  let component: WlsIntegrationComponent;
  let fixture: ComponentFixture<WlsIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WlsIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WlsIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
