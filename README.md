# Sistema de Gestión de Contactos

Este proyecto es un sistema de gestión de contactos que permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre una lista de contactos. También incluye funcionalidades de autenticación de usuarios mediante registro y login, utilizando JSON Web Tokens (JWT) para la gestión de sesiones.

## Tecnologías Utilizadas

**Backend**
- Node.js
- Express
- MySQL

**Frontend**
- Angular 

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (Ultimas versiones)
- [MySQL](https://www.mysql.com/) (Ultimas versiones)
- [npm](https://www.npmjs.com/) (generalmente se instala junto con Node.js)

## Configuración del Entorno Local

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/Luamix550/Prueba-tecnica-proforest.git
   cd Prueba-tecnica-proforest` 

2.  **Instala las dependencias:**
    
    Ejecuta el siguiente comando en la raíz del proyecto para instalar las dependencias necesarias:
    
    
    `npm install` 
    
3.  **Configura las variables de entorno:**
    
    Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:
    

    
    `PORT=3000
    DB_HOST=localhost
    DB_USER=tu_usuario_mysql
    DB_PASSWORD=tu_contraseña_mysql
    DB_NAME=nombre_base_de_datos
    TOKEN_SECRET=tu_clave_secreta` 
    
    Asegúrate de reemplazar `tu_usuario_mysql`, `tu_contraseña_mysql` y `nombre_base_de_datos` con tus credenciales de MySQL.
    
4.  **Crea la base de datos y las tablas:**
    
    Conéctate a tu servidor MySQL y crea la base de datos especificada en la variable `DB_NAME`. Luego, ejecuta el script SQL necesario para crear las tablas de `users` y `contacts`. Asegúrate de que las tablas tengan la estructura correcta.
    

## Ejecución del Proyecto

1.  **Inicia el servidor:**
    
    Ejecuta el siguiente comando para iniciar el servidor en modo desarrollo:
    
    `npm run dev` 
    
2.  **Accede a la API:**
    
    La API estará disponible en `http://localhost:3000/api`. Puedes utilizar herramientas como [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/) para probar los endpoints.
    

## Endpoints

### Autenticación

-   **POST** `/api/register` - Registra un nuevo usuario.
-   **POST** `/api/login` - Inicia sesión de un usuario existente.
-   **POST** `/api/logout` - Cierra la sesión del usuario.

### Contactos

-   **GET** `/api/contacts` - Obtiene la lista de todos los contactos.
-   **POST** `/api/contacts/create` - Crea un nuevo contacto.
-   **PUT** `/api/contacts/:id/update` - Actualiza un contacto existente.
-   **DELETE** `/api/contacts/:id/delete` - Elimina un contacto.