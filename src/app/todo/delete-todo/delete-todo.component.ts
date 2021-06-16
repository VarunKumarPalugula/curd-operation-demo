import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../services/common.service';
import { ApiService } from '../../services/api.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.scss']
})
export class DeleteTodoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<DeleteTodoComponent>) { }

  ngOnInit() {
  }

  deleteItem() {
    this.apiService.apiDeleteRequest(this.data.item.id).subscribe(res => {
      this.spinner.hide();
      this.commonService.openSnackBar(res.mess)
      this.dialogRef.close(true);
    })
  }
}