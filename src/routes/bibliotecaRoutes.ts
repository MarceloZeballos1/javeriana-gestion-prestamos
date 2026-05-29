import { Router } from 'express';
import { registrarPrestamoController, registrarDevolucionController, listarPrestamosVencidosController, consultarDisponibilidadController } from '../controllers/bibliotecaController.js';

const router = Router();

router.post('/prestamos', registrarPrestamoController);
router.put('/prestamos/:id/devolucion', registrarDevolucionController);
router.get('/prestamos/vencidos', listarPrestamosVencidosController);
router.get('/libros/:isbn/disponibilidad', consultarDisponibilidadController);

export default router;