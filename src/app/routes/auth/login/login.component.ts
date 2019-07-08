import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {RoutesService} from '../../routes.service';
import {ToasterService} from 'angular2-toaster';
import {UserService} from '../../user/user.service';
import {SettingsService} from '../../../core/settings/settings.service';
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  valForm: FormGroup;
  loading = false;
  rs;

  authSub: Subscription;

  constructor(private routeService: RoutesService,
              private router: Router,
              private auth: AuthService,
              private builder: FormBuilder,
              private toaster: ToasterService,
              private userService: UserService,
              private settings: SettingsService) {
    this.valForm = builder.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'password': [null, Validators.required]
    });

    this.authSub = this.auth.getUserAccount$().subscribe(
      (data) => {
        if (data) {
          this.router.navigate([this.routeService.ROUTES.home]);
        }
      }
    );

    this.rs = this.routeService;
    this.settings = settings;
  }

  ngOnInit() {
  }

  login($ev) {
    $ev.preventDefault();
    this.loading = true;
    this.auth.login(this.valForm.controls['email'].value, this.valForm.controls['password'].value).then(
      (cred: UserCredential) => {
        this.userService.getUserProfile$().subscribe(
          (user) => {
            if (user != null) {
              this.userService.storeUserProfile(user);
              if (user.role === 'ADMIN') {
                this.router.navigate([this.routeService.ROUTES.users]);
              } else {
                this.router.navigate([this.routeService.ROUTES.home]);

              }
            } else {
              this.toaster.popAsync('danger', 'Error', 'Something went wrong loading your profile. Please try again.');
            }
          },
          (err) => {
            console.log(err);
          }, () => {
            this.loading = false;
          }
        );

      }, (err) => {
        this.toaster.popAsync('warning', '', err.message);
      }
    );
  }

}
