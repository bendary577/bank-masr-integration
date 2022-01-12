import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostOfGoodsOhraConfigComponent } from './cost-of-goods-ohra-config.component';

describe('CostOfGoodsOhraConfigComponent', () => {
  let component: CostOfGoodsOhraConfigComponent;
  let fixture: ComponentFixture<CostOfGoodsOhraConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostOfGoodsOhraConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostOfGoodsOhraConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
