import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { AuthService, UsersService } from '@shared/services';
import { AuthGuard } from '@shared/guards';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        }
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    UsersService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
