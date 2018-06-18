import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  hide = true;
  error: string;
  success: string;
  regForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
    this.regForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z-_0-9]+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}')
      ]),
      'pass': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmPass': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  getErrorMessage() {
    return this.regForm.controls['email'].hasError('required') ? 'You must enter a value' :
    this.regForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }
  getPassErrorMessage() {
    return this.regForm.controls['pass'].hasError('required') ? 'You must enter a value' :
    this.regForm.controls['pass'].hasError('minLength') ? 'Password min length 6 symbols' : '';
  }
  getConfirmPassErrorMessage() {
    return this.regForm.controls['confirmPass'].hasError('required') ? 'You must enter a value' :
    this.regForm.controls['confirmPass'].hasError('minLength') ? 'Password min length 6 symbols' : '';
  }

  onSubmit() {
    if (this.regForm.controls['pass'].value === this.regForm.controls['confirmPass'].value) {
      this.authService.doRegister(
        this.regForm.controls['email'].value, this.regForm.controls['pass'].value)
      .then(res => {
        console.log(res);
        this.error = '';
        this.success = 'Your account has been created';
        setTimeout(() => {
          this.router.navigate(['/']);
          this.regForm.reset();
        }, 2000);
      }, err => {
        console.log(err);
        this.regForm.reset();
        this.error = err.message;
        this.success = '';
      });
    } else {
      this.error = 'Passwords do not match';
    }
  }
  ngOnInit() {
  }
}
