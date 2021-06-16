import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { ApiService } from '../../services/api.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-or-edit-todo',
  templateUrl: './add-or-edit-todo.component.html',
  styleUrls: ['./add-or-edit-todo.component.scss']
})
export class AddOrEditTodoComponent implements OnInit {


  addOrUpdateForm: FormGroup;
  todoId: number;

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<AddOrEditTodoComponent>
  ) {
    this.route.params.subscribe(res => {
      // this.todoId = res.id;
      // this.todoListById(res.id);
    });
  }


  ngOnInit() {

    this.addOrUpdateForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      title: ['', Validators.required],
      id: [''],
      completed: [false, Validators.required]
    });
    if (this.data.item) {
      this.addOrUpdateForm.patchValue(this.data.item);
    }

    // this.todoListById(this.data.id);
  }

  todoListById(id) {
    this.apiService.apiGetRequest(id).subscribe(res => {
      this.spinner.hide();
      this.commonService.openSnackBar(res.message)
      this.addOrUpdateForm.patchValue(res.body);
    })
  }

  get input(): any {
    return this.addOrUpdateForm.controls;
  }

  onSubmit(): boolean {
    this.submitted = true;
    if (this.addOrUpdateForm.invalid) {
      return;
    }
    if (this.data && this.data.item) {
      this.apiService.apiPutRequest(this.addOrUpdateForm.get('id').value, this.addOrUpdateForm.value).subscribe(res => {
        // this.router.navigateByUrl('/todo');
        this.spinner.hide();
        this.commonService.openSnackBar(res.msage)
        this.dialogRef.close(res.body);

      })
    } else {
      this.apiService.apiPostRequest(this.addOrUpdateForm.value).subscribe(res => {
        this.spinner.hide();
        this.commonService.openSnackBar(res.message)
        // this.router.navigateByUrl('/todo');
        this.dialogRef.close(res.body);

      })
    }
  }


}