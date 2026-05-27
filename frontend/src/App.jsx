import { useGaleria } from './hooks/useGaleria.js';
import { useTema } from './hooks/useTema.js';
import { ZonaSubida } from './components/ZonaSubida.jsx';
import { TarjetaImagen } from './components/TarjetaImagen.jsx';
import { IconoGaleria, IconoSol, IconoLuna, IconoNube, IconoVacio } from './components/Iconos.jsx';

export default function App() {
  const { imagenes, cargando, subiendo, error, cargar, subir, eliminar } = useGaleria();
  const { oscuro, alternar } = useTema();

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-600 text-white">
              <IconoGaleria className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">Galería en la nube</h1>
              <p className="font-mono text-xs text-text-muted">Cloud Storage</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-text-muted sm:flex">
              <IconoNube className="h-3 w-3 text-brand-500" />
              Cloud Storage
            </span>
            <button
              onClick={alternar}
              aria-label="Cambiar tema"
              className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface-2"
            >
              {oscuro ? <IconoSol className="h-4 w-4" /> : <IconoLuna className="h-4 w-4" />}
              <span className="hidden sm:inline">{oscuro ? 'Claro' : 'Oscuro'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="mb-10">
          <ZonaSubida onSubir={subir} subiendo={subiendo} />
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">Imágenes</h2>
              {!cargando && (
                <span className="rounded-full bg-surface-2 px-2.5 py-0.5 font-mono text-xs text-text-muted">
                  {imagenes.length}
                </span>
              )}
            </div>
            <button
              onClick={cargar}
              className="rounded-md border border-border px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface-2"
            >
              ↻ Recargar
            </button>
          </div>

          {cargando && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square animate-pulse rounded-md bg-surface-2" />
              ))}
            </div>
          )}

          {error && !cargando && (
            <div className="rounded-md border border-error/30 bg-error-bg p-6">
              <p className="font-medium text-error">No se pudo conectar con la API</p>
              <p className="mt-1 text-sm text-text-muted">{error}</p>
            </div>
          )}

          {!cargando && !error && imagenes.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-border-strong bg-surface py-16 text-center">
              <IconoVacio className="mb-4 h-12 w-12 text-text-subtle" />
              <h3 className="mb-1 text-base font-medium">La galería está vacía</h3>
              <p className="text-sm text-text-muted">Sube tu primera imagen arrastrándola arriba.</p>
            </div>
          )}

          {!cargando && !error && imagenes.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {imagenes.map((imagen) => (
                <TarjetaImagen key={imagen.nombre} imagen={imagen} onEliminar={eliminar} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
