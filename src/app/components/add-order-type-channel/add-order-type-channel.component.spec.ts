import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderTypeChannelComponent } from './add-order-type-channel.component';

describe('AddOrderTypeChannelComponent', () => {
  let component: AddOrderTypeChannelComponent;
  let fixture: ComponentFixture<AddOrderTypeChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrderTypeChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderTypeChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
