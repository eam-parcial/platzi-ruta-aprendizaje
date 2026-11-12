// Etapa 4: los JSON de datos-ficticios/ cumplen el modelo conceptual
// (Estudiante, RutaAprendizaje, Curso, Progreso, ClaseEnVivo, Entrega, Evaluacion,
// Suscripcion, Notificacion, Certificacion) y sus referencias existen.
import { readFileSync } from "node:fs";

const leer = (f) => JSON.parse(readFileSync(`datos-ficticios/${f}`, "utf8"));
const estudiante = leer("estudiante.json");
const rc = leer("rutas-cursos.json");
const cal = leer("calendario.json");
const sn = leer("suscripcion-notificaciones.json");

const MODELO = {
  Estudiante: { lista: [estudiante], campos: ["id", "nombre", "email", "fecha_registro"] },
  RutaAprendizaje: { lista: rc.rutas, campos: ["id", "nombre", "porcentaje_avance", "cursos_total", "cursos_completados"] },
  Curso: { lista: rc.cursos, campos: ["id", "ruta_id", "nombre", "estado"], estados: ["completado", "en_curso", "no_iniciado"] },
  Progreso: { lista: rc.progreso, campos: ["id", "estudiante_id", "curso_id", "porcentaje_avance", "fecha_actualizacion"] },
  ClaseEnVivo: { lista: cal.clases_en_vivo, campos: ["id", "curso_id", "fecha", "tipo", "titulo"] },
  Entrega: { lista: cal.entregas, campos: ["id", "curso_id", "estudiante_id", "fecha_limite", "estado", "titulo"] },
  Evaluacion: { lista: cal.evaluaciones, campos: ["id", "curso_id", "estudiante_id", "fecha_limite", "estado", "titulo"] },
  Suscripcion: { lista: [sn.suscripcion], campos: ["id", "estudiante_id", "tipo", "fecha_inicio", "fecha_vencimiento", "estado"] },
  Notificacion: { lista: sn.notificaciones, campos: ["id", "estudiante_id", "tipo", "fecha_envio", "leida"] },
  Certificacion: { lista: sn.certificaciones, campos: ["id", "estudiante_id", "curso_id", "fecha_emision", "id_validacion"] },
};

const errores = [];
const ids = {
  estudiante: new Set([estudiante.id]),
  ruta: new Set(rc.rutas.map((r) => r.id)),
  curso: new Set(rc.cursos.map((c) => c.id)),
};

for (const [entidad, { lista, campos, estados }] of Object.entries(MODELO)) {
  if (!Array.isArray(lista)) { errores.push(`${entidad}: no es una lista`); continue; }
  for (const item of lista) {
    for (const c of campos) if (item[c] === undefined) errores.push(`${entidad} ${item.id}: falta "${c}"`);
    for (const [c, v] of Object.entries(item)) {
      if (/^fecha/.test(c) && Number.isNaN(new Date(v).getTime())) errores.push(`${entidad} ${item.id}: ${c} inválida`);
      if (c === "porcentaje_avance" && (v < 0 || v > 100)) errores.push(`${entidad} ${item.id}: % fuera de 0-100`);
    }
    if (estados && !estados.includes(item.estado)) errores.push(`${entidad} ${item.id}: estado "${item.estado}" no válido`);
    if (item.estudiante_id && !ids.estudiante.has(item.estudiante_id)) errores.push(`${entidad} ${item.id}: estudiante inexistente`);
    if (item.curso_id && !ids.curso.has(item.curso_id)) errores.push(`${entidad} ${item.id}: curso inexistente`);
    if (item.ruta_id && !ids.ruta.has(item.ruta_id)) errores.push(`${entidad} ${item.id}: ruta inexistente`);
  }
}

const s = sn.suscripcion;
if (new Date(s.fecha_vencimiento) <= new Date(s.fecha_inicio)) errores.push("Suscripcion: vence antes de iniciar");

errores.forEach((e) => console.log(`::error::${e}`));
console.log(`Datos ficticios: ${Object.keys(MODELO).length} entidades revisadas, ${errores.length} errores`);
process.exit(errores.length ? 1 : 0);
