import { NgModule } from '@angular/core';
import { SharedImportModule } from '../shared-imports';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { AddOrEditTodoComponent } from './add-or-edit-todo/add-or-edit-todo.component';
import { DeleteTodoComponent } from './delete-todo/delete-todo.component';


@NgModule({
  declarations: [TodoComponent, AddOrEditTodoComponent, DeleteTodoComponent],
  imports: [
    TodoRoutingModule,
    SharedImportModule
  ],
  entryComponents:[]
})
export class TodoModule { }
