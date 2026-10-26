import type { ImageMetadata } from 'astro';
import canalizacion from '../assets/electromovilidad/canalizacion.webp';
import conexiones from '../assets/electromovilidad/conexiones.webp';
import wallbox from '../assets/electromovilidad/wallbox.webp';
import equipo from '../assets/electromovilidad/equipo.webp';
import tablero from '../assets/electromovilidad/tablero.webp';
import estacion from '../assets/electromovilidad/estacion.webp';
import conector from '../assets/electromovilidad/conector.webp';
import componentes from '../assets/electromovilidad/componentes.webp';
import cableado from '../assets/electromovilidad/cableado.webp';
import obra from '../assets/electromovilidad/obra.webp';
export interface FotoItem { id:string; img:ImageMetadata; alt:string; categoria:string; categoriaLabel:string; titulo:string; resumen:string; tag:string; destacada?:boolean }
export const fotosGaleria:FotoItem[] = [
  { id:'estacion', img:estacion, alt:'Imagen referencial de una estación residencial de carga para vehículo eléctrico', categoria:'residencial', categoriaLabel:'Carga Residencial', titulo:'Estación completa residencial', resumen:'Infraestructura de carga integrada al garaje, desde la alimentación eléctrica hasta el wallbox.', tag:'Imagen referencial', destacada:true },
  { id:'canalizacion', img:canalizacion, alt:'Detalle fotográfico referencial de una canalización eléctrica exterior', categoria:'infraestructura', categoriaLabel:'Infraestructura', titulo:'Canalización exterior', resumen:'Recorridos protegidos y fijaciones ordenadas para la alimentación del equipo de carga.', tag:'Canalización' },
  { id:'conexiones', img:conexiones, alt:'Imagen referencial de una caja de conexiones eléctricas', categoria:'infraestructura', categoriaLabel:'Conexiones', titulo:'Caja de conexiones', resumen:'Organización de los conductores y conexiones protegidas en el recorrido eléctrico.', tag:'Conexiones' },
  { id:'wallbox', img:wallbox, alt:'Fotografía referencial de un cargador wallbox instalado en una pared', categoria:'residencial', categoriaLabel:'Wallbox', titulo:'Wallbox instalado', resumen:'Carga residencial a medida, seleccionada según el vehículo y la capacidad disponible.', tag:'3.7 a 7.4 kW' },
  { id:'equipo', img:equipo, alt:'Fotografía referencial de un equipo de carga eléctrica', categoria:'empresas', categoriaLabel:'Equipo de Carga', titulo:'Equipo de carga', resumen:'Equipos de carga adaptados al emplazamiento y al uso de cada cliente.', tag:'Diseño a medida' },
  { id:'tablero', img:tablero, alt:'Fotografía referencial de un tablero de protecciones para carga eléctrica', categoria:'protecciones', categoriaLabel:'Protecciones', titulo:'Tablero de protecciones', resumen:'Protecciones eléctricas dedicadas, dimensionadas para la infraestructura de carga.', tag:'Seguridad eléctrica' },
  { id:'conector', img:conector, alt:'Detalle fotográfico referencial de un conector de carga enchufado a un vehículo eléctrico', categoria:'residencial', categoriaLabel:'Cable y Conector', titulo:'Cableado y conector', resumen:'Conexión de carga compatible con el vehículo y con el equipo seleccionado.', tag:'Conector de carga' },
  { id:'componentes', img:componentes, alt:'Fotografía referencial de componentes de un tablero eléctrico', categoria:'protecciones', categoriaLabel:'Componentes', titulo:'Componentes del tablero', resumen:'Diferenciales y elementos de protección elegidos según el proyecto técnico.', tag:'Protección diferencial' },
  { id:'cableado', img:cableado, alt:'Fotografía referencial de conductores y terminales en un tablero', categoria:'infraestructura', categoriaLabel:'Cableado', titulo:'Cableado y terminaciones', resumen:'Conductores identificados y terminaciones organizadas para una instalación segura.', tag:'Terminaciones' },
  { id:'obra', img:obra, alt:'Fotografía referencial de una obra de instalación de cargador en proceso', categoria:'infraestructura', categoriaLabel:'Instalación', titulo:'Obra en proceso', resumen:'Trabajo de obra civil y eléctrica, desde los soportes hasta la puesta en marcha.', tag:'Obra civil y eléctrica' },
];
export const categoriasGaleria = [
  {id:'todos',label:'Todos los proyectos',conteo:fotosGaleria.length},
  ...[['residencial','Residencial'],['infraestructura','Infraestructura'],['protecciones','Protecciones'],['empresas','Empresas']].map(([id,label])=>({id,label,conteo:fotosGaleria.filter(f=>f.categoria===id).length})),
];
