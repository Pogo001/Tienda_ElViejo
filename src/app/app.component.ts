import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Producto {
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    FormsModule, 
  ],
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

Copa América: La Pasión del Fútbol Sudamericano
La Copa América es el torneo de selecciones más antiguo del mundo, que enfrenta a los equipos nacionales de
América del Sur y, en ocasiones, a invitados de otras confederaciones. Este año, el torneo se está celebrando en
Argentina y Colombia, con partidos emocionantes que tienen lugar en estadios llenos de pasión y fervor
futbolístico.

Entre los equipos destacados de la Copa América de este año se encuentran Brasil, el actual campeón, Argentina,
Uruguay y Colombia. Estas selecciones han demostrado su calidad en el campo y están compitiendo para llevarse a
casa el prestigioso trofeo de la Copa América.

Eurocopa: La Emoción del Fútbol Europeo
La Eurocopa es el torneo de selecciones más importante de Europa, que reúne a los mejores equipos del continente
en una batalla por la supremacía futbolística. Este año, el torneo se está llevando a cabo en varios países
europeos, con partidos que se juegan en estadios icónicos de todo el continente.

Entre los equipos destacados de la Eurocopa de este año se encuentran Francia, Portugal, España, y Alemania.
Estas selecciones cuentan con jugadores de clase mundial y están ansiosas por levantar el trofeo de la Eurocopa
y coronarse como campeonas de Europa.

Emoción y Expectativa
Tanto la Copa América como la Eurocopa están llenas de emoción, drama y momentos memorables que hacen que los
corazones de los aficionados latan más rápido. Desde sorpresas inesperadas hasta goles espectaculares, estos
torneos nos recuerdan por qué el fútbol es conocido como "el deporte rey".

Los aficionados de todo el mundo están sintonizando para ver quién se coronará como campeón en la Copa América y
la Eurocopa de este año. Con talento, determinación y pasión en cada partido, estos torneos prometen ser
inolvidables para todos los aficionados al fútbol.

¡Prepárate para disfrutar de la emoción y la acción mientras los mejores equipos del mundo compiten por la
gloria en la Copa América y la Eurocopa de 2024!`;



  mostrarMas: boolean = false;
  productos: Producto[] = [
    {
      nombre: 'Zapatillas Deportivas',
      descripcion: 'Descripción de las zapatillas deportivas...',
      imagen: 'assets/images.jpg',
      precio: 60000.00
    
    },
    {
      nombre: 'Camisetas de Entrenamiento',
      descripcion: 'Descripción de las camisetas de entrenamiento...',
      imagen: 'assets/camisetas.png',
      precio: 25000.00
    },
    {
      nombre: 'Pantalones Cortos',
      descripcion: 'Descripción de los pantalones cortos...',
      imagen: 'assets/pantalones.png',
      precio: 40000.00
    },
    {
      nombre: 'Camisillas Deportivas',
      descripcion: 'Descripción de los pantalones cortos...',
      imagen: 'assets/pantalones.png',
      precio: 40000.00
    },
    {
      nombre: 'Balon de Futbol',
      descripcion: 'Descripción de los pantalones cortos...',
      imagen: 'assets/pantalones.png',
      precio: 30000.00
    },
    {
      nombre: 'Balon de Basquetball',
      descripcion: 'Descripción de los pantalones cortos...',
      imagen: 'assets/pantalones.png',
      precio: 40000.00
    },
    {
      nombre: 'Guantes de Boxeo',
      descripcion: 'Descripción de los pantalones cortos...',
      imagen: 'assets/pantalones.png',
      precio: 50000.00
    },
    {
      nombre: 'Saco de Boxeo',
      descripcion: 'Descripción de los pantalones cortos...',
      imagen: 'assets/pantalones.png',
      precio: 140000.00
    },  {
      nombre: 'Vendas de Tela',
      descripcion: 'Descripción de los pantalones cortos...',
      imagen: 'assets/pantalones.png',
      precio: 40000.00
    }

  ];
  ngOnInit() {
    // Inicializa la variable mostrarMas como falsa al inicio
    this.mostrarMas = false;
  }
  mostrarContenidoAdicional() {
    this.mostrarMas = true;
  }
  ocultarContenidoAdicional() {
    this.mostrarMas = false;
    }
  productoSeleccionado: Producto | null = null;
  cantidad: number = 1;

  mostrarDetalles(producto: Producto): void {
    this.productoSeleccionado = producto;
    this.cantidad = 1; // Resetea la cantidad al seleccionar un nuevo producto
    
    // Desplaza la página a la sección de detalles del producto
    setTimeout(() => {
      const detalleProductoElement = document.getElementById('detalle-producto');
      if (detalleProductoElement) {
        detalleProductoElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Añadir un pequeño retraso para asegurar que el DOM esté actualizado
  }

  cerrarDetalles(): void {
    this.productoSeleccionado = null;
  }
}
