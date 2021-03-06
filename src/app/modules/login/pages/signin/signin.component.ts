import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@shared/services';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent {
  formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.initForm();
  }

  // getter for easy access to form fields
  get formFields() {
    return this.formGroup.controls;
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.authService.login(this.formGroup.value).subscribe();
  }
}
