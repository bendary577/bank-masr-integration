import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OhraConfigurationComponent } from './ohra-configuration.component';

describe('OhraConfigurationComponent', () => {
  let component: OhraConfigurationComponent;
  let fixture: ComponentFixture<OhraConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OhraConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OhraConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
