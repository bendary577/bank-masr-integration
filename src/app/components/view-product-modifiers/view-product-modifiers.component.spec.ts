import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductModifiersComponent } from './view-product-modifiers.component';

describe('ViewProductModifiersComponent', () => {
  let component: ViewProductModifiersComponent;
  let fixture: ComponentFixture<ViewProductModifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductModifiersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductModifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
