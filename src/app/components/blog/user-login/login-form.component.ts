import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
// import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
// import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  // hide = true;
  user = {
    email : new FormControl('', [Validators.required, Validators.email]),
    pass : new FormControl('', [Validators.required, Validators.minLength(6)])
  };

  constructor(private router: Router, private authService: AuthService) { }

  // onSubmit(loginForm: NgForm) {

  // }

  getErrorMessage() {
    return this.user.email.hasError('required') ? 'You must enter a value' :
        this.user.email.hasError('email') ? 'Not a valid email' : '';
  }
  getPassErrorMessage() {
    return this.user.pass.hasError('required') ? 'You must enter a value' :
        this.user.pass.hasError('minLength') ? 'Password min length 6 symbols' : '';
  }
  signInWithEmail() {
    // console.log('email: ', this.user.email.value, 'pass: ', this.user.pass.value);
    this.authService.signInRegular(this.user.email.value, this.user.pass.value)
      .then((res) => {
        console.log(res);
        this.user.email.reset();
        this.user.pass.reset();
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
        this.user.email.reset();
        this.user.pass.reset();
      });
  }

  ngOnInit() {
  }

}
