/** Conserva las rutas tanto en la raíz local como en una subcarpeta de GitHub Pages. */
export function rutaLocal(ruta = '') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${ruta.replace(/^\//, '')}`;
}
