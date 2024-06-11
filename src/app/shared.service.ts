// shared.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isAdminLoggedIn: boolean = false;

  constructor() { }

  loginAsAdmin() {
    this.isAdminLoggedIn = true;
  }

  logoutAsAdmin() {
    this.isAdminLoggedIn = false;
  }
  
}
export interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
}
