import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTypesConfigurationComponent } from './operation-types-configuration.component';

describe('OperationTypesConfigurationComponent', () => {
  let component: OperationTypesConfigurationComponent;
  let fixture: ComponentFixture<OperationTypesConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationTypesConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationTypesConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
