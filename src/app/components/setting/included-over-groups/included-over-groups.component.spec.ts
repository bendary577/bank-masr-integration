import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IncludedOverGroupsComponent } from './included-over-groups.component';

describe('IncludedOverGroupsComponent', () => {
  let component: IncludedOverGroupsComponent;
  let fixture: ComponentFixture<IncludedOverGroupsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IncludedOverGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludedOverGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
