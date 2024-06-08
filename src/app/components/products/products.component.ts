import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productos = [
    { id: 1, nombre: 'Producto 1', descripcion: 'Descripción 1', imagen: 'producto1.jpg' },
    { id: 2, nombre: 'Producto 2', descripcion: 'Descripción 2', imagen: 'producto2.jpg' }
    // Agrega más productos según sea necesario
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  mostrarDetalles(producto: any): void {
    this.router.navigate(['/products', producto.id]);
  }
}
