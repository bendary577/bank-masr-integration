import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerConfigurationComponent } from './scheduler-configuration.component';

describe('SchedulerConfigurationComponent', () => {
  let component: SchedulerConfigurationComponent;
  let fixture: ComponentFixture<SchedulerConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
