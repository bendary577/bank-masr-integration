import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestCardsComponent } from './gest-cards.component';

describe('GestCardsComponent', () => {
  let component: GestCardsComponent;
  let fixture: ComponentFixture<GestCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
