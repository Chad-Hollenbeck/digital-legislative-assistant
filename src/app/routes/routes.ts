import {LayoutComponent} from '../layout/layout.component';
import {AuthGuard} from './auth/auth.guard';

export const routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: 'welcome', loadChildren: './welcome/welcome.module#WelcomeModule', canActivate: [AuthGuard]},
      {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
      {path: 'users', loadChildren: './user/user.module#UserModule', canActivate: [AuthGuard]},
      {path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canActivate: [AuthGuard]}
    ]
  },

  // Not found
  {path: '**', redirectTo: 'welcome'}

];
