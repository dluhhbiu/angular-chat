import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent, SignupComponent } from './pages';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent, children: [
      { path: '', redirectTo: '/signin', pathMatch: 'full' },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoginRoutes {}
