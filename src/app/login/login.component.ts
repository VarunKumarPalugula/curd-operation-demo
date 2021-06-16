import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userLogin } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get input(): any {
    return this.loginForm.controls;
  }


  onSubmit(): boolean {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    sessionStorage.setItem('loginUser', this.loginForm.get('username').value)
    this.router.navigateByUrl('/todo');
  }
}
