/** Información proporcionada por Soluciones Integrales. */
export const negocio = {
  nombre: 'Soluciones Integrales',
  nombreCorto: 'Soluciones Integrales',
  eslogan: 'Especialistas en Electromovilidad en La Araucanía',
  descripcion: 'Liderando la transición hacia la movilidad sostenible en la Región de la Araucanía. Infraestructura de carga segura, certificada y a medida.',
  telefono: '+56935172731', telefonoVisible: '+56 9 3517 2731', whatsapp: '56935172731',
  email: 'mazocar@solucioesintegralesangol.cl', emailAlternativo: 'Mauricioeazocar@gmail.com',
  rut: '14.333.765-0', web: 'www.solucionesintegralesangol.cl',
  direccion: { calle: 'Cerro Negro 1388', comuna: 'Angol', ciudad: 'Angol', region: 'Región de la Araucanía', pais: 'CL', linkMaps: 'https://www.google.com/maps/search/?api=1&query=Cerro+Negro+1388+Angol+Chile' },
  redes: { instagram: '', facebook: '' },
} as const;
export function linkWhatsApp(mensaje?: string) {
  return `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(mensaje ?? 'Hola Soluciones Integrales, quiero solicitar una visita técnica para instalar un cargador eléctrico.')}`;
}
export type Servicio = { slug: string; titulo: string; resumen: string; incluye: string[]; icono: string };
export const servicios: Servicio[] = [
  { slug: 'carga-residencial', titulo: 'Wallbox Residencial', resumen: 'Carga nocturna eficiente en tu casa, con evaluación de empalme e instalación segura en tu garaje.', incluye: ['Wallbox de 3.7 kW a 7.4 kW', 'Evaluación del empalme', 'Instalación en tu garaje'], icono: 'residencial' },
  { slug: 'tramitacion-te6', titulo: 'Tramitación TE-6 (SEC)', resumen: 'Gestionamos la declaración de tu infraestructura de carga ante la Superintendencia de Electricidad y Combustibles.', incluye: ['Cumplimiento normativo', 'Declaración ante la SEC', 'Entrega de obra declarada'], icono: 'certificacion' },
  { slug: 'carga-empresas', titulo: 'Carga para Empresas', resumen: 'Infraestructura robusta y a medida para múltiples vehículos y estacionamientos de empresas.', incluye: ['Múltiples puntos de carga', 'Diseño a medida', 'Puesta en marcha'], icono: 'empresas' },
  { slug: 'balanceo-dinamico', titulo: 'Balanceo Dinámico', resumen: 'Gestión inteligente de carga para distribuir la energía disponible entre tus vehículos.', incluye: ['Balanceo dinámico de carga', 'Gestión de potencia', 'Adaptación a tu red'], icono: 'balanceo' },
  { slug: 'empalmes', titulo: 'Capacidad y Empalmes', resumen: 'Evaluamos la red actual y gestionamos los aumentos de capacidad que tu instalación necesita.', incluye: ['Evaluación de capacidad', 'Aumentos de empalme', 'Diseño eléctrico'], icono: 'empalme' },
  { slug: 'tableros-proteccion', titulo: 'Tableros de Protección', resumen: 'Protecciones y diferenciales tipo A/B según el diseño de tu infraestructura de carga.', incluye: ['Tablero dedicado', 'Diferenciales según proyecto', 'Seguridad eléctrica'], icono: 'tablero' },
];
export const ventajas = [
  { titulo: 'Visita Técnica', texto: 'Evaluamos tu vehículo y la capacidad de tu empalme eléctrico actual.', icono: 'visita' },
  { titulo: 'Selección y Diseño', texto: 'Diseñamos la red eléctrica y elegimos el cargador ideal para tu necesidad.', icono: 'diseno' },
  { titulo: 'Instalación', texto: 'Ejecución de obra civil y eléctrica por nuestros profesionales autorizados.', icono: 'instalacion' },
  { titulo: 'Declaración TE-6', texto: 'Gestionamos la declaración ante la SEC para la puesta en servicio de tu instalación.', icono: 'certificacion' },
];
export const faqs = [
  { pregunta: '¿Instalan cargadores en casas?', respuesta: 'Sí. Evaluamos el empalme y las condiciones de tu vivienda para instalar un wallbox residencial de 3.7 kW a 7.4 kW según tu vehículo y la capacidad disponible.' },
  { pregunta: '¿Qué es la tramitación TE-6?', respuesta: 'Es la declaración ante la SEC de la puesta en servicio de la infraestructura de recarga de vehículos eléctricos. Gestionamos este trámite como parte del proyecto.' },
  { pregunta: '¿Puedo instalar varios puntos de carga?', respuesta: 'Diseñamos infraestructura para empresas y múltiples vehículos. La visita técnica permite determinar la capacidad y la necesidad de balanceo dinámico de carga.' },
  { pregunta: '¿Necesito aumentar mi empalme?', respuesta: 'Depende de tu instalación actual, del cargador y del consumo del inmueble. Lo evaluamos durante la visita técnica y definimos una solución adecuada.' },
  { pregunta: '¿Qué incluye una solución llave en mano?', respuesta: 'La evaluación técnica, la selección y el diseño de la red, la obra civil y eléctrica, la puesta en marcha y la gestión de la declaración TE-6 ante la SEC.' },
  { pregunta: '¿Cómo solicito una visita técnica?', respuesta: 'Escríbenos al +56 9 3517 2731 por WhatsApp. Cuéntanos dónde se instalará el cargador y qué vehículo tienes para coordinar la visita en La Araucanía.' },
];
export const solucionesDestacadas = servicios.map((s, i) => ({ id: s.slug, titulo: s.titulo, texto: s.resumen, etiqueta: s.incluye[0], numero: String(i + 1).padStart(2, '0'), link: linkWhatsApp(`Hola Soluciones Integrales, quiero consultar por ${s.titulo}.`) }));
