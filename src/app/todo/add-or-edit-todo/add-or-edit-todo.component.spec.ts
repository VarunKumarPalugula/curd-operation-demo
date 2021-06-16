import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditTodoComponent } from './add-or-edit-todo.component';

describe('AddOrEditTodoComponent', () => {
  let component: AddOrEditTodoComponent;
  let fixture: ComponentFixture<AddOrEditTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
