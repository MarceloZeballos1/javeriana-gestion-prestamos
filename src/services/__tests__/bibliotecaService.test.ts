import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { registrarPrestamo, registrarDevolucion } from '../bibliotecaService';
import prisma from '../../prismaClient';

jest.mock('../../prismaClient', () => ({
  __esModule: true,
  default: {
    $transaction: jest.fn((callback: any) => callback(prisma)),
    libro: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    prestamo: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    }
  }
}));

describe('Biblioteca Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registrarPrestamo', () => {
    it('debe registrar un prestamo con éxito si hay stock', async () => {
      jest.mocked(prisma.libro.findUnique).mockResolvedValue({
        isbn: '123',
        titulo: 'Test Libro',
        areaConocimiento: 'Tests',
        ejemplaresDisponibles: 1
      } as any);
      jest.mocked(prisma.prestamo.create).mockResolvedValue({
        id: 'p1',
        isbn: '123',
        identificacionUsuario: 'usuario1',
        fechaPrestamo: new Date(),
        fechaVencimiento: new Date(),
        estado: 'ACTIVO'
      } as any);

      const result = await registrarPrestamo('123', 'usuario1', new Date());
      
      expect(result.id).toBe('p1');
      expect(prisma.libro.update).toHaveBeenCalledWith({
        where: { isbn: '123' },
        data: { ejemplaresDisponibles: { decrement: 1 } }
      });
    });

    it('debe fallar si el libro no existe o si ejemplaresDisponibles <= 0', async () => {
      jest.mocked(prisma.libro.findUnique).mockResolvedValue({
        isbn: '123',
        ejemplaresDisponibles: 0
      } as any);

      await expect(registrarPrestamo('123', 'usuario1', new Date())).rejects.toThrow('Libro no disponible');
    });
  });

  describe('registrarDevolucion', () => {
    it('debe registrar la devolucion de un prestamo activo', async () => {
      jest.mocked(prisma.prestamo.findUnique).mockResolvedValue({
        id: 'p1',
        isbn: '123',
        estado: 'ACTIVO'
      } as any);
      jest.mocked(prisma.prestamo.update).mockResolvedValue({
        id: 'p1',
        estado: 'DEVUELTO'
      } as any);

      const result = await registrarDevolucion('p1');
      
      expect(result.estado).toBe('DEVUELTO');
      expect(prisma.libro.update).toHaveBeenCalledWith({
        where: { isbn: '123' },
        data: { ejemplaresDisponibles: { increment: 1 } }
      });
    });

    it('debe fallar si el prestamo no esta activo', async () => {
      jest.mocked(prisma.prestamo.findUnique).mockResolvedValue({
        id: 'p1',
        estado: 'DEVUELTO'
      } as any);

      await expect(registrarDevolucion('p1')).rejects.toThrow('Préstamo no activo');
    });
  });
});