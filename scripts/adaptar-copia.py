from pathlib import Path
import re, json
root=Path(__file__).resolve().parents[1]
original=root.parent/'web'
def change(rel,fn):
    p=root/rel
    p.write_text(fn(p.read_text(encoding='utf-8')),encoding='utf-8')
def replace_all(s,pairs):
    for a,b in pairs: s=s.replace(a,b)
    return s

change('astro.config.mjs',lambda s:s.replace('https://mecanicaelgato.cl','https://soluciones-integrales-angol.handymelon66.chatgpt.site').replace('|| 4321','|| 4322'))

def hero(s):
    s=s.replace("import jeep from '../assets/jeep-hero.png';","import jeep from '../assets/electromovilidad/hero.png';")
    s=replace_all(s,[('Mecánica Automotriz El Gato en Santiago','Tu Vehículo Eléctrico,'),('En nuestro taller o a tu puerta.','Siempre Listo.'),('Camioneta Jeep blanca lista para volver a la ruta','Vehículo eléctrico blanco conectado a un cargador'),('Cotizar por WhatsApp','Solicitar Visita'),("texto: 'Garantía por escrito', corto: 'Garantía escrita'","texto: 'Tramitación TE-6 (SEC)', corto: 'Tramitación TE-6'"),("texto: 'Servicio a domicilio', corto: 'A domicilio'","texto: 'Solución llave en mano', corto: 'Llave en mano'"),("texto: 'Presupuesto sin costo', corto: 'Sin costo'","texto: 'La Araucanía', corto: 'La Araucanía'")])
    s=re.sub(r'Mantención preventiva, frenos, scanner.*?</strong>\.', 'Instalación de cargadores segura y certificada. Soluciones llave en mano para hogares y empresas con <strong class="font-bold text-azul-600">cumplimiento normativo SEC.</strong>',s,flags=re.S)
    # Same secondary-action slot, with the requested sharing action.
    s=s.replace('href="#servicios"\n          class="group hidden','type="button" data-compartir\n          class="group hidden')
    s=s.replace('Ver servicios','Compartir Web').replace('class="size-4 rotate-90','class="size-4')
    s=s.replace('<a\n          type="button" data-compartir','<button\n          type="button" data-compartir')
    s=re.sub(r'(<button\n          type="button" data-compartir[\s\S]*?)</a>',r'\1</button>',s)
    return s
change('src/components/Hero.astro',hero)

def header(s):
    s=s.replace("import gato from '../assets/logo-gato.png';","import gato from '../assets/marca.svg';")
    s=replace_all(s,[("texto: 'Por qué elegirnos'","texto: 'Nuestro proceso'"),("texto: 'Galería & Videos'","texto: 'Galería'"),("texto: 'Opiniones Google'","texto: 'Soluciones'"),('Logo El Gato','Soluciones Integrales'),('Cotizar ahora','Solicitar Visita')])
    s=s.replace('EL<span class="text-naranjo-400">GATO</span>','<span class="block text-[0.8em] leading-none">SOLUCIONES</span><span class="block text-[0.8em] leading-none text-naranjo-400">INTEGRALES</span>')
    return s
change('src/components/Header.astro',header)

def services(s):
    start=s.index('// Importación de iconos PNG')
    end=s.index('\n---',start)
    s=s[:start]+'''// SVG monocromos originales, integrados al mismo sistema de máscaras.
import residencial from '../assets/servicios/residencial.svg';
import certificacion from '../assets/servicios/certificacion.svg';
import empresas from '../assets/servicios/empresas.svg';
import balanceo from '../assets/servicios/balanceo.svg';
import empalme from '../assets/servicios/empalme.svg';
import tablero from '../assets/servicios/tablero.svg';
import fotoMecanico from '../assets/electromovilidad/tecnico.png';
const iconos: Record<string,string> = { residencial:residencial.src, certificacion:certificacion.src, empresas:empresas.src, balanceo:balanceo.src, empalme:empalme.src, tablero:tablero.src };
'''+s[end:]
    s=s.replace('iconos.aceite','iconos.residencial')
    s=replace_all(s,[('Servicios para el','La energía correcta,'),('Cuidado de tu Vehículo','donde la necesites'),('Mecánico revisando el motor de un auto en el taller','Imagen referencial de un técnico instalando infraestructura de carga eléctrica'),('Cotizar por WhatsApp','Solicitar Visita')])
    s=re.sub(r'Mantención preventiva y reparación con diagnóstico profesional\. Trabajamos con vehículos\s+de todas las marcas, bencineros y diésel\.', 'Diseñamos e instalamos infraestructura de carga adaptada a la realidad eléctrica de cada cliente, desde la obra civil hasta la puesta en marcha.',s)
    return s
change('src/components/Servicios.astro',services)

def process(s):
    s=s.replace("import fotoTaller from '../assets/fototaller.png';","import fotoTaller from '../assets/electromovilidad/estacion.png';")
    s=s.replace('¿Por qué dejarnos','Nuestro Proceso').replace('el auto a nosotros?','Llave en mano, en 4 pasos')
    s=re.sub(r'Con más de \{negocio.anosExperiencia\} años de oficio,[\s\S]*?Sin vueltas\.', 'Evaluación, diseño, instalación y declaración TE-6. Nos ocupamos de cada etapa para que tu vehículo eléctrico esté siempre listo.',s)
    return s.replace('Cotizar con nosotros','Solicitar Visita').replace('Ver trabajos reales','Ver proyectos')
change('src/components/PorQueElegirnos.astro',process)

def home_service(s):
    s=s.replace("import camioneta from '../assets/camioneta.png';","import camioneta from '../assets/electromovilidad/van.png';")
    s=replace_all(s,[('Mantenciones y cambios de aceite en tu casa u oficina','Instalación Wallbox residencial y empresas'),('Diagnóstico en el lugar, sin grúa ni traslados','Aumentos de capacidad y balanceo dinámico'),('Frenos, batería, bujías y revisiones de urgencia','Gestión de la declaración TE-6 ante la SEC'),('Si tu auto no se mueve,','Tu punto de carga,'),('nos movemos nosotros.','donde lo necesites.'),('Camioneta taller móvil de Mecánica Automotriz El Gato para atención a domicilio','Vehículo de servicio de Soluciones Integrales — imagen referencial'),('Hola, necesito mecánica a domicilio. Mi dirección es:','Hola, quiero solicitar una visita técnica para un cargador. Mi dirección es:')])
    s=re.sub(r'Llegamos con las herramientas listas a tu casa o trabajo\.[\s\S]*?mientras se hace\.', 'Especialistas en Electromovilidad en La Araucanía. Llegamos a tu hogar o empresa con una solución integral: evaluamos tu red, diseñamos la instalación y dejamos tu infraestructura de carga lista para usar.',s)
    return s.replace('Pedir visita a domicilio','Solicitar Visita Técnica')
change('src/components/Domicilio.astro',home_service)

def gallery_home(s):
    a=s.index("import frenoDisco")
    b=s.index('\n---',a)
    s=s[:a]+"import { fotosGaleria as trabajos, categoriasGaleria as categorias } from '../data/proyectos';\n"+s[b:]
    s=replace_all(s,[('Evidencia Técnica & Transparencia','Nuestro Trabajo'),('Trabajos <span class="text-azul-500">reales</span>, mecánica de precisión','Galería de <span class="text-azul-500">Proyectos</span>'),('Nada de fotos de catálogo. Documentamos cada diagnóstico, desarme y cambio de repuestos en el taller. Pasa el cursor o toca cada imagen para inspeccionar los detalles.','Calidad, orden y seguridad en cada detalle, desde la obra civil hasta el tablero eléctrico. Imágenes referenciales creadas con IA para mostrar nuestras soluciones.'),('100% Registro fotográfico transparente','Soluciones de electromovilidad'),('32+ Registros','10 Imágenes'),('Enviamos fotos y videos de cada pieza desgastada y repuesto nuevo directo a tu WhatsApp.','Imágenes referenciales de cargadores, canalizaciones, conexiones y protecciones eléctricas.'),('Ver Galería Completa & Videos','Ver Galería Completa'),('Hola El Gato, estuve viendo la galería de trabajos y quiero cotizar una mantención para mi vehículo.','Hola Soluciones Integrales, vi su galería y quiero cotizar una instalación de carga eléctrica.'),('Garantía de Taller El Gato','Soluciones Integrales'),('Procedimiento bajo especificaciones de manual técnico, torques certificados y repuestos garantizados por escrito.','Diseño e instalación de infraestructura de carga a medida. Fotografía referencial generada con IA.'),('Hola Mecánica El Gato, vi en su galería el trabajo','Hola Soluciones Integrales, vi en su galería la solución'),('me gustaría cotizarlo para mi vehículo.','me gustaría cotizar una instalación.'),('56981989642','56935172731')])
    return s
change('src/components/Trabajos.astro',gallery_home)

def banner(s):
    s=s.replace("import mecanicoImg from '../assets/mecanico.png';","import mecanicoImg from '../assets/electromovilidad/profesional.png';")
    s=s.replace('resenasGoogle','solucionesDestacadas').replace('Mecánico profesional de Taller El Gato','Técnico eléctrico — imagen referencial')
    s=re.sub(r'<div class="flex items-center gap-0.5 text-amber-300">[\s\S]*?</div>', '',s,count=1)
    s=s.replace('nombre="google"','nombre="cargador"')
    s=replace_all(s,[('5.0 en Google Reviews','Soluciones Integrales'),('Opiniones de nuestros clientes en Google','Infraestructura de carga segura y certificada'),('Transparencia y repuestos garantizados. Haz clic en la reseña para verla en Google Maps.','Hogares y empresas en La Araucanía. Un servicio para cada necesidad.'),('resena.linkGoogle','resena.link'),('Ver esta reseña directamente en Google Maps','Consultar por esta solución'),('resena.avatarColor',"'bg-azul-600'"),('resena.autor.charAt(0)','resena.numero'),('resena.autor','resena.titulo'),('resena.fecha',"'Solución a medida'"),('resena.comentario','resena.texto'),('resena.servicio','resena.etiqueta'),('Ver en Google ↗','Consultar ↗'),('Ir a la reseña','Ir a la solución'),('Reseña anterior','Solución anterior'),('Siguiente reseña','Siguiente solución'),('Hola El Gato, vi las reseñas de Google y quiero agendar una atención para mi auto en Calle Nueva de Valdés 1013.','Hola Soluciones Integrales, quiero solicitar una visita técnica para instalar un cargador eléctrico.'),('Agenda tu servicio por WhatsApp','Solicitar Visita por WhatsApp')])
    s=re.sub(r'\{resena.esLocalGuide && \([\s\S]*?\)\}', '',s)
    s=re.sub(r'<div class="flex items-center text-amber-300">[\s\S]*?</div>','<div class="flex items-center text-amber-300"><Icono nombre="garantia" class="size-4" /></div>',s,count=1)
    s=s.replace('Google Maps ↗','Consultar ↗').replace('"{resena.texto}"','{resena.texto}')
    return s
change('src/components/ResenasGoogle.astro',banner)

def footer(s):
    s=s.replace("import gato from '../assets/logo-gato.png';","import gato from '../assets/marca.svg';")
    s=replace_all(s,[('Logo El Gato','Soluciones Integrales'),('EL<span class="text-naranjo-400">GATO</span>','SOLUCIONES <span class="text-naranjo-400">INTEGRALES</span>'),('Mecánica Automotriz','Electromovilidad'),('Servicios & Evidencia','Servicios Principales'),('Galería de Trabajos & Videos','Galería de Proyectos'),('>24+</span>','>10</span>'),('Chile · Mecánica automotriz y servicio a domicilio','Chile · Electromovilidad en La Araucanía'),('>Contacto</h2>','>Contacto Comercial</h2>')])
    s=re.sub(r'\{\s*negocio.horarios.map\([\s\S]*?\)\)\s*\}', '''<span class="block text-sm">RUT: {negocio.rut}</span>
              <a class="block text-sm break-all hover:text-naranjo-400" href={`mailto:${negocio.email}`}>{negocio.email}</a>
              <a class="block text-sm break-all hover:text-naranjo-400" href={`mailto:${negocio.emailAlternativo}`}>{negocio.emailAlternativo}</a>
              <a class="block text-sm break-all hover:text-naranjo-400" href={`https://${negocio.web}`} target="_blank" rel="noopener">{negocio.web}</a>''',s)
    s=s.replace('<Icono nombre="reloj" class="size-4" />','<Icono nombre="correo" class="size-4" />')
    s=s.replace('class="relative border-t border-white/8 bg-navy-950 pt-16 pb-8"','id="contacto" class="relative border-t border-white/8 bg-navy-950 pt-16 pb-8"')
    s=s.replace('{negocio.descripcion}\n        </p>','{negocio.descripcion}\n        </p>\n        <button type="button" data-compartir-whatsapp class="mt-5 inline-flex items-center gap-2 py-2 text-sm font-semibold text-naranjo-400"><Icono nombre="whatsapp" class="size-5" />Compartir página por WhatsApp</button>')
    return s
change('src/components/Footer.astro',footer)

def layout(s):
    a=s.index('const diasISO:')
    b=s.index('\n---',a)
    s=s[:a]+'''const schema = {
  '@context':'https://schema.org', '@type':'Electrician', name:negocio.nombre,
  description:negocio.descripcion, url:canonical, image:ogAbsoluta,
  telephone:negocio.telefono, email:negocio.email,
  address:{'@type':'PostalAddress',streetAddress:negocio.direccion.calle,addressLocality:negocio.direccion.comuna,addressRegion:negocio.direccion.region,addressCountry:negocio.direccion.pais},
  areaServed:{'@type':'AdministrativeArea',name:negocio.direccion.region},
  hasOfferCatalog:{'@type':'OfferCatalog',name:'Servicios de electromovilidad',itemListElement:servicios.map(s=>({'@type':'Offer',itemOffered:{'@type':'Service',name:s.titulo,description:s.resumen}}))}
};
'''+s[b:]
    return s.replace('type="image/png" href="/favicon.png"','type="image/svg+xml" href="/favicon.svg"')
change('src/layouts/Base.astro',layout)

def index(s):
    a=s.index('// Máx.')
    b=s.index('\n---',a)
    s=s[:a]+"const titulo = 'Soluciones Integrales — Electromovilidad en La Araucanía';\nconst descripcion = 'Instalación de cargadores eléctricos en Angol y La Araucanía. Soluciones llave en mano para hogares y empresas, tableros y tramitación TE-6 ante la SEC.';\n"+s[b:]
    s=s.replace("import '../scripts/animaciones';","import '../scripts/animaciones';\n  import '../scripts/compartir';")
    return s
change('src/pages/index.astro',index)
change('src/components/Faq.astro',lambda s:s.replace('Hola, tengo una consulta sobre mi vehículo:','Hola, tengo una consulta sobre cargadores eléctricos:'))

# Retain the original full-gallery component and its card/filter/modal structure.
def full_gallery(s):
    s=s.replace("} from '../data/galeria';","} from '../data/galeria';")
    s=replace_all(s,[('Galería de Trabajos & Videos','Galería de Proyectos'),('Evidencia fotográfica y videos de trabajos reales en ','Galería de infraestructura de carga eléctrica en '),(': frenos, ajuste de motor, rectificación de culatas, distribución, embragues y afinamiento. 100% transparencia.',': cargadores, canalizaciones, tableros y conexiones. Imágenes referenciales.'),('Galería & Evidencia Técnica','Galería de Proyectos'),('Evidencia Técnica Real · Sin Fotos de Catálogo','Electromovilidad · Imágenes Referenciales'),('Trabajos reales, <span class="texto-destacado">mecánica transparente</span>','Galería de Proyectos, <span class="texto-destacado">Soluciones Integrales</span>'),('Documentamos cada desarme, diagnóstico computarizado, rectificación y montaje de repuestos en el taller. Explora más de 30 registros fotográficos y videos reales de procedimientos.','Explora detalles de infraestructura de carga: equipos, canalizaciones, conexiones y protecciones. Imágenes referenciales creadas con IA; no corresponden a obras ejecutadas.'),('Fotografías HD','Imágenes de referencia'),('Videos en Taller','Videos disponibles'),('100% Repuestos Garantizados','Soluciones de carga a medida'),('Fotografías de Evidencia Mecánica','Cargadores e Infraestructura Eléctrica'),('Política de Transparencia Total','Soluciones Integrales'),('¿Quieres ver cómo queda tu auto antes y después?','¿Necesitas un punto de carga en tu casa o empresa?'),('Durante cualquier reparación o mantención en Taller El Gato, tomamos fotos y videos de cada pieza desgastada, el empaque de los repuestos nuevos y el armado final. Te enviamos todo directamente a tu WhatsApp en tiempo real.','Evaluamos tu vehículo y la capacidad del empalme, diseñamos la instalación y gestionamos la declaración TE-6 ante la SEC. Escríbenos para coordinar una visita técnica.'),('Hola El Gato, quiero cotizar un servicio y me gustaría recibir el registro fotográfico durante el trabajo.','Hola Soluciones Integrales, quiero cotizar una instalación de carga eléctrica.'),('Estándar Técnico El Gato','Soluciones Integrales'),('Hola Mecánica El Gato, vi en su galería de trabajos la foto de','Hola Soluciones Integrales, vi en su galería la foto de'),('me gustaría cotizar este procedimiento para mi auto.','me gustaría cotizar una instalación.'),('56981989642','56935172731')])
    s=s.replace('<section class="mt-12" data-seccion-videos','{videosGaleria.length > 0 && <section class="mt-12" data-seccion-videos',1)
    marker='<!-- GRILLA COMPLETA DE FOTOGRAFÍAS TÉCNICAS -->'
    a=s.index(marker)
    k=s.rfind('</section>',0,a)
    s=s[:k]+s[k:].replace('</section>','</section>}',1)
    s=s.replace('<div class="flex items-center gap-2 rounded-xl bg-navy-900/80 border border-white/10 px-4 py-2 backdrop-blur-md">\n            <Icono nombre="video"','<div hidden class="flex items-center gap-2 rounded-xl bg-navy-900/80 border border-white/10 px-4 py-2 backdrop-blur-md">\n            <Icono nombre="video"',1)
    s=s.replace("import '../scripts/animaciones';","import '../scripts/animaciones';\n  import '../scripts/compartir';")
    return s
change('src/pages/galeria.astro',full_gallery)

# Unused inherited CTA copy is adapted as well.
change('src/components/CtaFinal.astro',lambda s:replace_all(s,[('¿Tu auto está haciendo un ruido raro?','¿Listo para instalar tu cargador eléctrico?'),('Mándanos un mensaje contando qué le pasa. Te respondemos con un diagnóstico\n          y un presupuesto claro, sin costo.','Cuéntanos sobre tu vehículo y el lugar de instalación. Coordinemos una visita técnica para evaluar tu proyecto.')]))

print('Contenido adaptado sobre componentes originales. global.css y animaciones.ts conservados sin cambios.')
