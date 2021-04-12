import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppCompanyComponent } from './add-app-company.component';

describe('AddAppCompanyComponent', () => {
  let component: AddAppCompanyComponent;
  let fixture: ComponentFixture<AddAppCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
