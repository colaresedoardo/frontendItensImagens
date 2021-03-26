import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { AuthGoogleComponent } from './auth-google/auth-google.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthGoogleComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule, 
    ReactiveFormsModule
  ],
  providers:[AuthService]
})
export class AuthModule {
  // Está exportando o módulo mais o serviços
  static forRoot():ModuleWithProviders<AuthModule>{
    return {
      ngModule: AuthModule,
      providers:[
        AuthInterceptor
      ]
    }
  }
 }
