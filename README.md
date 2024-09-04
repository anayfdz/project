# Proyecto de Chat

Este proyecto es una aplicación de chat con autenticación basada en JWT. Está compuesto por un backend construido con NestJS y un frontend en React.

## Estructura del Proyecto

### Backend

- **NestJS**: Framework para construir el backend.
- **TypeORM**: ORM para interactuar con la base de datos.
- **bcrypt**: Biblioteca para el hash de contraseñas.
- **JWT**: Token de autenticación.
- **PostgreSQL**: Base de datos utilizada para almacenar la información.

### Frontend

- **React**: Biblioteca para la interfaz de usuario.
- **axios**: Cliente HTTP para realizar solicitudes a la API.

## Instalación

### Requisitos Previos

Asegúrate de tener Docker y Docker Compose instalados en tu máquina.

### Configuración con Docker

1. Clona el repositorio:

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <DIRECTORIO_DEL_REPOSITORIO>
    ```

2. Crea un archivo `.env` en el directorio raíz con la configuración de tu base de datos:

    ```env
    DB_TYPE=postgres
    DB_HOST=db
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=yourpassword
    DB_DATABASE=chatdb
    ```

3. Construye y ejecuta los contenedores Docker:

    ```bash
    docker-compose up --build
    ```

   Esto iniciará tanto el contenedor de la base de datos PostgreSQL como el contenedor de la aplicación.

### Configuración Sin Docker

Si prefieres no usar Docker, sigue estos pasos:

1. Navega al directorio del backend:

    ```bash
    cd backend
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` basado en el `.env.example` e ingresa tus credenciales de base de datos PostgreSQL.



### Backend

1. Navega al directorio del backend:

    ```bash
    cd backend
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` basado en el `.env.example` e ingresa tus credenciales de base de datos.

4. Inicia la aplicación:

    ```bash
    npm run start
    ```

5. Navega al directorio del frontend:

    ```bash
    cd frontend
    ```

6. Instala las dependencias:

    ```bash
    npm install
    ```

7. Inicia la aplicación:

    ```bash
    npm start
    ```

## Uso

### Interfaz de Usuario

1. Navega al directorio del frontend:

    ```bash
    cd frontend
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Inicia la aplicación:

    ```bash
    npm start
    ```

## Endpoints API

### Registro de Usuario

- **Método**: `POST`
- **Ruta**: `/users/register`
- **Cuerpo**:

    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

- **Respuesta**:

    ```json
    {
      "message": "User registered successfully"
    }
    ```

### Inicio de Sesión

- **Método**: `POST`
- **Ruta**: `/auth/login`
- **Cuerpo**:

    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

- **Respuesta**:

    ```json
    {
      "access_token": "string"
    }
    ```

### Recursos Protegidos

- **Método**: `POST`
- **Ruta**: `/auth/protected`
- **Headers**:

    ```http
    Authorization: Bearer <access_token>
    ```

- **Respuesta**:

    ```json
    {
      "message": "Protected resource accessed"
    }
    ```

### Mensajes

- **Método**: `GET`
- **Ruta**: `/messages`
- **Respuesta**:

    ```json
    [
      {
        "id": 1,
        "content": "Hello world"
      }
    ]
    ```

- **Método**: `POST`
- **Ruta**: `/messages`
- **Cuerpo**:

    ```json
    {
      "userId": 1,
      "content": "Message content"
    }
    ```

- **Headers**:

    ```http
    Authorization: Bearer <access_token>
    ```

### Pruebas

1. Navega al directorio del backend:

    ```bash
    cd backend
    ```

2. Ejecuta las pruebas::

    ```bash
    npm test
    ```

## Uso

### Interfaz de Usuario

1. Regístrate en la aplicación usando el formulario de registro.
2. Inicia sesión para obtener un token de autenticación.
3. Usa el token para acceder a los recursos protegidos y enviar mensajes.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commits (`git commit -am 'Añadir nueva característica'`).
4. Empuja tus cambios a tu fork (`git push origin feature/nueva-caracteristica`).
5. Crea un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
