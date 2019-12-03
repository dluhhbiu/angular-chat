import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListOfChatsComponent } from './pages';

const routes: Routes = [
  { path: '', component: ListOfChatsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ChatsRoutes {}
