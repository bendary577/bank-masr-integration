import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimphonyCheckComponent } from './simphony-check.component';

describe('SimphonyCheckComponent', () => {
  let component: SimphonyCheckComponent;
  let fixture: ComponentFixture<SimphonyCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimphonyCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimphonyCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
