// Pruebas de integración del prototipo: el HTML es coherente con los datos ficticios
// y cumple la regla de máximo 3 toques (RNF-03).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { diasRestantes, textoRenovacion, proximaAlerta } from "../../../prototipo/logica/reglas-suscripcion.mjs";

const html = readFileSync("prototipo/prototipo-platzi-ruta.html", "utf8");
const texto = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
const datos = JSON.parse(readFileSync("datos-ficticios/suscripcion-notificaciones.json", "utf8"));
const calendario = JSON.parse(readFileSync("datos-ficticios/calendario.json", "utf8"));

// Fecha "hoy" del escenario del prototipo (semana del 15 al 21 de octubre).
const HOY = "2026-10-15";
const PANTALLAS = ["inicio", "curso", "calendario", "alertas", "suscripcion", "perfil"];

test("Existen las 6 pantallas del mapa de diseño", () => {
  for (const id of PANTALLAS) {
    assert.match(html, new RegExp(`<section class="scr[^"]*" id="${id}"`), `Falta la pantalla ${id}`);
  }
});

test("Todos los enlaces data-go apuntan a pantallas existentes", () => {
  const destinos = [...html.matchAll(/data-go="([^"]+)"/g)].map((m) => m[1]);
  for (const d of destinos) assert.ok(PANTALLAS.includes(d), `Destino inexistente: ${d}`);
});

test("RNF-03: toda pantalla se alcanza desde Inicio en máximo 3 toques", () => {
  // Grafo: la barra inferior está disponible en todas las pantallas; cada sección suma sus data-go.
  const nav = [...(html.match(/<nav>[\s\S]*?<\/nav>/)?.[0] ?? "").matchAll(/data-go="([^"]+)"/g)].map((m) => m[1]);
  const grafo = {};
  for (const m of html.matchAll(/<section class="scr[^"]*" id="([^"]+)">([\s\S]*?)<\/section>/g)) {
    grafo[m[1]] = new Set([...nav, ...[...m[2].matchAll(/data-go="([^"]+)"/g)].map((x) => x[1])]);
  }
  const toques = { inicio: 0 };
  const cola = ["inicio"];
  while (cola.length) {
    const actual = cola.shift();
    for (const sig of grafo[actual] ?? []) {
      if (!(sig in toques)) { toques[sig] = toques[actual] + 1; cola.push(sig); }
    }
  }
  for (const id of PANTALLAS) {
    assert.ok(toques[id] !== undefined && toques[id] <= 3, `${id}: ${toques[id] ?? "inalcanzable"} toques`);
  }
});

test("HU-12: la fecha de renovación del prototipo coincide con la suscripción", () => {
  const vence = datos.suscripcion.fecha_vencimiento;
  assert.ok(texto.includes(textoRenovacion(vence)), "La pantalla Suscripción no muestra la fecha exacta");
  assert.ok(texto.includes(`Faltan ${diasRestantes(vence, HOY)} días`), "Los días restantes no coinciden");
});

test("HU-08: la alerta de vencimiento muestra los días y la próxima alerta correctos", () => {
  const vence = datos.suscripcion.fecha_vencimiento;
  assert.ok(texto.includes(`vence en ${diasRestantes(vence, HOY)} días`));
  assert.equal(proximaAlerta(vence, HOY).fecha, "2026-11-12");
  assert.ok(texto.includes("Próxima alerta: 12 nov (a 30 días)"));
  for (const d of ["30 días", "15 días", "7 días", "1 día"]) assert.ok(texto.includes(d), `Falta umbral ${d}`);
});

test("HU-05: la entrega pendiente muestra los días restantes", () => {
  const entrega = calendario.entregas.find((e) => e.estado === "pendiente");
  assert.ok(texto.includes(`${diasRestantes(entrega.fecha_limite, HOY)} días`));
});
