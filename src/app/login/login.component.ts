import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router desde '@angular/router'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../shared.service';
import { MissionVisionService } from '../mission-vision.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  dialogRef: MatDialogRef<LoginComponent> | null = null;
  @Output() guardarMisionYVisionEvent = new EventEmitter<{ nuevaMision: string, nuevaVision: string }>();
  nuevaMision: string = '';
  nuevaVision: string = '';

  constructor(private router: Router,private dialog: MatDialog,private sharedService: SharedService,private missionVisionService: MissionVisionService) {} 

  login() {
    if (this.username === 'admin' && this.password === 'admin123') {
      window.alert('Inicio de sesión exitoso');
      // Redirige al usuario al componente AppComponent
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Nombre de usuario o contraseña incorrectos';
      window.alert("Error al iniciar sesión");
    }
    this.sharedService.loginAsAdmin();
  }
  isAdmin(): boolean {
    // Lógica para determinar si el usuario es administrador
    return this.username === 'admin';
  }

  

}
