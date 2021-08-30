import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosMachineMappingComponent } from './pos-machine-mapping.component';

describe('PosMachineMappingComponent', () => {
  let component: PosMachineMappingComponent;
  let fixture: ComponentFixture<PosMachineMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosMachineMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosMachineMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
