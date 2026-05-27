import { Router } from 'express';
import { subirImagen, listarImagenes, eliminarImagen } from '../controllers/galeriaController.js';
import { upload, manejarErroresUpload } from '../middleware/upload.js';

const router = Router();

router.get('/', listarImagenes);
router.post('/', upload.single('imagen'), manejarErroresUpload, subirImagen);
router.delete('/:nombre', eliminarImagen);

export default router;
