// Gate G3: bloquea si hay datos personales reales (HU-14, RNF-02, R-09).
// Se permiten solo correos de dominios de ejemplo y nombres marcados como "(ficticia/o)".
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

const DOMINIOS_FICTICIOS = ["ejemplo.com", "example.com", "demo.platzi.test"];
const archivos = execSync("git ls-files datos-ficticios prototipo docs", { encoding: "utf8" })
  .trim().split("\n").filter((f) => /\.(json|html|md)$/.test(f));

const hallazgos = [];
for (const f of archivos) {
  const contenido = readFileSync(f, "utf8");
  for (const [email, dominio] of contenido.matchAll(/[\w.+-]+@([\w-]+(?:\.[\w-]+)+)/g)) {
    if (!DOMINIOS_FICTICIOS.includes(dominio.toLowerCase())) hallazgos.push(`${f}: correo real "${email}"`);
  }
  // Cédulas / documentos: 8 a 10 dígitos seguidos
  for (const [doc] of contenido.matchAll(/\b\d{8,10}\b/g)) hallazgos.push(`${f}: posible documento "${doc}"`);
  // Teléfonos móviles de Colombia
  for (const [tel] of contenido.matchAll(/(?:\+57\s?)?\b3\d{2}[\s-]?\d{3}[\s-]?\d{4}\b/g)) hallazgos.push(`${f}: posible teléfono "${tel}"`);
  // Claves o tokens
  if (/(api[_-]?key|password|secret|token)\s*[:=]\s*["'][^"']+["']/i.test(contenido)) hallazgos.push(`${f}: posible credencial`);
}

// Los nombres de estudiantes deben estar marcados como ficticios
const est = JSON.parse(readFileSync("datos-ficticios/estudiante.json", "utf8"));
if (!/\(fictici[ao]\)/i.test(est.nombre)) hallazgos.push(`datos-ficticios/estudiante.json: nombre sin marca "(ficticia)"`);

hallazgos.forEach((h) => console.log(`::error::G3 PII: ${h}`));
console.log(`Gate PII: ${archivos.length} archivos revisados, ${hallazgos.length} hallazgos`);
process.exit(hallazgos.length ? 1 : 0);
