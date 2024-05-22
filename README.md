Backend README - Prueba Técnica
Descripción
Este backend está desarrollado en Node.js y Express, utilizando SQLite para la persistencia de datos. La arquitectura sigue un modelo en capas, con rutas, controladores, servicios y DAOs bien definidos para una mejor organización y mantenimiento.

Instalación
Clona el repositorio.
Ejecuta npm install para instalar las dependencias.
Configura las variables de entorno en un archivo .env (ver config.js).
Uso
Inicia el servidor con npm start. El backend estará disponible en http://localhost:8080 (o el puerto configurado).
Rutas
Productos
GET /api/extend/products: Obtener productos.
POST /api/extend/products: Crear producto.
POST /api/extend/products/upload: Subir archivo de producto.
PUT /api/extend/products/:id: Actualizar producto.
DELETE /api/extend/products/:id: Eliminar producto.
Autenticación
POST /api/extend/auth/register: Registrar usuario.
POST /api/extend/auth/login: Iniciar sesión.
Usuarios
GET /api/extend/users: Obtener todos los usuarios.
GET /api/extend/users/profile: Obtener perfil de usuario.
Middleware
Autenticación y autorización mediante JWT.
Manejo de cookies con cookie-parser.
CORS configurado para http://localhost:5173.
Log
Logger personalizado para registro de eventos y errores.
Paginación
Se agrego el uso de paginación para mostrar los productos próximamente.
