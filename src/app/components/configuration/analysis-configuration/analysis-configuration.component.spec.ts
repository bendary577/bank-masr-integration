import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisConfigurationComponent } from './analysis-configuration.component';

describe('AnalysisConfigurationComponent', () => {
  let component: AnalysisConfigurationComponent;
  let fixture: ComponentFixture<AnalysisConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
