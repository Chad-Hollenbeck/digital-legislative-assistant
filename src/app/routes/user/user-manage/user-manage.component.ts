import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfile } from '@models/user-profile.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from '../user.service';
import { RoutesService } from '@features/routes.service';
import * as _ from 'lodash';
import { AuthService } from '@features/auth/auth.service';
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {
  user: UserProfile;
  userFG: FormGroup;
  roles: Array<any>;
  loading = true;
  submitting = false;

  @ViewChild('userModal') userModal;


  constructor(private toast: ToasterService,
    fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private rs: RoutesService,
    private auth: AuthService) {
    this.userFG = fb.group({
      displayName: [null, Validators.required],
      title: [null, Validators.required],
      email: [{ value: '', disabled: false }, null],
      address: [{ value: '', disabled: false }, null],
      confirmEmail: [{ value: '', disabled: false }, null]
    });

    this.roles = this.auth.getRoles();
    this.user = new UserProfile();
  }

  ngOnInit() {

    this.activeRoute.paramMap.subscribe(
      (value: ParamMap) => {
        if (value.keys.length > 0) {
          if (value.get('uid') !== 'new') {
            this.userFG.controls['email'].disable(); // Created users have to change their email manually w/ confirmation
            this.userService.getUser$(value.get('uid')).subscribe(
              (profile) => {
                this.user = profile as UserProfile;
                this.mapUserToForm();
                this.loading = false;
              }
            );
          } else {
            this.user = new UserProfile();
            this.userFG.controls['email'].setValidators(Validators.required);
            this.userFG.controls['confirmEmail'].setValidators(Validators.required);
            this.loading = false;
          }
        } else {
          this.toast.popAsync('warning', '', 'No User Provided to Edit');
          this.router.navigate([this.rs.byName('users')]);
        }
      }
    );
  }

  mapUserToForm() {
    this.userFG.controls['displayName'].setValue(this.user.displayName);
    this.userFG.controls['role'].setValue(this.user.role);
    this.userFG.controls['email'].setValue(this.user.email);
    this.userFG.controls['title'].setValue(this.user.title);
  }

  updateUserFromForm() {
    this.user.displayName = this.userFG.controls['displayName'].value;
    this.user.role = this.userFG.controls['role'].value;
    this.user.title = this.userFG.controls['title'].value;
  }

  markAllAsPristine() {
    _.each(this.userFG.controls, (control) => {
      control.markAsPristine();
    });
  }

  updateUser($ev) {
    $ev.preventDefault();

    this.submitting = true;

    if (!this.user.role) {
      this.toast.popAsync('warning', '', 'Please select a role for this user before saving');
      this.submitting = false;
      return;
    }

    this.updateUserFromForm();

    if (!this.user.uid) {
      // Register New User
      this.user.email = this.userFG.controls['email'].value;

      // Create New User Account
      this.auth.registerUser(this.user.email, null).subscribe(
        (data: UserCredential) => {
          this.user.uid = data.user.uid; // Assign UID and Save

          this.userService.updateUser(this.user).then(
            () => {
              this.toast.popAsync('success', '', 'User Profile created.');
              this.submitting = false;
              this.router.navigate([this.rs.ROUTES.editUser, this.user.uid]);
            },
            () => {
              this.submitting = false;
            }
          );
        },
        (err) => {
          this.toast.popAsync('warning', '', err.message);
          this.submitting = false;
        }
      );

    } else {
      // Update Existing User
      this.userService.updateUser(this.user).then(
        () => {
          this.markAllAsPristine();
          this.submitting = false;
          this.toast.popAsync('success', '', 'User Updated');
        }
      );
    }

  }

  disableUser() {
    // soft delete the user
    const usr = _.clone(this.user);
    usr.disabled = true;
    this.userService.updateUser(usr).then(
      () => {
        // cloudFX triggered which disables the user's auth account
        this.toast.popAsync('success', '', 'User Disabled');
        this.userModal.hide();
      }
    );
  }

  enableUser() {
    // soft enable the user
    const usr = _.clone(this.user);
    usr.disabled = false;
    this.userService.updateUser(usr).then(
      () => {
        // cloudFX triggered which disables the user's auth account
        this.toast.popAsync('success', '', 'User Enabled');
        this.userModal.hide();
      }
    );
  }
}
