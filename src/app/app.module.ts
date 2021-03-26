import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule, 
    // FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
    MaterialFileInputModule,
    // HttpClientModule, 
    NgbModule,
    AuthModule.forRoot(),
    // DashboardModule,
    
  ],
  providers:[
    // diz ao angula que será usado um interceptado que está dentro do módulo
    //auth.
    // Pode ter vários interceptors e tem uma ordem
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true, deps:[AuthService, Router]}
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
