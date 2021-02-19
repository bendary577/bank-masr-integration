import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportedFileConfigurationComponent } from './exported-file-configuration.component';

describe('ExportedFileConfigurationComponent', () => {
  let component: ExportedFileConfigurationComponent;
  let fixture: ComponentFixture<ExportedFileConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportedFileConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportedFileConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
