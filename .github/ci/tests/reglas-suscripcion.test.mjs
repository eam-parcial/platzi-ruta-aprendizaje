// Pruebas unitarias: umbrales 30/15/7/1 (HU-08), días restantes y fecha de renovación (HU-12),
// contador de entregas (HU-05).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  UMBRALES_ALERTA, diasRestantes, fechasAlertas, proximaAlerta, textoRenovacion, entregasPendientes,
} from "../../../prototipo/logica/reglas-suscripcion.mjs";

const VENCE = "2026-12-12";

test("HU-08: los umbrales de alerta son 30, 15, 7 y 1 días", () => {
  assert.deepEqual(UMBRALES_ALERTA, [30, 15, 7, 1]);
});

test("HU-08: las alertas se programan en las fechas correctas", () => {
  assert.deepEqual(fechasAlertas(VENCE), [
    { dias: 30, fecha: "2026-11-12" },
    { dias: 15, fecha: "2026-11-27" },
    { dias: 7, fecha: "2026-12-05" },
    { dias: 1, fecha: "2026-12-11" },
  ]);
});

test("HU-08: la próxima alerta depende de los días que faltan", () => {
  assert.equal(proximaAlerta(VENCE, "2026-10-15").dias, 30);
  assert.equal(proximaAlerta(VENCE, "2026-11-20").dias, 15);
  assert.equal(proximaAlerta(VENCE, "2026-12-10").dias, 1);
  assert.equal(proximaAlerta(VENCE, "2026-12-12"), null);
});

test("HU-12: días restantes para la renovación", () => {
  assert.equal(diasRestantes(VENCE, "2026-10-15"), 58);
  assert.equal(diasRestantes(VENCE, "2026-12-12"), 0);
  assert.equal(diasRestantes(VENCE, "2026-12-13"), -1);
});

test("HU-12: el texto de renovación usa la fecha exacta", () => {
  assert.equal(textoRenovacion(VENCE), "Se renueva el 12 de diciembre de 2026");
});

test("HU-12: una fecha inválida se rechaza", () => {
  assert.throws(() => diasRestantes("no-es-fecha", "2026-10-15"), /Fecha inválida/);
});

test("HU-05: cuenta entregas pendientes y marca las urgentes (≤ 7 días)", () => {
  const entregas = [
    { id: "a", estado: "pendiente", fecha_limite: "2026-10-21T23:59" },
    { id: "b", estado: "pendiente", fecha_limite: "2026-11-30T23:59" },
    { id: "c", estado: "entregada", fecha_limite: "2026-10-16T23:59" },
  ];
  assert.deepEqual(entregasPendientes(entregas, "2026-10-15"), [
    { id: "a", dias: 6, urgente: true },
    { id: "b", dias: 46, urgente: false },
  ]);
});
