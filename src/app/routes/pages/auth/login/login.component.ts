import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { Router } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  valForm: FormGroup;
  // config toast
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    showCloseButton: true
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    public settings: SettingsService,
    public fb: FormBuilder,
    public toasterService: ToasterService,
  ) {

    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'password': [null, Validators.required]
    });

  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      this.authService.signIn(value)
        .then((user: any) => {
          this.router.navigate(['/app']);
        })
        .catch((error: any) => {
          this.toasterService.pop('error', 'Error ao Logar', 'Email e/ou senha incorretos!');
        });
    }
  }

  ngOnInit() {

  }

}
