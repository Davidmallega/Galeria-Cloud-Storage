import { IconoEliminar } from './Iconos.jsx';

function formatearTamano(bytes) {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function nombreCorto(nombre) {
  const partes = nombre.split('.');
  const ext = partes.length > 1 ? partes.pop() : '';
  const base = partes.join('.');
  return base.length > 12 ? `${base.slice(0, 8)}…${ext ? `.${ext}` : ''}` : nombre;
}

export function TarjetaImagen({ imagen, onEliminar }) {
  return (
    <div className="group overflow-hidden rounded-md border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-surface-2">
        <img
          src={imagen.url}
          alt={imagen.nombre}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/40 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEliminar(imagen.nombre)}
            className="flex items-center gap-1 rounded-sm bg-white/90 px-2 py-1 text-xs font-medium text-error shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
          >
            <IconoEliminar className="h-3.5 w-3.5" />
            Eliminar
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between px-3 py-2">
        <span className="max-w-[70%] truncate font-mono text-xs text-text-muted" title={imagen.nombre}>
          {nombreCorto(imagen.nombre)}
        </span>
        <span className="font-mono text-xs text-text-subtle">
          {formatearTamano(imagen.tamano)}
        </span>
      </div>
    </div>
  );
}
