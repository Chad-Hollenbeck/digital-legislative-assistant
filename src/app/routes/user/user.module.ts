import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {FormsModule} from '@angular/forms';
import {UsersAllComponent} from './users-all/users-all.component';
import {UserService} from './user.service';
import {UserManageComponent} from './user-manage/user-manage.component';

const routes: Routes = [
  {path: '', component: UsersAllComponent},
  {path: ':uid', component: UserManageComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    FormsModule
  ],
  declarations: [UsersAllComponent, UserManageComponent],
  providers: [UserService],
  exports: [
    RouterModule
  ]
})
export class UserModule {
}
