// Etapa 2: formato (EditorConfig) y estructura del repositorio.
// Errores bloquean; avisos se reportan (adopción gradual de CONTRIBUTING.md).
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const errores = [];
const avisos = [];
const archivos = execSync("git ls-files", { encoding: "utf8" }).trim().split("\n");
const BINARIOS = /\.(pdf|docx|pptx|png|jpe?g|gif|zip)$/i;

// Estructura fija
for (const carpeta of ["docs/", "prototipo/", "datos-ficticios/"]) {
  if (!archivos.some((f) => f.startsWith(carpeta))) errores.push(`Falta la carpeta ${carpeta}`);
}
for (const f of archivos) {
  if (/(^|\/)(misc|utils)\//i.test(f)) errores.push(`Carpeta no permitida (misc/utils): ${f}`);
}

for (const f of archivos) {
  const nombre = f.split("/").pop();
  // kebab-case (aviso: hay documentos históricos que aún no cumplen)
  const base = nombre.replace(/\.[^.]+$/, "");
  const esEspecial = nombre.startsWith(".") || /^[A-Z]+$/.test(base) || f.startsWith(".github/");
  if (!esEspecial && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(base)) avisos.push(`Nombre no está en kebab-case: ${f}`);

  if (BINARIOS.test(f)) continue;
  const buf = readFileSync(f);
  if (buf.length === 0) continue;
  const contenido = buf.toString("utf8");
  if (Buffer.from(contenido, "utf8").compare(buf) !== 0) errores.push(`No es UTF-8: ${f}`);
  if (contenido.includes("\r")) errores.push(`Fin de línea CRLF (debe ser LF): ${f}`);
  if (!contenido.endsWith("\n")) errores.push(`Falta salto de línea final: ${f}`);
  if (/^\t/m.test(contenido)) errores.push(`Indentación con tabs (deben ser 2 espacios): ${f}`);
  if (!f.endsWith(".md") && /[ \t]+$/m.test(contenido)) errores.push(`Espacios sobrantes al final de línea: ${f}`);
}

avisos.forEach((a) => console.log(`::warning::${a}`));
errores.forEach((e) => console.log(`::error::${e}`));
console.log(`Formato y estructura: ${archivos.length} archivos, ${errores.length} errores, ${avisos.length} avisos`);
process.exit(errores.length ? 1 : 0);
