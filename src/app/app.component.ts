import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from './shared.service';
import { MissionVisionService } from './mission-vision.service';




interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;

}

interface CarritoItem {
  producto: Producto;
  cantidad: number;
  subtotal: number;
}
interface MostrarMasState {
  post1: boolean;
  post2: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})

@Injectable({
  providedIn: 'root'
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

 De la mano de Lionel Andres Messi Cuccitini, Argentina defendera el titulo de campeon, el mejor jugador de la historia del planeta futbol tendra que enfretarse a selecciones conmebol que han estado adquiriendo poder para competir. ¡Nos Espera Un Torneo Maravilloso!.
 Por otra parte, la eurocopa estara llena de sorpresas, con la recargada Inglaterra que de la mano de Jude Bellingham, que se enfrentara con la Francia de la tortuga Kylian Mbappe y Ousmane Dembele, el mayor enemigo del barcelonismo`;

  textoParcial1: string = `Este año, las finales de la NBA prometen ser un enfrentamiento épico entre dos potencias del baloncesto: los Boston Celtics y los Dallas Mavericks. Liderados por el fenomenal Luka Doncic, los Mavericks llegan a las finales con una mezcla de juventud y experiencia, listos para demostrar su valía en el escenario más grande. Doncic, conocido por su visión de juego, habilidades de anotación y liderazgo en la cancha, será una pieza clave en las aspiraciones de Dallas para levantar el trofeo.`;

  textoCompleto1: string = `Este año, las finales de la NBA prometen ser un enfrentamiento épico entre dos potencias del baloncesto: los Boston Celtics y los Dallas Mavericks. Liderados por el fenomenal Luka Doncic, los Mavericks llegan a las finales con una mezcla de juventud y experiencia, listos para demostrar su valía en el escenario más grande. Doncic, conocido por su visión de juego, habilidades de anotación y liderazgo en la cancha, será una pieza clave en las aspiraciones de Dallas para levantar el trofeo.

Por otro lado, los Boston Celtics, un equipo con una rica historia en la NBA, están de regreso en las finales con el talentoso Jayson Tatum a la cabeza. Tatum, con su versatilidad, capacidad de anotación y defensa implacable, ha llevado a los Celtics a través de una temporada desafiante hasta el umbral de la gloria. Su determinación y habilidades serán esenciales para que Boston pueda añadir otro campeonato a su ilustre legado.

Ambos equipos han demostrado una resistencia y habilidad impresionantes a lo largo de los playoffs, y ahora se enfrentan en una serie que seguramente estará llena de intensidad, emoción y momentos inolvidables. Con Doncic y Tatum liderando a sus respectivos equipos, estas finales serán una batalla titánica entre dos de los mejores jóvenes talentos de la liga. ¡Prepárense para disfrutar de un baloncesto de alto nivel mientras se define quién se coronará como el nuevo campeón de la NBA!`;


mostrarMas: MostrarMasState = {
  post1: false,
  post2: false
};
  carrito: CarritoItem[] = [];
  mensajeCarrito: string | null = null;
  productoAgregado: Producto | null = null;
  mostrarCarrito: boolean = false;
  mision: string | null = null;
  vision: string | null = null;
  currentUser: any = null;
  isEditing: boolean = false;

  productos: Producto[] = [
    { nombre: 'Zapatillas Deportivas', descripcion: 'Zapatos comodos para hacer deporte. Se encuentran disponibles actualmente', precio: 60000.00, },
    { nombre: 'Camisetas de Entrenamiento', descripcion: 'Camisetas deportivas para hacer gimnasio y todo tipo de deportes', precio: 25000.00, },
    { nombre: 'Pantalones Cortos', descripcion: 'Pantalonetas deportivas neutras para combinar con cualquier prenda de vestir. Ideal para todo tipo de deportes', precio: 40000.00,  },
    { nombre: 'Camisillas Deportivas', descripcion: 'Camisilla especial para deportes de contacto y rutinas de gimnasio', precio: 40000.00,  },
    { nombre: 'Balon de Futbol', descripcion: 'Esfera numero 5 ideal para compromisos futbolisticos', precio: 30000.00,  },
    { nombre: 'Balon de Basquetball', descripcion: 'Balon wilson firmado por don stephen curry', precio: 40000.00, },
    { nombre: 'Guantes de Boxeo', descripcion: 'Guantes para practicar el deporte de Myke Tayson y Canelo Alvarez', precio: 50000.00,  },
    { nombre: 'Saco de Boxeo', descripcion: 'Saco de boxeo para pegar la foto del real madrid y golpearlo hasta que se dañe', precio: 140000.00, },
    { nombre: 'Vendas de Tela', descripcion: 'Vendas generales para usar en el boxeo, o en caso tal en el futbol, sin sarpullido y facil de lavar', precio: 40000.00, }
  ];


  productoSeleccionado: Producto | null = null;
  cantidad: number = 1;

  constructor(private http: HttpClient,private router: Router, private dialog: MatDialog, private sharedService: SharedService,public missionVisionService: MissionVisionService) { }

  
  ngOnInit(): void {
    this.mostrarMas.post1 = false;
    this.mostrarMas.post2 = false;
    this.loadMissionVision();

  }


  mostrarContenidoAdicional(postId: keyof MostrarMasState): void {
    this.mostrarMas[postId] = true;
  }

  ocultarContenidoAdicional(postId: keyof MostrarMasState): void {
    this.mostrarMas[postId] = false;
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

  agregarAlCarrito(producto: any) {
    const item = this.carrito.find(i => i.producto.nombre === producto.nombre);
    if (item) {
      item.cantidad += this.cantidad;
      item.subtotal += producto.precio * this.cantidad;
    } else {
      this.carrito.push({
        producto,
        cantidad: this.cantidad,
        subtotal: producto.precio * this.cantidad
      });
    }
    this.cantidad = 1; // Reiniciar cantidad
  }
  eliminarDelCarrito(item: CarritoItem): void {
    const index = this.carrito.indexOf(item);
    if (index !== -1) {
      this.carrito.splice(index, 1);
    }
  }

  toggleMostrarCarrito(): void {
    this.mostrarCarrito = !this.mostrarCarrito;
  }

  openLoginPopup(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px', height: '400px' // Puedes ajustar el ancho de la ventana emergente según tus necesidades
      // Agrega otras configuraciones de la ventana emergente aquí si es necesario
    });

  }



  isAdminLoggedIn() {
    return this.sharedService.isAdminLoggedIn;
  }

  loadMissionVision(): void {
    this.missionVisionService.getMissionVision().subscribe(data => {
      this.mision = data.mision;
      this.vision = data.vision;
    });
  }

  
  toggleEditing(): void {
    if (this.isEditing) {
      const updatedMission = this.mision ?? '';
      const updatedVision = this.vision ?? '';

      this.missionVisionService.updateMissionVision(updatedMission, updatedVision).subscribe(
        response => {
          console.log('Misión y visión actualizadas:', response);
          this.loadMissionVision(); // Volver a cargar misión y visión después de actualizar
        },
        error => {
          console.error('Error al actualizar misión y visión:', error);
        }
      );
    }
    this.isEditing = !this.isEditing;
  }

  

  enviarCarritoAlBackend(): void {
    // Obtener la cantidad de productos en el carrito
    const cantidadProductos = this.carrito.length;
  
    // Verificar si hay productos en el carrito
    if (cantidadProductos > 0) {
      // Obtener solo los datos necesarios para enviar al backend
      const productosParaEnviar = this.carrito.map(item => ({
        nombre: item.producto.nombre,
        descripcion: item.producto.descripcion, // Asegúrate de incluir la descripción
        precio: item.producto.precio, // Asegúrate de incluir el precio
        cantidad: item.cantidad,
        subtotal: item.subtotal
      }));
      // Enviar datos al backend
      this.http.post<any>('http://localhost:3000/api/guardar-productos', productosParaEnviar)
        .subscribe(
          response => {
            console.log('Datos enviados al backend:', response);
            // Aquí puedes manejar la respuesta del backend si es necesario
            alert('Compra realizada correctamente')
          },
          error => {
            console.error('Error al enviar datos al backend:', error);
            // Aquí puedes manejar el error si la solicitud falla
            alert('Error al enviar datos al backend');
          }
        );
    } else {
      console.warn('No hay productos en el carrito para enviar al backend');
    }
  }
}
