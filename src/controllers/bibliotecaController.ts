import { Request, Response } from 'express';
import { registrarPrestamo, registrarDevolucion, listarPrestamosVencidos, consultarDisponibilidad } from '../services/bibliotecaService.js';

export const registrarPrestamoController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { isbn, identificacionUsuario, fechaVencimiento } = req.body;
    const prestamo = await registrarPrestamo(isbn, identificacionUsuario, new Date(fechaVencimiento));
    res.status(201).json(prestamo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const registrarDevolucionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const devolucion = await registrarDevolucion(id);
    res.status(200).json(devolucion);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listarPrestamosVencidosController = async (req: Request, res: Response): Promise<void> => {
  try {
    const prestamos = await listarPrestamosVencidos();
    res.status(200).json(prestamos);
  } catch (error: any) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const consultarDisponibilidadController = async (req: Request, res: Response): Promise<void> => {
  try {
    const isbn = req.params.isbn as string;
    const disponibilidad = await consultarDisponibilidad(isbn);
    res.status(200).json({ isbn, ejemplaresDisponibles: disponibilidad });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};