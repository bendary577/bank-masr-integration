import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedProductionConfigurationComponent } from './booked-production-configuration.component';

describe('BookedProductionConfigurationComponent', () => {
  let component: BookedProductionConfigurationComponent;
  let fixture: ComponentFixture<BookedProductionConfigurationComponent>;

  beforeEach(async(() => {
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
