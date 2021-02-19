import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuppliersConfiguartionComponent } from './suppliers-configuartion.component';

describe('SuppliersConfiguartionComponent', () => {
  let component: SuppliersConfiguartionComponent;
  let fixture: ComponentFixture<SuppliersConfiguartionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliersConfiguartionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersConfiguartionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
