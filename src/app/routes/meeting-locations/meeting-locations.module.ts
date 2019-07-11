import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MeetingLocationsListComponent} from './meeting-locations-list/meeting-locations-list.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {MeetingLocationsService} from './meeting-locations.service';
import {FormsModule} from '@angular/forms';
import {MeetingLocationEditComponent} from './meeting-location-edit/meeting-location-edit.component';

const routes: Routes = [
  {path: '', component: MeetingLocationsListComponent},
  {path: ':uid', component: MeetingLocationEditComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    FormsModule
  ],
  declarations: [MeetingLocationsListComponent, MeetingLocationEditComponent],
  providers: [
    MeetingLocationsService
  ],
  exports: [
    RouterModule
  ]
})
export class MeetingLocationsModule {
}
