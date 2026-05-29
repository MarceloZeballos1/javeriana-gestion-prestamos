# Gestión de Préstamos - Biblioteca Universitaria

Servicio REST desarrollado para la gestión de préstamos y devoluciones de libros, con validación de disponibilidad y control de transacciones.

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm

## Instrucciones de Instalación y Ejecución

1. Clonar el repositorio en tu máquina local.

2. Instalar las dependencias del proyecto:

```bash
npm install
```

3. Validar la estructura del esquema de Prisma:

```bash
npx prisma validate
```

4. Generar el cliente de Prisma para TypeScript:

```bash
npx prisma generate
```

5. Ejecutar las migraciones para crear la base de datos local SQLite (`dev.db`):

```bash
npx prisma migrate dev --name init
```

6. Poblar la base de datos con los libros de prueba iniciales (Seed):

```bash
npm run seed
```

7. Levantar el servidor de desarrollo en `http://localhost:3000`:

```bash
npm run dev
```

8. Para ejecutar la suite de pruebas automatizadas en otra terminal:

```bash
npx jest
```

---

# Guía de Pruebas en Postman / Cliente REST

Sigue este orden secuencial para validar todo el flujo de negocio del sistema.

## 1. Consultar Disponibilidad Inicial de un Libro

Permite verificar que el script de carga inicial funcionó y devuelve el stock actual del libro.

- **Método:** `GET`
- **URL:** `http://localhost:3000/api/libros/978-1/disponibilidad`

### Respuesta esperada

Un JSON indicando que el libro `"Ingeniería de Software"` cuenta con `2` ejemplares disponibles.

---

## 2. Registrar un Préstamo Exitoso

Crea un nuevo registro de préstamo en estado activo y reduce automáticamente el stock disponible del libro en la base de datos.

- **Método:** `POST`
- **URL:** `http://localhost:3000/api/prestamos`
- **Headers:** `Content-Type: application/json`

### Body (JSON / raw)

```json
{
  "isbn": "978-1",
  "identificacionUsuario": "USR-12345",
  "fechaVencimiento": "2026-06-15T00:00:00.000Z"
}
```

### Respuesta esperada

Un objeto JSON con el préstamo creado en estado `ACTIVO` y un campo `id` único (formato UUID).

### Nota de validación

Si vuelves a ejecutar el paso 1 (GET de disponibilidad), verás que el stock bajó de `2` a `1`.

---

## 3. Consultar Préstamos Vencidos

Lista todos los registros almacenados cuyo estado sea activo y su fecha límite de entrega sea menor a la fecha actual del sistema.

- **Método:** `GET`
- **URL:** `http://localhost:3000/api/prestamos/vencidos`

### Respuesta esperada

Un arreglo JSON.

Si deseas ver un elemento listado, realiza un POST como el del paso 2 pero asignando una `fechaVencimiento` del mes pasado.

### Ejemplo

```json
{
  "fechaVencimiento": "2026-04-01T00:00:00.000Z"
}
```

---

## 4. Registrar Devolución de un Libro

Actualiza el estado del préstamo a devuelto e incrementa de forma inmediata el stock del libro para que vuelva a estar disponible.

- **Método:** `PUT`
- **URL:** `http://localhost:3000/api/prestamos/{id_prestamo}/devolucion`

### Instrucciones

Reemplaza `{id_prestamo}` en la URL por el valor alfanumérico largo del `id` que obtuviste en la respuesta del paso 2.

### Respuesta esperada

Estado HTTP `200` con el préstamo modificado a estado `DEVUELTO`.

El stock del libro regresará a su valor original al consultar nuevamente su disponibilidad.

<img width="1919" height="1014" alt="image" src="https://github.com/user-attachments/assets/63b38636-a948-4d64-bcbc-cb224ade1eb8" />

<img width="1914" height="1017" alt="image" src="https://github.com/user-attachments/assets/e6483483-8087-4379-99c5-d1a975f8dc14" />

<img width="1919" height="1019" alt="image" src="https://github.com/user-attachments/assets/6df833a5-2cfa-4c1c-8a3d-366a90a5028f" />
