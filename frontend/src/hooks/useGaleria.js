import { useState, useEffect, useCallback } from 'react';
import { galeriaAPI } from '../services/api.js';

export function useGaleria() {
  const [imagenes, setImagenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      const datos = await galeriaAPI.listar();
      setImagenes(datos.imagenes);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const subir = async (archivo) => {
    try {
      setSubiendo(true);
      setError(null);
      await galeriaAPI.subir(archivo);
      await cargar();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSubiendo(false);
    }
  };

  const eliminar = async (nombre) => {
    await galeriaAPI.eliminar(nombre);
    await cargar();
  };

  return { imagenes, cargando, subiendo, error, cargar, subir, eliminar };
}
