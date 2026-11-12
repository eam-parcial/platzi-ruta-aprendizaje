// Lógica de referencia del prototipo (sin backend, RNF-01).
// Describe las reglas que el prototipo muestra con datos ficticios para poder probarlas en CI.

export const UMBRALES_ALERTA = [30, 15, 7, 1]; // HU-08

const MS_DIA = 24 * 60 * 60 * 1000;

// Toma solo el día calendario (AAAA-MM-DD) para no depender de la zona horaria:
// una entrega a las 23:59 en Bogotá no debe "saltar" al día siguiente en UTC.
function soloFecha(valor) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(valor));
  const t = m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : NaN;
  if (Number.isNaN(t) || new Date(t).getUTCDate() !== +m[3]) throw new Error(`Fecha inválida: ${valor}`);
  return t;
}

// HU-12: días que faltan para la fecha de renovación.
export function diasRestantes(fechaVencimiento, hoy) {
  return Math.round((soloFecha(fechaVencimiento) - soloFecha(hoy)) / MS_DIA);
}

// HU-08: fechas en las que se programan las alertas de vencimiento (30/15/7/1 días antes).
export function fechasAlertas(fechaVencimiento) {
  const base = soloFecha(fechaVencimiento);
  return UMBRALES_ALERTA.map((dias) => ({
    dias,
    fecha: new Date(base - dias * MS_DIA).toISOString().slice(0, 10),
  }));
}

// HU-08: próxima alerta pendiente a partir de hoy (null si ya no quedan).
export function proximaAlerta(fechaVencimiento, hoy) {
  const faltan = diasRestantes(fechaVencimiento, hoy);
  if (faltan < 1) return null;
  return fechasAlertas(fechaVencimiento).find((a) => a.dias <= faltan) ?? null;
}

// HU-12: texto de renovación (T-01 de la guía de Legal).
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
  "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

export function textoRenovacion(fechaVencimiento) {
  const d = new Date(soloFecha(fechaVencimiento));
  return `Se renueva el ${d.getUTCDate()} de ${MESES[d.getUTCMonth()]} de ${d.getUTCFullYear()}`;
}

// HU-05: entregas pendientes y si son urgentes (≤ 7 días → etiqueta ámbar).
export function entregasPendientes(entregas, hoy) {
  return entregas
    .filter((e) => e.estado === "pendiente")
    .map((e) => {
      const dias = diasRestantes(e.fecha_limite, hoy);
      return { id: e.id, dias, urgente: dias >= 0 && dias <= 7 };
    });
}
