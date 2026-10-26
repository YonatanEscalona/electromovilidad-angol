import {writeFileSync} from 'node:fs';
const paths = {
residencial:'<path d="m12 48 34-29 34 29M22 42v61h48V42M32 103V70h24v33"/><rect x="75" y="63" width="31" height="45" rx="6"/><path d="m94 71-10 15h10l-9 14M106 76c13 0 13 32 0 32M86 112v7m-5-53V51m12 15V51"/>',
certificacion:'<path d="M27 12h49l21 21v39M76 12v22h21M27 12v103h41M41 47h35M41 61h28M41 75h15"/><path d="m88 65 23 9v20c0 16-23 29-23 29S65 110 65 94V74Z"/><path d="m77 93 8 8 15-18"/>',
empresas:'<path d="M18 109V29l51-15v95M69 45l35-12v76M10 109h105M31 41h8m12-4h6M31 57h8m12-4h6M31 74h8m12-4h6M31 91h8M81 54h9M81 70h9M81 86h9"/><path d="M49 109V88h10v21"/>',
balanceo:'<path d="M64 14v22M26 59V42h76v17M64 42v17"/><rect x="11" y="63" width="29" height="44" rx="5"/><rect x="49" y="63" width="29" height="44" rx="5"/><rect x="88" y="63" width="29" height="44" rx="5"/><path d="m28 71-8 13h10l-7 14m43-27-8 13h10l-7 14m44-27-8 13h10l-7 14M20 115h11m27 0h11m28 0h11"/>',
empalme:'<path d="M49 116 61 15h7l12 101M35 33h58M29 51h70M45 77h40M49 99h31M60 19 45 77l35 22M68 19l17 58-36 22M34 33v13m60-13v13M28 51v14m71-14v14M16 43c8-6 12-6 20-2m59 0c8-4 13-4 20 2"/>',
tablero:'<rect x="24" y="10" width="80" height="108" rx="7"/><path d="M36 28h56M36 62h56M36 94h56M48 28v22m17-22v22m17-22v22M48 62v20m17-20v20m17-20v20"/><path d="M42 36h12m5 0h12m5 0h12M42 71h12m5 0h12m5 0h12"/><path d="m78 99-8 10h7l-4 7"/>'
};
for(const [name,art] of Object.entries(paths)) writeFileSync(`src/assets/servicios/${name}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${art}</svg>`);
const marca='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="#1d63ed"/><path d="m39 9-23 27h15l-6 19 24-29H34Z" fill="white"/><path d="M11 18h10M43 47h10" stroke="#91baff" stroke-width="2"/></svg>';
writeFileSync('src/assets/marca.svg',marca);writeFileSync('public/favicon.svg',marca);
console.log('6 iconos SVG monocromos y marca creados.');
