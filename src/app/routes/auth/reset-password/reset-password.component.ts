import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {SettingsService} from '../../../core/settings/settings.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {RoutesService} from '../../routes.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  valForm: FormGroup;
  rs: RoutesService;

  constructor(private router: Router, private routeService: RoutesService, public settings: SettingsService, fb: FormBuilder, private auth: AuthService, private toast: ToasterService) {
    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])]
    });

    this.rs = this.routeService;
  }

  submitForm($ev) {
    $ev.preventDefault();
    if (this.valForm.valid) {
      this.auth.resetPassword(this.valForm.get('email').value).then(
        () => {
          this.toast.popAsync('success', '', 'Password reset email sent');
          this.router.navigateByUrl(this.rs.byName('login'));
        }
      );
    }
  }

  ngOnInit() {
  }

}
