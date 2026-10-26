import {writeFileSync} from 'node:fs';

// Optical grid shared by all six pictograms. Filled equipment silhouettes
// remain readable at 44–48 px; navy recesses and blue details add definition.
const c = {white:'#f4f8ff', silver:'#b6cce7', edge:'#91b5e2', blue:'#3b82f6', cyan:'#7dd3fc', navy:'#102645'};
const icons = {
  residencial: {
    title:'Wallbox residencial con cable de carga',
    art:`
      <path d="m8 24 17-14 17 14M13 21v18" stroke="${c.edge}" stroke-width="2.8"/>
      <rect x="21" y="17" width="32" height="49" rx="8" fill="${c.silver}"/>
      <rect x="17" y="14" width="32" height="49" rx="8" fill="${c.white}"/>
      <rect x="23" y="21" width="20" height="24" rx="4" fill="${c.navy}"/>
      <path d="m35 25-8 11h7l-3 7 10-13h-7l3-5Z" fill="${c.cyan}"/>
      <rect x="27" y="50" width="12" height="3" rx="1.5" fill="${c.blue}"/>
      <path d="M46 36h8c10 0 14 6 14 15v9c0 9-4 14-10 14s-9-5-9-10v-3" stroke="${c.navy}" stroke-width="6"/>
      <path d="M48 36h6c9 0 12 6 12 15v9c0 8-3 12-8 12s-7-4-7-9" stroke="${c.edge}" stroke-width="2.4"/>
      <path d="m46 55 5-2 5 10-6 3-5-8Z" fill="${c.blue}" stroke="${c.cyan}" stroke-width="1.4"/>
      <path d="m47 55-2-5" stroke="${c.white}" stroke-width="3"/>
      <circle cx="23" cy="58" r="1" fill="${c.edge}"/><circle cx="43" cy="58" r="1" fill="${c.edge}"/>`
  },
  certificacion: {
    title:'Declaración TE-6 y cumplimiento normativo',
    art:`
      <path d="M19 9h27l13 13v43a5 5 0 0 1-5 5H19a5 5 0 0 1-5-5V14a5 5 0 0 1 5-5Z" fill="${c.silver}"/>
      <path d="M16 7h27l13 13v43a5 5 0 0 1-5 5H16a5 5 0 0 1-5-5V12a5 5 0 0 1 5-5Z" fill="${c.white}"/>
      <path d="M43 7v10a3 3 0 0 0 3 3h10Z" fill="${c.edge}"/>
      <text x="19" y="33" fill="${c.navy}" font-family="Arial,sans-serif" font-size="13" font-weight="800" letter-spacing="-.5">TE6</text>
      <path d="M20 43h23M20 50h17M20 57h12" stroke="${c.edge}" stroke-width="2.6"/>
      <path d="m56 37 16 6v13c0 11-16 19-16 19s-16-8-16-19V43Z" fill="${c.blue}" stroke="${c.cyan}" stroke-width="2"/>
      <path d="m48 56 5 5 11-12" stroke="${c.white}" stroke-width="4"/>`
  },
  empresas: {
    title:'Infraestructura de carga para empresas',
    art:`
      <path d="M10 71V18l29-9 9 5v57Z" fill="${c.silver}"/>
      <path d="M10 71V18l29-9v62Z" fill="${c.white}"/>
      <path d="M17 24h5v7h-5Zm10-3h5v7h-5ZM17 38h5v7h-5Zm10-3h5v7h-5ZM17 52h5v7h-5Zm10-3h5v7h-5Z" fill="${c.blue}"/>
      <path d="M28 71V61h7v10" fill="${c.navy}"/>
      <rect x="48" y="29" width="22" height="32" rx="5" fill="${c.silver}"/>
      <rect x="45" y="27" width="22" height="32" rx="5" fill="${c.white}"/>
      <rect x="49" y="32" width="14" height="15" rx="2" fill="${c.navy}"/>
      <path d="m57 34-5 7h5l-2 5 6-9h-5l2-3Z" fill="${c.cyan}"/>
      <path d="M52 60v12h8V60" fill="${c.blue}"/>
      <path d="M66 39h3c5 0 7 4 7 10v8c0 5-3 8-7 8s-6-3-6-7" stroke="${c.edge}" stroke-width="2.8"/>
      <rect x="49" y="71" width="14" height="3" rx="1.5" fill="${c.white}"/>
      <path d="M7 73h33" stroke="${c.edge}" stroke-width="2.4"/>`
  },
  balanceo: {
    title:'Distribución y balanceo inteligente de energía',
    art:`
      <path d="M40 31v10M15 50V41h50v9M40 41v9" stroke="${c.cyan}" stroke-width="3"/>
      <circle cx="40" cy="19" r="13" fill="${c.blue}" stroke="${c.cyan}" stroke-width="1.8"/>
      <path d="m42 11-9 11h7l-2 7 10-13h-7l3-5Z" fill="${c.white}"/>
      ${[6,31,56].map(x=>`<rect x="${x+2}" y="50" width="18" height="24" rx="4" fill="${c.silver}"/><rect x="${x}" y="48" width="18" height="24" rx="4" fill="${c.white}"/><rect x="${x+4}" y="53" width="10" height="10" rx="2" fill="${c.navy}"/><path d="m${x+10} 54-4 5h4l-1 3 5-6h-4Z" fill="${c.cyan}"/><path d="M${x+6} 67h6" stroke="${c.blue}" stroke-width="2"/>`).join('')}
      <circle cx="15" cy="41" r="2.5" fill="${c.white}"/><circle cx="40" cy="41" r="2.5" fill="${c.white}"/><circle cx="65" cy="41" r="2.5" fill="${c.white}"/>`
  },
  empalme: {
    title:'Medidor eléctrico y aumento de capacidad',
    art:`
      <path d="M24 59v15m11-15v15m11-15v15" stroke="${c.edge}" stroke-width="4"/>
      <rect x="16" y="12" width="38" height="53" rx="6" fill="${c.silver}"/>
      <rect x="12" y="9" width="38" height="53" rx="6" fill="${c.white}"/>
      <rect x="18" y="15" width="26" height="22" rx="4" fill="${c.navy}"/>
      <path d="M24 30v-4m7 4v-7m7 7V19" stroke="${c.cyan}" stroke-width="3"/>
      <circle cx="31" cy="48" r="7" fill="${c.silver}"/>
      <path d="m31 48 4-4" stroke="${c.navy}" stroke-width="2.5"/><circle cx="31" cy="48" r="1.5" fill="${c.navy}"/>
      <path d="M61 66V30m-9 10 9-10 9 10" stroke="${c.cyan}" stroke-width="5"/>
      <path d="M57 65h8" stroke="${c.blue}" stroke-width="5"/>
      <circle cx="18" cy="56" r="1" fill="${c.edge}"/><circle cx="44" cy="56" r="1" fill="${c.edge}"/>`
  },
  tablero: {
    title:'Tablero eléctrico con protecciones diferenciales',
    art:`
      <rect x="12" y="9" width="59" height="65" rx="7" fill="${c.silver}"/>
      <rect x="9" y="6" width="59" height="65" rx="7" fill="${c.white}"/>
      <rect x="15" y="13" width="47" height="9" rx="2" fill="${c.navy}"/>
      <path d="M21 17.5h16" stroke="${c.edge}" stroke-width="2"/><circle cx="56" cy="17.5" r="1.7" fill="${c.cyan}"/>
      <rect x="15" y="27" width="47" height="30" rx="3" fill="${c.navy}"/>
      ${[18,32,46].map((x,i)=>`<rect x="${x}" y="30" width="12" height="24" rx="2" fill="${c.white}"/><path d="M${x+4} 32h4M${x+4} 51h4" stroke="${c.edge}" stroke-width="1.5"/><rect x="${x+2}" y="37" width="8" height="9" rx="1.2" fill="${i===0?c.blue:c.navy}"/><path d="M${x+3} 39h6" stroke="${i===0?c.cyan:c.edge}" stroke-width="1.3"/>`).join('')}
      <path d="M20 63h37" stroke="${c.blue}" stroke-width="2.8"/>
      <circle cx="23" cy="63" r="1" fill="${c.white}"/><circle cx="31" cy="63" r="1" fill="${c.white}"/><circle cx="39" cy="63" r="1" fill="${c.white}"/><circle cx="47" cy="63" r="1" fill="${c.white}"/><circle cx="55" cy="63" r="1" fill="${c.white}"/>`
  }
};
for(const [name,{title,art}] of Object.entries(icons)) {
  writeFileSync(`src/assets/servicios/${name}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none" stroke-linecap="round" stroke-linejoin="round"><title>${title}</title>${art}</svg>`);
}
const marca='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="#1d63ed"/><path d="m39 9-23 27h15l-6 19 24-29H34Z" fill="white"/><path d="M11 18h10M43 47h10" stroke="#91baff" stroke-width="2"/></svg>';
writeFileSync('src/assets/marca.svg',marca);writeFileSync('public/favicon.svg',marca);
console.log('6 pictogramas SVG en blanco, azul y cian, con siluetas y proporciones uniformes.');
