import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOfChatsComponent } from './pages';
import { ChatsRoutes } from './chats.routes';

@NgModule({
  declarations: [
    ListOfChatsComponent,
  ],
  imports: [
    CommonModule,
    ChatsRoutes,
  ]
})
export class ChatsModule { }
