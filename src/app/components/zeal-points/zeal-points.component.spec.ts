import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZealPointsComponent } from './zeal-points.component';

describe('ZealPointsComponent', () => {
  let component: ZealPointsComponent;
  let fixture: ComponentFixture<ZealPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZealPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZealPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
