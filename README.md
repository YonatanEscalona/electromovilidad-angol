# Soluciones Integrales — mismo diseño de la web original

Adaptación basada en una copia exacta de ../web/. Se conservan los componentes, el orden de las secciones, CSS, animaciones, fondos y breakpoints. Solo cambia la información del negocio, sus imágenes y la iconografía temática.

## Desarrollo
npm install
npm run dev

Abrir http://localhost:4322. Para comprobar: npm run check. Para compilar: npm run build. La carpeta dist/ es la web lista para alojar.

## GitHub Pages

Repositorio: https://github.com/YonatanEscalona/electromovilidad-angol

Página: https://yonatanescalona.github.io/electromovilidad-angol/

Cada cambio en `main` activa `.github/workflows/deploy-pages.yml`, que instala las dependencias, compila con Node 22 y publica `dist/`. La configuración de Pages usa `SITE_URL=https://yonatanescalona.github.io` y `BASE_PATH=/electromovilidad-angol`; sin esas variables, el desarrollo local conserva la ruta raíz.

Los enlaces internos, imágenes, metadatos, sitemap, robots y botones para compartir respetan la subcarpeta de publicación.

## Contenido y recursos
- src/data/negocio.ts: información comercial, servicios, proceso y preguntas.
- src/data/proyectos.ts: 10 imágenes de la galería con sus descripciones.
- src/assets/electromovilidad/: 14 fotografías nuevas generadas con IA.
- src/assets/servicios/: seis SVG monocromos originales.
- scripts/crear-svg.mjs: fuente de los SVG.

Las 14 imágenes PNG originales de máxima resolución se conservan en `../output/imagenes-originales-soluciones-integrales/`. La web utiliza copias WebP de alta calidad para reducir el tiempo de carga, con la misma resolución y composición.

El banner azul conserva su carrusel y figura recortada; presenta soluciones de la empresa en lugar de trasladar reseñas de otro negocio. Las imágenes de galería son referenciales y están identificadas como tales.

El correo comercial se conserva exactamente como fue entregado: mazocar@solucioesintegralesangol.cl. El dominio comercial indicado en el pie no implica que esta versión se haya instalado allí.

La web original sigue intacta en ../web/ y su respaldo verificado está en ../respaldos/. La primera propuesta se conserva en ../output/propuesta-inicial-soluciones-integrales/.
