import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorRedirectPageComponent } from './aggregator-redirect-page.component';

describe('AggregatorRedirectPageComponent', () => {
  let component: AggregatorRedirectPageComponent;
  let fixture: ComponentFixture<AggregatorRedirectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatorRedirectPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorRedirectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
