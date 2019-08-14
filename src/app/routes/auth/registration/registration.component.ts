import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { CustomValidators } from 'ng2-validation';
import { ROUTES } from '@features/routes.enum';
import { Router } from '@angular/router';
import { SettingsService } from '@core/settings/settings.service';
import { ToasterService } from 'angular2-toaster';


@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    settings: SettingsService;
    loading = true;
    submitted = false;
    passwordForm: FormGroup;
    valForm: FormGroup;


    constructor(private router: Router,
        private authService: AuthService,
        fb: FormBuilder,
        private toaster: ToasterService,
        private settingsService: SettingsService) {

        this.settings = this.settingsService;

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
        this.loading = false;
    }

    registerNewUser($event: any) {
        $event.preventDefault();

        if (this.passwordForm.valid) {
            this.authService.registerUser(this.valForm.controls['email'].value, this.passwordForm.controls['password'].value).subscribe(
                (result: firebase.auth.UserCredential) => {
                    if (result != null) {
                        this.toaster.popAsync('success', '', 'A confirmation email has been sent to your inbox. Please confirm to login');
                        this.router.navigateByUrl(ROUTES.logout);
                    }
                }, (reason: any) => {
                    console.log(reason);
                }
            );
        }
    }
}
