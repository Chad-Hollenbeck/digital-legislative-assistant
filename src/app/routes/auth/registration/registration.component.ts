import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {RoutesService} from '../../routes.service';
import {CustomValidators} from 'ng2-validation';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToasterService} from 'angular2-toaster';
import {SettingsService} from '../../../core/settings/settings.service';
// @ts-ignore
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  rs: RoutesService;
  settings: SettingsService;
  loading = true;
  submitted = false;
  passwordForm: FormGroup;
  valForm: FormGroup;


  constructor(private routeService: RoutesService,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute,
              fb: FormBuilder,
              private toaster: ToasterService,
              private settingsService: SettingsService) {

    this.rs = this.routeService;
    this.settings = settingsService;

    const password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
    const certainPassword = new FormControl('', CustomValidators.equalTo(password));


    this.passwordForm = fb.group({
      'password': password,
      'confirmPassword': certainPassword
    });

    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'accountagreed': [null, Validators.required],
      'passwordGroup': this.passwordForm
    });
  }

  ngOnInit() {
    this.valForm.controls['email'].setValue(localStorage.getItem('registrationEmail'));
    this.loading = false;
  }

  completeRegistration($event) {
    $event.preventDefault();

    if (this.passwordForm.valid) {
      this.authService.registerUser(this.valForm.controls['email'].value, this.passwordForm.controls['password'].value).subscribe(
        (result: UserCredential) => {
          if (result != null){
            this.toaster.popAsync('success', '', 'A confirmation email has been sent to your inbox. Please confirm to login');
            this.router.navigateByUrl(this.routeService.ROUTES.logout);
          }
        }, (reason: any) => {
          console.log(reason);
        }
      );
    }
  }


}
