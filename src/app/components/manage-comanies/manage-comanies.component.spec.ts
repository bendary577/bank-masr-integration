import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageComaniesComponent } from './manage-comanies.component';

describe('ManageComaniesComponent', () => {
  let component: ManageComaniesComponent;
  let fixture: ComponentFixture<ManageComaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageComaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageComaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
