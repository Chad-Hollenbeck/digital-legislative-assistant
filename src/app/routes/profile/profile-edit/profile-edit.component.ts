import { Component, OnInit } from '@angular/core';
import {UserProfile} from '../../../models/user-profile.model';
import {UserService} from '../../user/user.service';
import {AuthService} from '../../auth/auth.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  profile: UserProfile;
  profileFormGroup: FormGroup;
  loading = true;
  submitting = false;

  constructor(public toaster: ToasterService, formBuilder: FormBuilder, public userService: UserService, public authService: AuthService) {
    this.profileFormGroup = formBuilder.group({
      displayName: [null, Validators.required],
      title: [null, Validators.required]
    });

    this.profile = new UserProfile();
  }

  ngOnInit() {
    this.profileSettingInit();
  }

  saveProfile($ev) {
    $ev.preventDefault();

    // Check form validity
    if (this.profileFormGroup.errors == null && !this.submitting) {
      this.submitting = true;
      this.mapFormToUserProfile();
      this.userService.updateUser(this.profile).then(
        () => {
          this.toaster.popAsync('success', '', 'Profile updated');
        }
      );
    }
  }

  private mapFormToUserProfile() {
    this.profile.displayName = this.profileFormGroup.controls['displayName'].value;
    this.profile.title = this.profileFormGroup.controls['title'].value;
  }

  private mapUserProfileToForm(profileData) {
    this.profileFormGroup.controls['displayName'].setValue(profileData.displayName);
    this.profileFormGroup.controls['title'].setValue(profileData.title);
    this.profile.uid = profileData.uid;
    this.profile.displayName = profileData.displayName;
    this.profile.title = profileData.title;
  }

  private profileSettingInit() {
    this.userService.getUserProfile$().subscribe(
      (profileData) => {
        if (!!profileData) {
          this.mapUserProfileToForm(profileData);
          this.loading = false;
        } else {
          //fetch auth user and populate the UID
          this.authService.getUserAccount$().subscribe(
            (acc) => {
              this.profile.uid = acc.uid;
              this.loading = false;
            }
          );
        }
      }
    );
  }


}
