import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpiTransactionsComponent } from './opi-transactions.component';

describe('OpiTransactionsComponent', () => {
  let component: OpiTransactionsComponent;
  let fixture: ComponentFixture<OpiTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpiTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpiTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
