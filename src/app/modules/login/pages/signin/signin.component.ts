import { Component, OnInit } from '@angular/core';

import { AuthService } from '@shared/services';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  isAuthenticated = this.authService.isAuthenticated;
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.email = 'a1@gmail.com';
    this.password = 'pwd111';
  }

  login(): void {
    const data = {
      email: this.email,
      password: this.password
    };
    this.authService.login(data).subscribe();
  }
}
