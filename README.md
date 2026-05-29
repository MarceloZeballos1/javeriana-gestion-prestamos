# Gestión de Préstamos - Biblioteca Universitaria
## Instrucciones de Instalación y Ejecución
1. Clonar el repositorio.
2. Instalar dependencias: `npm install`
3. Validar el esquema de Prisma: `npx prisma validate`
4. Generar el cliente de Prisma: `npx prisma generate`
5. Ejecutar migraciones y crear la base de datos local SQLite: `npx prisma migrate dev --name init`
6. Poblar la base de datos con libros de prueba: `npm run seed`
7. Levantar el servidor de desarrollo: `npm run dev` (Corre en http://localhost:3000)
8. Ejecutar la suite de pruebas: `npx jest`
