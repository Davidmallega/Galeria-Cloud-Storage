import { useState, useRef } from 'react';
import { IconoSubir } from './Iconos.jsx';

export function ZonaSubida({ onSubir, subiendo }) {
  const [arrastrando, setArrastrando] = useState(false);
  const [errorLocal, setErrorLocal] = useState(null);
  const inputRef = useRef(null);

  const procesarArchivo = async (archivo) => {
    setErrorLocal(null);
    if (!archivo) return;
    if (!archivo.type.startsWith('image/')) {
      return setErrorLocal('Solo se permiten imágenes.');
    }
    if (archivo.size > 5 * 1024 * 1024) {
      return setErrorLocal('La imagen supera los 5 MB.');
    }
    try {
      await onSubir(archivo);
    } catch (err) {
      setErrorLocal(err.message);
    }
  };

  const alSoltar = (e) => {
    e.preventDefault();
    setArrastrando(false);
    procesarArchivo(e.dataTransfer.files[0]);
  };

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setArrastrando(true); }}
        onDragLeave={() => setArrastrando(false)}
        onDrop={alSoltar}
        onClick={() => !subiendo && inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed px-6 py-12 text-center transition-colors ${
          arrastrando
            ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
            : 'border-border-strong bg-surface hover:border-brand-400 hover:bg-surface-2'
        } ${subiendo ? 'cursor-default' : ''}`}
      >
        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
          arrastrando ? 'bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400' : 'bg-surface-2 text-text-muted'
        }`}>
          <IconoSubir className="h-6 w-6" />
        </div>

        {subiendo ? (
          <div className="flex flex-col items-center gap-2">
            <div className="h-1 w-32 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full animate-pulse rounded-full bg-brand-500" style={{ width: '60%' }} />
            </div>
            <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
              Subiendo a Cloud Storage…
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm font-medium text-text">
              {arrastrando ? 'Suelta para subir' : 'Arrastra una imagen aquí'}
            </p>
            <p className="mt-1 text-xs text-text-muted">
              o haz clic para elegir · JPEG, PNG, WebP, GIF · máx. 5 MB
            </p>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => procesarArchivo(e.target.files[0])}
        />
      </div>

      {errorLocal && (
        <p className="mt-2 rounded-sm bg-error-bg px-3 py-2 text-sm text-error">
          {errorLocal}
        </p>
      )}
    </div>
  );
}
