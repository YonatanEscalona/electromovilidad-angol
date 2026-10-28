import { rutaLocal } from '../utils/rutas';

const urlPagina = () => new URL(rutaLocal('/'), location.origin).href;

function avisar(texto:string) {
  let aviso = document.querySelector<HTMLElement>('[data-aviso-compartir]');
  if (!aviso) {
    aviso = document.createElement('p');
    aviso.dataset.avisoCompartir = '';
    aviso.setAttribute('role','status');
    aviso.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 z-[80] rounded-xl border border-white/15 bg-navy-900 px-5 py-3 text-sm text-white shadow-xl max-w-[90vw]';
    document.body.append(aviso);
  }
  aviso.hidden=false; aviso.textContent=texto;
  setTimeout(()=>{if(aviso)aviso.hidden=true;},4000);
}
document.querySelectorAll<HTMLButtonElement>('[data-compartir]').forEach(b=>b.addEventListener('click',async()=>{
  const url = urlPagina();
  try {
    if(navigator.share) await navigator.share({title:'Soluciones Integrales — Electromovilidad',text:'Cargadores eléctricos para hogares y empresas en La Araucanía.',url});
    else if(navigator.clipboard && isSecureContext){await navigator.clipboard.writeText(url);avisar('Enlace copiado. Ya puedes compartirlo.');}
    else window.open('https://wa.me/?text='+encodeURIComponent('Soluciones Integrales · '+url),'_blank','noopener,noreferrer');
  } catch(e){if((e as Error).name!=='AbortError')avisar('Puedes compartir la dirección desde tu navegador.');}
}));
document.querySelectorAll<HTMLButtonElement>('[data-compartir-whatsapp]').forEach(b=>b.addEventListener('click',()=>window.open('https://wa.me/?text='+encodeURIComponent('Soluciones Integrales · Cargadores eléctricos en La Araucanía. '+urlPagina()),'_blank','noopener,noreferrer')));
