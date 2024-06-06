// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component'; // Importa el componente Home
import { ProductsComponent } from './components/products/products.component';
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  declarations: [
    //AppComponent,
    HomeComponent, // Asegúrate de declarar el componente Home aquí
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
