import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueByAgentComponent } from './revenue-by-agent.component';

describe('RevenueByAgentComponent', () => {
  let component: RevenueByAgentComponent;
  let fixture: ComponentFixture<RevenueByAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueByAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueByAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
