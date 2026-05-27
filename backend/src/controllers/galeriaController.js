import { bucket, BUCKET_NAME } from '../config/storage.js';
import { randomUUID } from 'crypto';

function urlPublica(nombreArchivo) {
  return `https://storage.googleapis.com/${BUCKET_NAME}/${nombreArchivo}`;
}

export async function subirImagen(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se envió ninguna imagen.' });
    }

    const extension = req.file.originalname.split('.').pop();
    const nombreArchivo = `${randomUUID()}.${extension}`;
    const archivo = bucket.file(nombreArchivo);

    await archivo.save(req.file.buffer, {
      metadata: { contentType: req.file.mimetype },
    });

    res.status(201).json({
      nombre: nombreArchivo,
      nombreOriginal: req.file.originalname,
      url: urlPublica(nombreArchivo),
      tipo: req.file.mimetype,
      tamano: req.file.size,
    });
  } catch (error) {
    console.error('Error al subir imagen:', error.message);
    res.status(500).json({ error: 'No se pudo subir la imagen.' });
  }
}

export async function listarImagenes(req, res) {
  try {
    const [archivos] = await bucket.getFiles();

    const imagenes = archivos
      .map((archivo) => ({
        nombre: archivo.name,
        url: urlPublica(archivo.name),
        tamano: Number(archivo.metadata.size) || 0,
        actualizado: archivo.metadata.updated,
      }))
      .sort((a, b) => new Date(b.actualizado) - new Date(a.actualizado));

    res.status(200).json({ total: imagenes.length, imagenes });
  } catch (error) {
    console.error('Error al listar imágenes:', error.message);
    res.status(500).json({ error: 'No se pudieron listar las imágenes.' });
  }
}

export async function eliminarImagen(req, res) {
  try {
    const nombre = req.params.nombre;
    const archivo = bucket.file(nombre);

    const [existe] = await archivo.exists();
    if (!existe) {
      return res.status(404).json({ error: 'La imagen no existe.' });
    }

    await archivo.delete();
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar imagen:', error.message);
    res.status(500).json({ error: 'No se pudo eliminar la imagen.' });
  }
}
