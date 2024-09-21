import { Injectable } from '@angular/core';
import axios from 'axios';

/**
 * Servicio para manejar las operaciones relacionadas con los contactos.
 */
@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  /**
   * Obtiene todos los contactos desde la API.
   * @returns Promesa que resuelve un array de contactos.
   */
  async getAllContacts(): Promise<any[]> {
    return axios.get(this.apiUrl)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al obtener contactos', error);
        throw error;
      });
  }
}
