import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookedProductionConfigurationComponent } from './booked-production-configuration.component';

describe('BookedProductionConfigurationComponent', () => {
  let component: BookedProductionConfigurationComponent;
  let fixture: ComponentFixture<BookedProductionConfigurationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedProductionConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedProductionConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
