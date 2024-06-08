import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
}

interface ProductoCarrito {
  producto: Producto;
  cantidad: number;
  subtotal: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class AppComponent implements OnInit {

  textoParcial: string = `Copa América y Eurocopa: Dos Grandes Torneos de Fútbol en 2024
  Este año, los amantes del fútbol están siendo tratados con dos emocionantes torneos continentales: la Copa
  América en Sudamérica y la Eurocopa en Europa. Ambos eventos son puntos culminantes en el calendario
  futbolístico, atrayendo a aficionados de todo el mundo para presenciar la emoción y la competencia en el campo.`;

  textoCompleto: string = `Copa América y Eurocopa: Dos Grandes Torneos de Fútbol en 2024
  Este año, los amantes del fútbol están siendo tratados con dos emocionantes torneos continentales: la Copa
  América en Sudamérica y la Eurocopa en Europa. Ambos eventos son puntos culminantes en el calendario
  futbolístico, atrayendo a aficionados de todo el mundo para presenciar la emoción y la competencia en el campo.

  ... (contenido adicional aquí) ...`;

  mostrarMas: boolean = false;
  carrito: ProductoCarrito[] = [];
  mensajeCarrito: string | null = null;
  productoAgregado: Producto | null = null;
  mostrarCarrito: boolean = false;
  productos: Producto[] = [
    { nombre: 'Zapatillas Deportivas', descripcion: 'Descripción de las zapatillas deportivas...', precio: 60000.00 },
    { nombre: 'Camisetas de Entrenamiento', descripcion: 'Descripción de las camisetas de entrenamiento...', precio: 25000.00 },
    { nombre: 'Pantalones Cortos', descripcion: 'Descripción de los pantalones cortos...', precio: 40000.00 },
    { nombre: 'Camisillas Deportivas', descripcion: 'Descripción de los pantalones cortos...', precio: 40000.00 },
    { nombre: 'Balon de Futbol', descripcion: 'Descripción de los pantalones cortos...',  precio: 30000.00 },
    { nombre: 'Balon de Basquetball', descripcion: 'Descripción de los pantalones cortos...', precio: 40000.00 },
    { nombre: 'Guantes de Boxeo', descripcion: 'Descripción de los pantalones cortos...',  precio: 50000.00 },
    { nombre: 'Saco de Boxeo', descripcion: 'Descripción de los pantalones cortos...',  precio: 140000.00 },
    { nombre: 'Vendas de Tela', descripcion: 'Descripción de los pantalones cortos...', precio: 40000.00 }
  ];

  productoSeleccionado: Producto | null = null;
  cantidad: number = 1;

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.mostrarMas = false;
  }

  mostrarContenidoAdicional(): void {
    this.mostrarMas = true;
  }

  ocultarContenidoAdicional(): void {
    this.mostrarMas = false;
  }

  calcularPrecioTotal(): number {
    return this.carrito.reduce((total, item) => total + item.subtotal, 0);
  }

  mostrarDetalles(producto: Producto): void {
    this.productoSeleccionado = producto;
    this.cantidad = 1;
    this.mensajeCarrito = null;
    setTimeout(() => {
      const detalleProductoElement = document.getElementById('detalle-producto');
      if (detalleProductoElement) {
        detalleProductoElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  cerrarDetalles(): void {
    this.productoSeleccionado = null;
  }

  agregarAlCarrito(producto: Producto): void {
    const itemExistente = this.carrito.find(item => item.producto.nombre === producto.nombre);
    if (itemExistente) {
      itemExistente.cantidad += this.cantidad;
      itemExistente.subtotal = itemExistente.cantidad * producto.precio;
    } else {
      this.carrito.push({
        producto: producto,
        cantidad: this.cantidad,
        subtotal: this.cantidad * producto.precio
      });
    }
    this.cantidad = 1;
    this.router.navigate([], { fragment: 'carrito' });
  }
  // Nueva función para realizar la compra
  realizarCompra(): void {
    if (this.carrito.length > 0) {
      this.http.post<any>('http://localhost:3000/api/compra', { items: this.carrito })
        .subscribe(
          (response) => {
            console.log('Compra realizada con éxito:', response);
            window.alert('Compra realizada con éxito!');
            this.carrito = []; // Vaciar el carrito después de la compra
          },
          (error) => {
            console.error('Error al realizar la compra:', error);
            window.alert('Error al realizar la compra.');
          }
        );
    }
  }


  eliminarDelCarrito(item: ProductoCarrito): void {
    const index = this.carrito.indexOf(item);
    if (index !== -1) {
      this.carrito.splice(index, 1);
    }
  }

  toggleMostrarCarrito(): void {
    this.mostrarCarrito = !this.mostrarCarrito;
  }


}
