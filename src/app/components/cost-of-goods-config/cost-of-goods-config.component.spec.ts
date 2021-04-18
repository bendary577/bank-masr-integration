import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostOfGoodsConfigComponent } from './cost-of-goods-config.component';

describe('CostOfGoodsConfigComponent', () => {
  let component: CostOfGoodsConfigComponent;
  let fixture: ComponentFixture<CostOfGoodsConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostOfGoodsConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostOfGoodsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
