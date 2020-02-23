import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalsInforConfigurationsComponent } from './journals-infor-configurations.component';

describe('JournalsInforConfigurationsComponent', () => {
  let component: JournalsInforConfigurationsComponent;
  let fixture: ComponentFixture<JournalsInforConfigurationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalsInforConfigurationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalsInforConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
