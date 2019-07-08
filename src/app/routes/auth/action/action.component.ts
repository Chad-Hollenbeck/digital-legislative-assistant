import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {environment} from '../../../../environments/environment';
import {RoutesService} from '../../routes.service';
import {CustomValidators} from 'ng2-validation';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToasterService} from 'angular2-toaster';
import {QuerySnapshot} from '@angular/fire/firestore';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  mode: string;
  oobCode: string;
  apiKey: string;

  rs: RoutesService;
  loading = true;

  passwordForm: FormGroup;
  emailForm: FormGroup;


  constructor(private routeService: RoutesService, private router: Router, private authService: AuthService,
              private route: ActivatedRoute, fb: FormBuilder, private toaster: ToasterService) {

    this.rs = this.routeService;

    this.route.queryParamMap.subscribe(
      (value: ParamMap) => {
        this.mode = value.get('mode');
        this.oobCode = value.get('oobCode');
        this.apiKey = value.get('apiKey');
      }
    );

    const password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
    const certainPassword = new FormControl('', CustomValidators.equalTo(password));
    const confirmEmail = new FormControl('', Validators.required);

    this.passwordForm = fb.group({
      'password': password,
      'confirmPassword': certainPassword
    });

    this.emailForm = fb.group({
      'email': confirmEmail
    });
  }

  ngOnInit() {
    if (this.apiKey !== environment.firebase.apiKey) {
      this.toaster.popAsync('danger', '', 'You have provided an invalid action. Please try again');
      this.router.navigateByUrl(this.rs.byName('login'));
    }

    if (this.mode === 'resetPassword') {
      this.authService.verifyPasswordReset(this.oobCode).then(
        () => {
          this.loading = false;
        }
      );
    } else if (this.mode === 'verifyEmail') {
      this.loading = false;
    } else {
      this.loading = false;
      this.toaster.popAsync('danger', '', 'Your action code has expired. Please attempt to reset your password again');
      this.router.navigateByUrl(this.routeService.ROUTES.forgotPassword);
    }
  }

  resetPassword($event) {
    $event.stopPropagation();
    $event.preventDefault();

    if (this.passwordForm.valid) {
      this.authService.commitPasswordRest(this.oobCode, this.passwordForm.get('password').value).then(
        () => {
          this.router.navigateByUrl(this.rs.byName('login'));
        }
      );
    }
  }

  confirmEmail() {
    this.authService.verifyEmailConfirmation(this.oobCode).then(() => {
      this.toaster.popAsync('success', '', 'A final confirmation email has been sent with instructions to set your password and log in.');
      this.authService.resetPassword(this.emailForm.controls['email'].value).then(
        () => {
          this.router.navigate([this.routeService.ROUTES.login]);
        }
      );
    });
  }

  finishRegistration($event) {
    $event.stopPropagation();
    $event.preventDefault();

    // Fetch User by Email Address
    this.authService.isValidUserEmail(this.emailForm.controls['email'].value).then(
      (userList: QuerySnapshot<any>) => {
        if (userList.size > 0) {
          this.confirmEmail();
        }
      }
    );
    // If Email not confirmed, verify email confirmation
    // - On success: send password reset email
  }


}
