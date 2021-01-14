import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncExportedFilesComponent } from './sync-exported-files.component';

describe('SyncExportedFilesComponent', () => {
  let component: SyncExportedFilesComponent;
  let fixture: ComponentFixture<SyncExportedFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncExportedFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncExportedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
