import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CenterContainerComponent } from './components/center-container/center-container.component';
import { SimpleToolbarComponent } from './components/simple-toolbar/simple-toolbar.component';
import { TogglePageComponent } from './components/toggle-page/toggle-page.component';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MaterialModule } from '@material/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    CenterContainerComponent,
    SimpleToolbarComponent,
    TogglePageComponent,
    MasterLayoutComponent,
    ForgotPasswordComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
