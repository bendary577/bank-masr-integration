import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordMailComponent } from './forget-password-mail.component';

describe('ForgetPasswordMailComponent', () => {
  let component: ForgetPasswordMailComponent;
  let fixture: ComponentFixture<ForgetPasswordMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPasswordMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
