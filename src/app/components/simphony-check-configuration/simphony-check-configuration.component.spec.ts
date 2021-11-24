import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimphonyCheckConfigurationComponent } from './simphony-check-configuration.component';

describe('SimphonyCheckConfigurationComponent', () => {
  let component: SimphonyCheckConfigurationComponent;
  let fixture: ComponentFixture<SimphonyCheckConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimphonyCheckConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimphonyCheckConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
