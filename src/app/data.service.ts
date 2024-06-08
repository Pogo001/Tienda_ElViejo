import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  obtenerProductos() {
    return this.http.get<any[]>('http://localhost:3000/api/productos');
  }

  agregarProductoAlCarrito(item: any) {
    return this.http.post('http://localhost:3000/api/carrito', item);
  }

}
