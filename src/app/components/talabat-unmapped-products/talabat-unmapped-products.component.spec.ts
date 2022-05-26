import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalabatUnmappedProductsComponent } from './talabat-unmapped-products.component';

describe('TalabatUnmappedProductsComponent', () => {
  let component: TalabatUnmappedProductsComponent;
  let fixture: ComponentFixture<TalabatUnmappedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalabatUnmappedProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalabatUnmappedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
