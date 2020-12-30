import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderConfigComponent } from './create-order-config.component';

describe('CreateOrderConfigComponent', () => {
  let component: CreateOrderConfigComponent;
  let fixture: ComponentFixture<CreateOrderConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrderConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrderConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
