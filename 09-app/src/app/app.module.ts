import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import Amplify from 'aws-amplify';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ClientsComponent } from './clients/clients.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_PpyVOyFg5',
    userPoolWebClientId: '21av234b2pabsimjp25p6bkpod',
    IdentityPoolId: 'us-east-1:b34f936c-a6b1-4369-929b-8c9572a9516d',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
  API: {
    endpoints: [
      {
        name: 'api',
        endpoint: 'https://wj33urp139.execute-api.us-east-1.amazonaws.com/dev',
        region: 'us-east-1',
      },
    ],
  },
});

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ConfirmComponent,
    ClientsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
