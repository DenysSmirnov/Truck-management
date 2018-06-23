import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  hide = true;
  error: string;
  loginForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z-_0-9]+@[a-zA-Z_]+?\\..+')
      ]),
      pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  getEmailErrorMessage() {
    return this.loginForm.controls.email.hasError('required') ? 'You must enter a value' :
    this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }
  getPassErrorMessage() {
    return this.loginForm.controls.pass.hasError('required') ? 'You must enter a value' :
    this.loginForm.controls.pass.hasError('minLength') ? 'Password min length 6 symbols' : '';
  }
  signInWithEmail() {
    this.authService.signInRegular(
      this.loginForm.controls.email.value, this.loginForm.controls.pass.value)
      .then(_res => {
        this.error = '';
        this.router.navigateByUrl('/');
        this.loginForm.reset();
      })
      .catch(err => {
        this.error = err.message;
        // this.loginForm.reset();
      });
  }
  signInWithGithub() {
    this.authService.signInWithGithub()
      .then(_res => {
        // this.router.navigateByUrl('/');
        window.location.replace('/');
      })
      .catch(err => this.error = err.message);
  }
  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then(_res => {
        // this.router.navigateByUrl('/');
        window.location.replace('/');
      })
      .catch(err => this.error = err.message);
  }
}
