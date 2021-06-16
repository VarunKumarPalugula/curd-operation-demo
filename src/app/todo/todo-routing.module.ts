import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrEditTodoComponent } from './add-or-edit-todo/add-or-edit-todo.component';

import { TodoComponent } from './todo.component';

const routes: Routes = [
  { path: '', component: TodoComponent },

  // free apis are not providing updated list in GET after EDIT,DELETE  

  // {
  //   path: 'add', component: AddOrEditTodoComponent,
  // },
  // {
  //   path: 'edit/:id', component: AddOrEditTodoComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
