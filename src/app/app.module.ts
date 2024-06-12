// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'; 
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
@NgModule({
  declarations: [
    //AppComponent,
    //LoginComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Importa FormsModule aquí
   
    
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: []
})
export class AppModule { }
