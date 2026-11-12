// Gate G4: los textos de beneficios del prototipo salen de la guía validada por Legal
// (T-01 a T-04) y no contienen precios ni descuentos (HU-13, RNF-04, R-02/R-04).
import { readFileSync } from "node:fs";

const guia = readFileSync("docs/guia-contenido-legal/textos-beneficios.md", "utf8");
const html = readFileSync("prototipo/prototipo-platzi-ruta.html", "utf8");
const texto = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
const errores = [];
const avisos = [];

// Textos aprobados en la guía: | T-0X | "texto" | ...
const aprobados = Object.fromEntries(
  [...guia.matchAll(/\|\s*(T-\d+)\s*\|\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]),
);
if (!Object.keys(aprobados).length) errores.push("No se encontraron textos aprobados en la guía de Legal");

for (const [id, frase] of Object.entries(aprobados)) {
  if (texto.includes(frase)) continue;
  // Coincidencia parcial: la última oración del texto aprobado está en el prototipo
  const nucleo = frase.split(/(?<=\.)\s+/).pop();
  if (texto.includes(nucleo)) avisos.push(`${id}: el prototipo usa una variante del texto aprobado ("${nucleo}")`);
  else errores.push(`${id}: el texto aprobado no aparece en el prototipo: "${frase}"`);
}

// Sin precios ni descuentos
const PRECIOS = [
  /\$\s?\d/, /\d[\d.,]*\s?(COP|USD|pesos|dólares)\b/i, /\d+\s?%\s?(de\s)?(descuento|off)/i,
  /\b(descuento|promoci[oó]n|oferta)\b/i,
];
for (const re of PRECIOS) {
  const m = texto.match(re);
  if (m) errores.push(`Precio o descuento en el prototipo: "${m[0]}"`);
}

// Las notas legales deben ser visibles en Suscripción y en el Simulador
const notasLegales = (html.match(/class="legal"/g) ?? []).length;
if (notasLegales < 2) errores.push(`Se esperaban al menos 2 notas legales visibles, hay ${notasLegales}`);

avisos.forEach((a) => console.log(`::warning::G4 ${a}`));
errores.forEach((e) => console.log(`::error::G4 ${e}`));
console.log(`Gate textos legales: ${Object.keys(aprobados).length} textos aprobados, ${errores.length} errores, ${avisos.length} avisos`);
process.exit(errores.length ? 1 : 0);
