import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { Router } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  valForm: FormGroup;
  // config toast
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    showCloseButton: true
  });
  constructor(public settings: SettingsService,
    public fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public toasterService: ToasterService
  ) {
    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])]
    });
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      this.authService.resetPassword(value.email)
      .then((user: any) => {
         this.toasterService.pop('success', 'Resetar Senha', 'As intruções para resetar senha foram enviadas para o seu email!');
         setTimeout(() => {
          this.router.navigate(['/pages/auth/login']);
         }, 2000);
      })
      .catch((error: any) => {
        this.toasterService.pop('error', 'Error', 'Por favor! Verifique o email inserido.');
      });
    }
  }

  ngOnInit() {
  }

}
