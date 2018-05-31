import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { LoginFormComponent } from './components/blog/user-login/login-form.component';
import { RegisterFormComponent } from './components/blog/user-login/register-form.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
