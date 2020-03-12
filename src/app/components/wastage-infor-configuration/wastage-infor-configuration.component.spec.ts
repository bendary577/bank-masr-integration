import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WastageInforConfigurationComponent } from './wastage-infor-configuration.component';

describe('WastageInforConfigurationComponent', () => {
  let component: WastageInforConfigurationComponent;
  let fixture: ComponentFixture<WastageInforConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WastageInforConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WastageInforConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
