import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TeamsEditComponent } from './teams-edit/teams-edit.component';

const routes = [
  { path: '', component: TeamsListComponent },
  { path: ':uid', component: TeamsListComponent },
];

@NgModule({
  declarations: [TeamsListComponent, TeamsEditComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class TeamsModule {
}
