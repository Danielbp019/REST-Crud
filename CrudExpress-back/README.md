## CrudExpress-back
 Crud de Express para el back, es intercambiable con el crud de laravel y a futuro todos los back que digan crud.

Instala las dependencias utilizando npm (Node Package Manager):
```sh
npm install
```
Crea el archivo .env a partir del ejemplo.

Levantar el servidor desarrollo
```sh
npm run dev
```

Levantar el servidor node --watch
```sh
npm run start
```

Rutas de peticiones:
```sh
GET:       http://localhost:8000/api/articulos
GET ID:    http://localhost:8000/api/articulos/1
POST:      http://localhost:8000/api/articulos
PUT:       http://localhost:8000/api/articulos/1/
DELETE:    http://localhost:8000/api/articulos/1
```

SQL de la tabla:
```sh
CREATE TABLE articulos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    cuerpo TEXT,
    autor VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
