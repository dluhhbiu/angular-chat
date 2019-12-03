import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SigninComponent, SignupComponent } from './pages';
import { LoginRoutes } from './login.routes';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutes,
    FormsModule,
  ],
  providers: []
})

export class LoginModule {}
