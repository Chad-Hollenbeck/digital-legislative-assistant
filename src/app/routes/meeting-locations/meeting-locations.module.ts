import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingLocationsListComponent } from './meeting-locations-list/meeting-locations-list.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {MeetingLocationsService} from './meeting-locations.service';

const routes: Routes = [
  {path: '', component: MeetingLocationsListComponent},
];
@NgModule({
  declarations: [MeetingLocationsListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports: [
    MeetingLocationsService
  ]
})
export class MeetingLocationsModule { }
