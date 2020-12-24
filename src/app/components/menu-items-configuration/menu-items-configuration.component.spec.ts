import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsConfigurationComponent } from './menu-items-configuration.component';

describe('MenuItemsConfigurationComponent', () => {
  let component: MenuItemsConfigurationComponent;
  let fixture: ComponentFixture<MenuItemsConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemsConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
