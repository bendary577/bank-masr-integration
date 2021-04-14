import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAppGroupComponent } from './delete-app-group.component';

describe('DeleteAppGroupComponent', () => {
  let component: DeleteAppGroupComponent;
  let fixture: ComponentFixture<DeleteAppGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAppGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAppGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
