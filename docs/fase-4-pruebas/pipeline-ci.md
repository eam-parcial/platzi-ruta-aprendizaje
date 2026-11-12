# Pipeline de pruebas (CI) — Parte A del Taller de Implantación

Workflow: `.github/workflows/ci.yml` (GitHub Actions). Scripts: `.github/ci/`. Sin dependencias externas (Node 22).

## Cuándo se dispara (A.1)
| Evento | Para qué |
|---|---|
| PR hacia `main` | Validar antes del merge (el check debe quedar en verde) |
| Push a `main` (squash merge) | Generar artefacto candidato a release |
| Tag `v*.*.*` | Release oficial con el artefacto adjunto |
| Programado (05:00 UTC) | Reconciliar datos ficticios contra el modelo conceptual |
| Manual | Hotfix |

## Etapas (A.2) y gates (A.3)
| # | Etapa | Script | Gate |
|---|---|---|---|
| 1 | Checkout + Node 22 | — | — |
| 2 | Formato y estructura (EditorConfig, kebab-case, carpetas) | `validar-formato.mjs` | Errores bloquean; kebab-case es aviso (adopción gradual) |
| 3 | Build: export del prototipo | — | — |
| 4 | Pruebas unitarias (HU-08, HU-12, HU-05) | `tests/reglas-suscripcion.test.mjs` | G1 pruebas |
| 4 | Pruebas de integración del prototipo (6 pantallas, máx. 3 toques, fechas vs. datos) | `tests/prototipo.test.mjs` | G1 pruebas |
| 4 | Cobertura de `prototipo/logica/` | `--test-coverage-lines=70` | G2 cobertura ≥ 70 % |
| 4 | Datos ficticios vs. modelo conceptual | `validar-datos-ficticios.mjs` | G1 |
| 5 | Datos personales reales | `gate-pii.mjs` | G3 datos |
| 5 | Textos de beneficios vs. guía de Legal, sin precios | `gate-textos-legales.mjs` | G4 contenido legal |
| 6 | Empaquetar `ruta-aprendizaje-<versión>-<sha>.zip` | — | — |
| 7 | Publicar artefacto (y release si hay tag) | — | — |

G5 (dependencias): no aplica todavía, el repositorio no tiene dependencias. G6 (revisión): la hace cumplir la protección de `main` y CODEOWNERS.

## Correr en local
```bash
node .github/ci/validar-formato.mjs
node --test --experimental-test-coverage --test-coverage-include="prototipo/logica/**" --test-coverage-lines=70 ".github/ci/tests/*.test.mjs"
node .github/ci/validar-datos-ficticios.mjs
node .github/ci/gate-pii.mjs
node .github/ci/gate-textos-legales.mjs
```

## Alcance
El proyecto no tiene backend (RNF-01). Las pruebas unitarias corren sobre `prototipo/logica/reglas-suscripcion.mjs`, que describe las reglas que el prototipo muestra (umbrales 30/15/7/1, días restantes, fecha de renovación, entregas urgentes). Las pruebas de integración leen el HTML del prototipo y los JSON de datos ficticios.
