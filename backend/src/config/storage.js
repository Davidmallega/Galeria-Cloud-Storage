import { Storage } from '@google-cloud/storage';

export const storage = new Storage();
export const BUCKET_NAME = process.env.BUCKET_NAME || 'mi-galeria-imagenes';
export const bucket = storage.bucket(BUCKET_NAME);
