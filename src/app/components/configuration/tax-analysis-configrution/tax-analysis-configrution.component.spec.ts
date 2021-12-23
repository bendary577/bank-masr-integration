import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaxAnalysisConfigrutionComponent } from './tax-analysis-configrution.component';

describe('InforSystemConfigurationComponent', () => {
  let component: TaxAnalysisConfigrutionComponent;
  let fixture: ComponentFixture<TaxAnalysisConfigrutionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxAnalysisConfigrutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxAnalysisConfigrutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});