import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuppliersInforConfigurationComponent } from './suppliers-infor-configuration.component';

describe('SuppliersInforConfigurationComponent', () => {
  let component: SuppliersInforConfigurationComponent;
  let fixture: ComponentFixture<SuppliersInforConfigurationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliersInforConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersInforConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
