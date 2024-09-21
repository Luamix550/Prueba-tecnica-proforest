import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ContactsService } from './../api/contact.service';

/**
 * Componente principal del dashboard que muestra los contactos.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {
  contacts: any[] = []; // Lista de contactos obtenida de la API
  private readonly contactsService = inject(ContactsService); // Inyección del servicio de contactos

  /**
   * Método que se ejecuta al inicializar el componente.
   * Carga los contactos al iniciar.
   */
  ngOnInit(): void {
    this.loadContacts();
  }

  /**
   * Carga los contactos desde el servicio.
   */
  loadContacts(): void {
    this.contactsService.getAllContacts()
      .then((data) => {
        this.contacts = data; // Asigna los datos de contactos a la propiedad
      })
      .catch((error) => {
        console.error('Error al obtener contactos:', error); // Manejo de errores
      });
  }
}
