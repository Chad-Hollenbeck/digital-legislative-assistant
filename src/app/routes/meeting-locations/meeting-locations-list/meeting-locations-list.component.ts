import {Component, OnInit} from '@angular/core';
import {MeetingLocationsService} from '../meeting-locations.service';
import {MeetingLocation} from '../../../models/location.model';
import {QuerySnapshot} from '@angular/fire/firestore';

@Component({
  selector: 'app-meeting-locations-list',
  templateUrl: './meeting-locations-list.component.html',
  styleUrls: ['./meeting-locations-list.component.scss']
})
export class MeetingLocationsListComponent implements OnInit {

  meetingLocations: Array<MeetingLocation>;
  loading = true;

  constructor(public locationService: MeetingLocationsService) {
  }

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.loading = true;
    this.locationService.getMeetingLocations$().subscribe(
      (querySnapshot: QuerySnapshot<MeetingLocation>) => {
        const locationList = querySnapshot.docs.map((val) => {
          return val.data() as MeetingLocation;
        });

        this.meetingLocations = _.sortBy(locationList, 'name');
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }
}
