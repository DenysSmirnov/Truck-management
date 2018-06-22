import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { LoginFormComponent } from './components/user-login/login-form.component';
import { RegisterFormComponent } from './components/user-login/register-form.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: BlogComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
