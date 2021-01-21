import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZealPointsConfigComponent } from './zeal-points-config.component';

describe('ZealPointsConfigComponent', () => {
  let component: ZealPointsConfigComponent;
  let fixture: ComponentFixture<ZealPointsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZealPointsConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZealPointsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
