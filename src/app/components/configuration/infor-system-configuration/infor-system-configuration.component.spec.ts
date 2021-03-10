import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InforSystemConfigurationComponent } from './infor-system-configuration.component';

describe('InforSystemConfigurationComponent', () => {
  let component: InforSystemConfigurationComponent;
  let fixture: ComponentFixture<InforSystemConfigurationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InforSystemConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InforSystemConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
