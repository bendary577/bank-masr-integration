import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedProductionComponent } from './booked-production.component';

describe('BookedProductionComponent', () => {
  let component: BookedProductionComponent;
  let fixture: ComponentFixture<BookedProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
