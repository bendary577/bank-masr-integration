import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalabatMappingComponent } from './talabat-mapping.component';

describe('TalabatMappingComponent', () => {
  let component: TalabatMappingComponent;
  let fixture: ComponentFixture<TalabatMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalabatMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalabatMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
