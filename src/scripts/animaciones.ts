import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esTactil = window.matchMedia('(hover: none)').matches;

/* ────────────────────────────────────────────────
   MENÚ MÓVIL — funciona siempre, con o sin animación
   ──────────────────────────────────────────────── */
function menuMovil() {
  const abrir = document.querySelector<HTMLButtonElement>('[data-abrir-menu]');
  const cerrar = document.querySelector<HTMLButtonElement>('[data-cerrar-menu]');
  const menu = document.querySelector<HTMLElement>('[data-menu-movil]');
  if (!abrir || !cerrar || !menu) return;

  const enlaces = menu.querySelectorAll<HTMLAnchorElement>('[data-enlace-movil], a');

  const mostrar = () => {
    menu.hidden = false;
    abrir.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    cerrar.focus();
    if (!sinMovimiento) {
      gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.fromTo(
        menu.querySelectorAll('[data-enlace-movil]'),
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.055, ease: 'power3.out', delay: 0.05 }
      );
    }
  };

  const ocultar = () => {
    menu.hidden = true;
    abrir.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    abrir.focus();
  };

  abrir.addEventListener('click', mostrar);
  cerrar.addEventListener('click', ocultar);
  enlaces.forEach((a) => a.addEventListener('click', ocultar));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) ocultar();
  });
}

/* ────────────────────────────────────────────────
   CABECERA — se vuelve sólida al bajar
   ──────────────────────────────────────────────── */
function cabecera() {
  const el = document.querySelector<HTMLElement>('[data-cabecera]');
  if (!el) return;

  const esHeroClaro = el.getAttribute('data-hero-claro') === 'true';
  const clases = ['bg-navy-950/85', 'backdrop-blur-xl', 'shadow-lg', 'shadow-black/25', 'border-b', 'border-white/10'];
  const actualizar = () => {
    const activa = window.scrollY > 40;
    if (esHeroClaro) {
      clases.forEach((c) => el.classList.toggle(c, activa));
      el.classList.toggle('cabecera-clara', !activa);
    } else {
      clases.forEach((c) => el.classList.add(c));
      el.classList.remove('cabecera-clara');
    }
  };

  actualizar();
  window.addEventListener('scroll', actualizar, { passive: true });
}

/* ────────────────────────────────────────────────
   SCROLL SUAVE
   ──────────────────────────────────────────────── */
function scrollSuave() {
  // En táctil el scroll nativo ya es bueno; forzarlo empeora la sensación.
  if (sinMovimiento || esTactil) return;

  const lenis = new Lenis({
    duration: 1.05,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((tiempo) => lenis.raf(tiempo * 1000));
  gsap.ticker.lagSmoothing(0);

  // Los enlaces internos pasan por Lenis para que el salto sea suave
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const destino = document.querySelector(id);
      if (!destino) return;
      e.preventDefault();
      lenis.scrollTo(destino as HTMLElement, { offset: -88 });
    });
  });
}

/* ────────────────────────────────────────────────
   ENTRADA DEL HERO
   ──────────────────────────────────────────────── */
function hero() {
  const auto = document.querySelector<HTMLElement>('[data-hero-auto]');
  const sombra = document.querySelector<HTMLElement>('[data-hero-sombra]');
  const textos = gsap.utils.toArray<HTMLElement>('.hero-entra');

  // Con movimiento reducido el CSS ya deja hero y camioneta visibles y quietos.
  if (sinMovimiento) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to(textos, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 });

  if (auto) {
    // Llega desde fuera de pantalla: acelerando (morro arriba), frena y se asienta.
    // El desenfoque que se va limpiando es lo que da la sensación de velocidad.
    gsap.set(auto, {
      xPercent: 62,
      opacity: 0,
      rotate: 1.4,
      scale: 1.06,
      filter: 'blur(9px)',
      transformOrigin: '50% 92%',
    });

    // Tiempos absolutos: el recorrido termina en 1.6 y ahí engancha el rebote.
    tl.to(auto, { opacity: 1, duration: 0.35, ease: 'none' }, 0.25)
      .to(
        auto,
        { xPercent: 0, scale: 1, rotate: -1.2, duration: 1.35, ease: 'power4.out' },
        0.25
      )
      .to(auto, { filter: 'blur(0px)', duration: 0.85, ease: 'power3.out' }, 0.3)
      // Rebote de suspensión al detenerse
      .to(auto, { rotate: 0, duration: 1.15, ease: 'elastic.out(1, 0.4)' }, 1.5)
      .to(auto, { y: 7, duration: 0.18, ease: 'power2.out' }, 1.5)
      .to(auto, { y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' }, 1.68);

    if (sombra) {
      tl.fromTo(
        sombra,
        { scaleX: 1.75, opacity: 0, transformOrigin: '50% 50%' },
        { scaleX: 1, opacity: 1, duration: 1.3, ease: 'power4.out' },
        0.3
      );
    }
  }

  // Parallax: al bajar, la camioneta se hunde un poco más que el fondo
  if (auto) {
    gsap.to(auto, {
      yPercent: 7,
      ease: 'none',
      scrollTrigger: { trigger: '#inicio', start: 'top top', end: 'bottom top', scrub: 0.6 },
    });
  }
}

/* ────────────────────────────────────────────────
   REVELADO AL HACER SCROLL
   El efecto escalonado de tarjetas que pidió el cliente.
   ──────────────────────────────────────────────── */
function revelados() {
  if (sinMovimiento) return;

  // Tarjetas en grilla: entran escalonadas por fila
  document
    .querySelectorAll<HTMLElement>('[data-grilla-servicios], [data-grilla-ventajas], [data-grilla-trabajos]')
    .forEach((grilla) => {
      ScrollTrigger.batch(grilla.querySelectorAll('.revelar'), {
        start: 'top 88%',
        once: true,
        onEnter: (lote) =>
          gsap.to(lote, {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.09,
            ease: 'power3.out',
            overwrite: true,
          }),
      });
    });

  // Resto de elementos sueltos (títulos, párrafos, botones)
  const enGrilla = new Set<Element>();
  document
    .querySelectorAll('[data-grilla-servicios] .revelar, [data-grilla-ventajas] .revelar, [data-grilla-trabajos] .revelar')
    .forEach((el) => enGrilla.add(el));

  const sueltos = [...document.querySelectorAll<HTMLElement>('.revelar')].filter(
    (el) => !enGrilla.has(el)
  );

  ScrollTrigger.batch(sueltos, {
    start: 'top 90%',
    once: true,
    onEnter: (lote) =>
      gsap.to(lote, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        overwrite: true,
      }),
  });
}

/* ────────────────────────────────────────────────
   CONTADOR DE AÑOS
   ──────────────────────────────────────────────── */
function contadores() {
  document.querySelectorAll<HTMLElement>('[data-contador]').forEach((el) => {
    const hasta = Number(el.dataset.hasta ?? 0);

    if (sinMovimiento) {
      el.textContent = `${hasta}+`;
      return;
    }

    const cifra = { valor: 0 };
    gsap.to(cifra, {
      valor: hasta,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${Math.round(cifra.valor)}+`;
      },
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  });
}

/* ────────────────────────────────────────────────
   CAMIONETA A DOMICILIO — Scroll Scrubbed Unificado (Sin saltos)
   Una sola línea de tiempo continua para máxima suavidad a 60 fps
   ──────────────────────────────────────────────── */
function detalles() {
  if (sinMovimiento) return;

  const auto = document.querySelector<HTMLElement>('[data-camioneta-auto]') || document.querySelector<HTMLElement>('[data-camioneta]');
  const sombra = document.querySelector<HTMLElement>('[data-camioneta-sombra]');
  const seccionDomicilio = document.querySelector<HTMLElement>('#domicilio');

  if (auto && seccionDomicilio) {
    gsap.set(auto, { transformOrigin: '50% 85%', willChange: 'transform' });
    if (sombra) gsap.set(sombra, { transformOrigin: '50% 50%', willChange: 'transform' });

    // Línea de tiempo única continua para evitar cualquier conflicto o salto entre triggers
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: seccionDomicilio,
        start: 'top 90%',
        end: 'bottom 10%',
        scrub: 0.8, // Amortiguación fluida para absorber tirones del scroll
        invalidateOnRefresh: true,
      },
    });

    // 1. Entrada continua controlada por el scroll
    tl.fromTo(
      auto,
      {
        xPercent: 48,
        y: 6,
        scale: 0.9,
        opacity: 0.3,
      },
      {
        xPercent: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        ease: 'power1.out',
        duration: 1,
      }
    );

    if (sombra) {
      tl.fromTo(
        sombra,
        {
          scaleX: 0.45,
          opacity: 0.2,
        },
        {
          scaleX: 1,
          opacity: 1,
          ease: 'power1.out',
          duration: 1,
        },
        0
      );
    }

    // 2. Parallax de salida en la misma línea de tiempo sin corte brusco
    tl.to(
      auto,
      {
        xPercent: -6,
        yPercent: -6,
        scale: 1.02,
        ease: 'power1.inOut',
        duration: 0.7,
      },
      '>'
    );
  }

  // El botón flotante se esconde cuando el CTA final ya está en pantalla
  const flotante = document.querySelector<HTMLElement>('[data-boton-flotante]');
  const cta = document.querySelector('#contacto');
  if (flotante && cta) {
    ScrollTrigger.create({
      trigger: cta,
      start: 'top 80%',
      end: 'bottom bottom',
      onToggle: ({ isActive }) =>
        gsap.to(flotante, {
          autoAlpha: isActive ? 0 : 1,
          y: isActive ? 20 : 0,
          duration: 0.4,
          ease: 'power2.out',
        }),
    });
  }
}

/* ────────────────────────────────────────────────
   ARRANQUE
   ──────────────────────────────────────────────── */
function iniciar() {
  menuMovil();
  cabecera();
  scrollSuave();
  hero();
  revelados();
  contadores();
  detalles();

  // Las fotos y la tipografía cargan después y mueven el layout:
  // sin recalcular, los disparadores quedan apuntando a posiciones viejas.
  ScrollTrigger.refresh();
  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

declare global {
  interface Window {
    __animacionesListas?: boolean;
  }
}

try {
  iniciar();
  // Cancela el respaldo del <head>: las animaciones tomaron el control.
  window.__animacionesListas = true;
} catch (error) {
  // Si algo falla, la página nunca queda invisible.
  document.documentElement.classList.remove('js-listo');
  console.error('[animaciones]', error);
}
