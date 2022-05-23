import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorsConfigurationComponent } from './aggregators-configuration.component';

describe('AggregatorsConfigurationComponent', () => {
  let component: AggregatorsConfigurationComponent;
  let fixture: ComponentFixture<AggregatorsConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatorsConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
