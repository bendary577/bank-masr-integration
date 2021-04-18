import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostOfGoodsComponent } from './cost-of-goods.component';

describe('CostOfGoodsComponent', () => {
  let component: CostOfGoodsComponent;
  let fixture: ComponentFixture<CostOfGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostOfGoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostOfGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
