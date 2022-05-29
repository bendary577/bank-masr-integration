import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsNeedsAttentionComponent } from './products-needs-attention.component';

describe('ProductsNeedsAttentionComponent', () => {
  let component: ProductsNeedsAttentionComponent;
  let fixture: ComponentFixture<ProductsNeedsAttentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsNeedsAttentionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsNeedsAttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
