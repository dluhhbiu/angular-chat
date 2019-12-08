import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@shared/guards';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'chats', pathMatch: 'full' },
      { path: 'chats', loadChildren: () => import('./modules/chats/chats.module').then(m => m.ChatsModule) }
    ]
  },
  { path: '', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutes {}
