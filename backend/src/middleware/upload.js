import multer from 'multer';

const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (TIPOS_PERMITIDOS.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (JPEG, PNG, WebP, GIF).'));
    }
  },
});

export function manejarErroresUpload(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'La imagen supera el límite de 5 MB.' });
    }
    return res.status(400).json({ error: `Error al subir: ${err.message}` });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
}
