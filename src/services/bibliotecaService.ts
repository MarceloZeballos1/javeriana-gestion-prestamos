import prisma from '../prismaClient';

export const registrarPrestamo = async (isbn: string, identificacionUsuario: string, fechaVencimiento: Date) => {
  return prisma.$transaction(async (tx) => {
    const libro = await tx.libro.findUnique({ where: { isbn } });
    if (!libro || libro.ejemplaresDisponibles <= 0) {
      throw new Error("Libro no disponible");
    }
    await tx.libro.update({
      where: { isbn },
      data: { ejemplaresDisponibles: { decrement: 1 } }
    });
    return tx.prestamo.create({
      data: {
        isbn,
        identificacionUsuario,
        fechaPrestamo: new Date(),
        fechaVencimiento,
        estado: 'ACTIVO'
      }
    });
  });
};

export const registrarDevolucion = async (prestamoId: string) => {
  return prisma.$transaction(async (tx) => {
    const prestamo = await tx.prestamo.findUnique({ where: { id: prestamoId } });
    if (!prestamo || prestamo.estado !== 'ACTIVO') {
      throw new Error("Préstamo no activo");
    }
    await tx.libro.update({
      where: { isbn: prestamo.isbn },
      data: { ejemplaresDisponibles: { increment: 1 } }
    });
    return tx.prestamo.update({
      where: { id: prestamoId },
      data: { estado: 'DEVUELTO' }
    });
  });
};

export const listarPrestamosVencidos = async () => {
  return prisma.prestamo.findMany({
    where: {
      estado: 'ACTIVO',
      fechaVencimiento: { lt: new Date() }
    }
  });
};

export const consultarDisponibilidad = async (isbn: string): Promise<number> => {
  const libro = await prisma.libro.findUnique({ where: { isbn } });
  if (!libro) {
    throw new Error("Libro no encontrado");
  }
  return libro.ejemplaresDisponibles;
};