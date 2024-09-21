import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../api/auth.service';

/**
 * Componente para el registro de nuevos usuarios.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  name: string = ''; // Nombre del usuario
  email: string = ''; // Correo electrónico del usuario
  password: string = ''; // Contraseña del usuario

  /**
   * Constructor del componente que inyecta el servicio de autenticación.
   * @param authService Servicio de autenticación para manejar el registro.
   */
  constructor(private authService: AuthService) {}

  /**
   * Método para registrar un nuevo usuario.
   * Crea un nuevo usuario y maneja la respuesta del servicio de autenticación.
   */
  register() {
    const newUser = { name: this.name, email: this.email, password: this.password };

    this.authService.register(newUser)
      .then(data => {
        console.log('Registro exitoso', data); // Registro exitoso
      })
      .catch(error => {
        console.error('Error en el registro', error); // Manejo de errores
      });
  }
}
