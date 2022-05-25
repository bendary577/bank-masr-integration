import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateFoodicsAccessTokenComponent } from './generate-foodics-access-token.component';

describe('GenerateFoodicsAccessTokenComponent', () => {
  let component: GenerateFoodicsAccessTokenComponent;
  let fixture: ComponentFixture<GenerateFoodicsAccessTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateFoodicsAccessTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateFoodicsAccessTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
