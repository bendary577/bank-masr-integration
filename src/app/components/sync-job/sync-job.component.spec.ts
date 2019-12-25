import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncJobComponent } from './sync-job.component';

describe('SyncJobsconfigComponent', () => {
  let component: SyncJobComponent;
  let fixture: ComponentFixture<SyncJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
