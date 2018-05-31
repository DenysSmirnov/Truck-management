import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  constructor(private authService: AuthService) { }

  // tryRegister(value){
  //   this.authService.doRegister(value)
  //   .then(res => {
  //     console.log(res);
  //     this.errorMessage = '';
  //     this.successMessage = 'Your account has been created';
  //   }, err => {
  //     console.log(err);
  //     this.errorMessage = err.message;
  //     this.successMessage = '';
  //   });
  // }

  ngOnInit() {
  }

}




// import { Component } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// @Component({
//     selector: 'app-register-form',
//     templateUrl: './register-form.component.html',
//     styleUrls: ['./register-form.component.scss']
// })
// export class RegisterFormComponent {

//     registerForm: FormGroup;

//     constructor(private fb: FormBuilder) {
//         this.registerForm = fb.group({
//             orangeFormName: ['', Validators.required],
//             orangeFormEmail: ['', [Validators.required, Validators.email]],
//             orangeFormPass: ['', [Validators.required, Validators.minLength(3)]]
//         });
//     }
// }
