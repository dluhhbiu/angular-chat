import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
} from '@angular/material';

import { SigninComponent, SignupComponent } from './pages';
import { LoginRoutes } from './login.routes';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutes,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: []
})

export class LoginModule {}
