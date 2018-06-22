import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, NativeDateModule, MAT_DATE_FORMATS, MatSelectModule,
         MatIconModule, MatButtonModule} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ToastrModule } from 'ngx-toastr';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { TruckViewComponent } from './components/dashboard/truck-view/truck-view.component';
import { LoginFormComponent } from './components/user-login/login-form.component';
import { RegisterFormComponent } from './components/user-login/register-form.component';
import { NewPackageComponent } from './components/dashboard/new-package/new-package.component';
import { NewDriverComponent } from './components/dashboard/new-driver/new-driver.component';
import { UnassignedComponent } from './components/dashboard/unassigned-view/unassigned.component';

import { environment } from '../environments/environment';

import { TruckService } from './services/truck.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';


const MY_DATE_FORMATS = {
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
    dateInput: 'input',
    monthYearLabel: {year: 'numeric', month: 'short'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
};
const MATERIAL_MODULES = [
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule
];
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UnassignedComponent,
    HeaderComponent,
    TruckViewComponent,
    LoginFormComponent,
    RegisterFormComponent,
    NewPackageComponent,
    NewDriverComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    [...MATERIAL_MODULES],
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    DragulaModule
  ],
  providers: [
    TruckService,
    AuthService,
    AuthGuard,
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
