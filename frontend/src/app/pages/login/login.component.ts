import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../api/auth.service';

/**
 * Componente para el inicio de sesión del usuario.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  email: string = ''; // Correo electrónico del usuario
  password: string = ''; // Contraseña del usuario

  /**
   * Constructor del componente que inyecta el servicio de autenticación y el router.
   * @param authService Servicio de autenticación para manejar el login.
   * @param router Router de Angular para la navegación.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Método para iniciar sesión.
   * Intenta autenticar al usuario y redirige al dashboard en caso de éxito.
   */
  async login() {
    try {
      const response = await this.authService.login({ email: this.email, password: this.password });
      console.log('Login exitoso', response);
      this.router.navigate(['/dashboard']); // Navega al dashboard
    } catch (error) {
      console.error('Error al iniciar sesión', error); // Manejo de errores
    }
  }
}
