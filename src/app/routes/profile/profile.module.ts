import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', component: ProfileEditComponent},
];
@NgModule({
  declarations: [ProfileEditComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class ProfileModule { }
