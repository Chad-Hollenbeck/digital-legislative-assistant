import {Component, OnInit, ViewChild} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RoutesService} from '@features/routes.service';
import * as _ from 'lodash';
import {MeetingLocationsService} from '@features/meeting-locations/meeting-locations.service';
import {MeetingLocation} from '@models/location.model';

@Component({
  selector: 'app-meeting-location-edit',
  templateUrl: './meeting-location-edit.component.html',
  styleUrls: ['./meeting-location-edit.component.scss']
})
export class MeetingLocationEditComponent implements OnInit {

  locationFG: FormGroup;
  location: MeetingLocation;
  submitting = false;
  loading = true;
  @ViewChild('locationModal') locationModal;

  constructor(private toast: ToasterService,
              fb: FormBuilder,
              private activeRoute: ActivatedRoute,
              private locationService: MeetingLocationsService,
              private router: Router,
              private routeService: RoutesService) {
    this.locationFG = fb.group({
      name: [null, Validators.required],
      address: [null, Validators.required],
      roomDesignation: [{value: '', disabled: false}, null],
      notes: [{value: '', disabled: false}, null]
    });

    this.location = new MeetingLocation();
  }

  ngOnInit() {

    this.activeRoute.paramMap.subscribe(
      (value: ParamMap) => {
        if (value.keys.length > 0) {
          if (value.get('uid') !== 'new') {
            this.locationService.getMeetingLocationById$(value.get('uid')).subscribe(
              (locationData) => {
                this.location = locationData as MeetingLocation;
                this.mapLocationToForm();
                this.loading = false;
              }
            );
          } else {
            this.loading = false;
          }
        } else {
          this.toast.popAsync('warning', '', 'No Location Provided to Edit');
          this.router.navigate([this.routeService.ROUTES.meetingLocations]);
        }
      }
    );
  }

  mapLocationToForm() {
    this.locationFG.controls['name'].setValue(this.location.name);
    this.locationFG.controls['address'].setValue(this.location.address);
    this.locationFG.controls['roomDesignation'].setValue(this.location.roomDesignation);
    this.locationFG.controls['notes'].setValue(this.location.notes);
  }

  mapFormToLocation() {
    this.location.name = this.locationFG.controls['name'].value;
    this.location.address = this.locationFG.controls['address'].value;
    this.location.roomDesignation = this.locationFG.controls['roomDesignation'].value;
    this.location.notes = this.locationFG.controls['notes'].value;
  }

  markAllAsPristine() {
    _.each(this.locationFG.controls, (control) => {
      control.markAsPristine();
    });
  }

  updatelocation($ev) {
    $ev.preventDefault();

    this.submitting = true;
    this.mapFormToLocation();

    if (!this.location.uid) {
      // Add New location

      // Create New location Account
      this.locationService.addMeetingLocation(this.location).then(
        (docRef) => {
          this.location.uid = docRef.id;
          this.locationService.updateMeetingLocation(this.location).then(
            () => {
              this.router.navigateByUrl(this.routeService.ROUTES.meetingLocations);
              this.toast.popAsync('success', '', 'Location created.');
            }
          );
        },
        (err) => {
          this.toast.popAsync('warning', '', err.message);
          this.submitting = false;
        }
      );

    } else {
      // Update Existing location
      this.locationService.updateMeetingLocation(this.location).then(
        () => {
          this.markAllAsPristine();
          this.submitting = false;
          this.toast.popAsync('success', '', 'location Updated');
        }
      );
    }

  }

  disablelocation() {
    // delete the location
    this.locationService.removeMeetingLocation(this.location).then(
      () => {
        this.toast.popAsync('success', '', 'location Removed');
        this.locationModal.hide();
        this.router.navigateByUrl(this.routeService.ROUTES.meetingLocations);
      }
    );
  }

}
