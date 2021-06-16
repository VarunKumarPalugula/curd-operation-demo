import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { todoList } from '../models/todo';
import { AddOrEditTodoComponent } from './add-or-edit-todo/add-or-edit-todo.component';
import { DeleteTodoComponent } from './delete-todo/delete-todo.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: any;
  displayColumns = ['id', 'userId', 'title', 'completed', 'modify'];

  loginUser = sessionStorage.getItem('loginUser');

  constructor(
    public dialog: MatDialog, private apiService: ApiService, private router: Router,
    private commonService: CommonService, private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getAllTodos();
  }

  getAllTodos() {
    this.apiService.apiGetRequest().subscribe(res => {
      this.dataSource = new MatTableDataSource<todoList>(res.body);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onAddOrUpdate(item?) {

    // free apis are not providing updated list in GET after EDIT,DELETE  

    // const route = item ? `/todo/edit/${item}` : '/todo/add';
    // this.router.navigate([route])
    this.addOrUpdate(item)

  }

  addOrUpdate(item) {
    const dialogRef = this.dialog.open(AddOrEditTodoComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: {
        item: item
      }
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        if (item) {
          this.dataSource.data = this.dataSource.data.map(res => res.id === resp.id ? resp : res);
        } else {
          this.dataSource.data.unshift(resp);
        }
        this.dataSource = new MatTableDataSource<todoList>(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  deleteItem(item) {
    const dialogRef = this.dialog.open(DeleteTodoComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: {
        item: item
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(res => res.id !== item.id);
        this.dataSource = new MatTableDataSource<todoList>(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

}
