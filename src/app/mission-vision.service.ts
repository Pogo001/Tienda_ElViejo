// mission-vision.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MissionVisionService {
  mision: string = 'Nuestra misión es proveer productos deportivos de la más alta calidad para apoyar el rendimiento y bienestar de nuestros clientes.';
  vision: string = 'Nuestra visión es ser líderes en el mercado deportivo, reconocidos por la excelencia en nuestros productos y servicios.';

  actualizarMisionYVision(nuevaMision: string, nuevaVision: string): void {
    this.mision = nuevaMision;
    this.vision = nuevaVision;
  }
}
