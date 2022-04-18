import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUndoWalletActionComponent } from './confirm-undo-wallet-action.component';

describe('ConfirmUndoWalletActionComponent', () => {
  let component: ConfirmUndoWalletActionComponent;
  let fixture: ComponentFixture<ConfirmUndoWalletActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmUndoWalletActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmUndoWalletActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
