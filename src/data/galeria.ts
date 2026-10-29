export { fotosGaleria, categoriasGaleria, cantidadFotosInstalaciones, type FotoItem } from './proyectos';
export interface VideoItem { id:string; src:string; poster:string; alt:string; categoria:'videos'; categoriaLabel:string; titulo:string; resumen:string; tag:string; duracion:string; destacado?:boolean }
export const videosGaleria:VideoItem[] = [];
