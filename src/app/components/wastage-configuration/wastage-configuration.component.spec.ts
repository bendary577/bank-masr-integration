import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WastageConfigurationComponent } from './wastage-configuration.component';

describe('WastageConfigurationComponent', () => {
  let component: WastageConfigurationComponent;
  let fixture: ComponentFixture<WastageConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WastageConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WastageConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
