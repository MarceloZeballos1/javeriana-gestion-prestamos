-- CreateTable
CREATE TABLE "Libro" (
    "isbn" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "areaConocimiento" TEXT NOT NULL,
    "ejemplaresDisponibles" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Prestamo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isbn" TEXT NOT NULL,
    "identificacionUsuario" TEXT NOT NULL,
    "fechaPrestamo" DATETIME NOT NULL,
    "fechaVencimiento" DATETIME NOT NULL,
    "estado" TEXT NOT NULL,
    CONSTRAINT "Prestamo_isbn_fkey" FOREIGN KEY ("isbn") REFERENCES "Libro" ("isbn") ON DELETE RESTRICT ON UPDATE CASCADE
);
