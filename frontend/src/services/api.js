const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const BASE = `${API_URL}/api/imagenes`;

async function manejarRespuesta(respuesta) {
  if (!respuesta.ok) {
    const datos = await respuesta.json().catch(() => ({}));
    throw new Error(datos.error || `Error HTTP ${respuesta.status}`);
  }
  if (respuesta.status === 204) return null;
  return respuesta.json();
}

export const galeriaAPI = {
  listar: async () => {
    const respuesta = await fetch(BASE);
    return manejarRespuesta(respuesta);
  },

  subir: async (archivo) => {
    const formData = new FormData();
    formData.append('imagen', archivo);
    const respuesta = await fetch(BASE, { method: 'POST', body: formData });
    return manejarRespuesta(respuesta);
  },

  eliminar: async (nombre) => {
    const respuesta = await fetch(`${BASE}/${encodeURIComponent(nombre)}`, { method: 'DELETE' });
    return manejarRespuesta(respuesta);
  },
};
