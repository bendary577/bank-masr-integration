import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalabatOrdersComponent } from './talabat-orders.component';

describe('TalabatOrdersComponent', () => {
  let component: TalabatOrdersComponent;
  let fixture: ComponentFixture<TalabatOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalabatOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalabatOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
