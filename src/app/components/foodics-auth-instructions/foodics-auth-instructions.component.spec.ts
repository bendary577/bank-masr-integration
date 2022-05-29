import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodicsAuthInstructionsComponent } from './foodics-auth-instructions.component';

describe('FoodicsAuthInstructionsComponent', () => {
  let component: FoodicsAuthInstructionsComponent;
  let fixture: ComponentFixture<FoodicsAuthInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodicsAuthInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodicsAuthInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
