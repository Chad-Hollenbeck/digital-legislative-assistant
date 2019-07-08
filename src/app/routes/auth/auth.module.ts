import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LogoutComponent} from './logout/logout.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ActionComponent} from './action/action.component';
import {UserService} from '../user/user.service';
import {RegistrationComponent} from './registration/registration.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'action', component: ActionComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule
  ],
  declarations: [LoginComponent, LogoutComponent, ResetPasswordComponent, ActionComponent, RegistrationComponent],
  exports: [
    RouterModule
  ],
  providers: [UserService] // Auth Service is injected at app.module for Auth Guard
})
export class AuthModule {
}
