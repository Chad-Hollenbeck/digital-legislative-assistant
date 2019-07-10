import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {MeetingLocation} from '../../models/location.model';

@Injectable()
export class MeetingLocationsService {

  constructor(private afa: AngularFireAuth, private db: AngularFirestore) {
  }

  getMeetingLocations$() {
    return this.db.collection('locations/' + this.afa.auth.currentUser.uid + '/location').get();
  }

  getMeetingLocationById$(locationUID) {
    return this.db.collection('locations/' + this.afa.auth.currentUser.uid + '/location').doc(locationUID).valueChanges();
  }

  addMeetingLocation(location: MeetingLocation) {
    return this.db.collection('locations/' + this.afa.auth.currentUser.uid + '/location').add(this.convertToObj(location));
  }

  updateMeetingLocation(location: MeetingLocation) {
    return this.db.collection('locations/' + this.afa.auth.currentUser.uid + '/location')
      .doc(location.uid).update(this.convertToObj(location));
  }

  removeMeetingLocation(location: MeetingLocation) {
    return this.db.collection('locations/' + this.afa.auth.currentUser.uid + '/location')
      .doc(location.uid).delete();
  }

  private convertToObj(model: any) {
    return JSON.parse(JSON.stringify(model));
  }

}
