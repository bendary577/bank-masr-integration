import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderConfigurationComponent } from './tender-configuration.component';

describe('TenderConfigurationComponent', () => {
  let component: TenderConfigurationComponent;
  let fixture: ComponentFixture<TenderConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
