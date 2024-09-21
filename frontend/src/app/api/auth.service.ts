import { Injectable } from '@angular/core';
import axios from 'axios';

/**
 * Servicio para manejar la autenticación de usuarios.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  /**
   * Registra un nuevo usuario.
   * @param user - Datos del usuario a registrar.
   * @returns Promesa con la respuesta del servidor.
   */
  async register(user: any) {
    return axios.post(`${this.apiUrl}/register`, user)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al registrar usuario', error);
        throw error;
      });
  }

  /**
   * Inicia sesión de un usuario.
   * @param credentials - Credenciales del usuario.
   * @returns Promesa con la respuesta del servidor.
   */
  async login(credentials: any) {
    return axios.post(`${this.apiUrl}/login`, credentials)
      .then(response => {
        localStorage.setItem('authToken', response.data.token);
        return response.data;
      })
      .catch(error => {
        console.error('Error al iniciar sesión', error);
        throw error;
      });
  }

  /**
   * Cierra la sesión del usuario.
   * @returns Promesa con la respuesta del servidor.
   */
  async logout() {
    return axios.post(`${this.apiUrl}/logout`)
      .then(response => {
        localStorage.removeItem('authToken');
        return response.data;
      })
      .catch(error => {
        console.error('Error al cerrar sesión', error);
        throw error;
      });
  }

  /**
   * Obtiene el token de autenticación del almacenamiento local.
   * @returns El token de autenticación.
   */
  async getToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Verifica si el usuario está autenticado.
   * @returns Verdadero si el usuario está autenticado, falso en caso contrario.
   */
  async isAuthenticated() {
    return !!this.getToken();
  }
}
