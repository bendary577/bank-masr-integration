import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierMappingComponent } from './supllier-mapping.component';

describe('SupllierMappingComponent', () => {
  let component: SupplierMappingComponent;
  let fixture: ComponentFixture<SupplierMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
