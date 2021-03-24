import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TenderConfigurationComponent } from './tender-configuration.component';

describe('TenderConfigurationComponent', () => {
  let component: TenderConfigurationComponent;
  let fixture: ComponentFixture<TenderConfigurationComponent>;

  beforeEach(waitForAsync(() => {
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
