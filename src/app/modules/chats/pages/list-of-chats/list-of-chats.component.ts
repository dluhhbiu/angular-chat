import { Component, OnInit } from '@angular/core';

import { AuthService } from '@shared/services';

@Component({
  templateUrl: './list-of-chats.component.html',
  styleUrls: ['./list-of-chats.component.scss']
})
export class ListOfChatsComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout();
  }
}
