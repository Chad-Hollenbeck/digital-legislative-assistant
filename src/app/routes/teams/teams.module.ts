import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamsListComponent} from './teams-list/teams-list.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

const routes = [
  {path: '', component: TeamsListComponent}
];

@NgModule({
  declarations: [TeamsListComponent],
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
