import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpiActivitiesComponent } from './opi-activities.component';

describe('OpiActivitiesComponent', () => {
  let component: OpiActivitiesComponent;
  let fixture: ComponentFixture<OpiActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpiActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpiActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
