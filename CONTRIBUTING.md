# Guía de contribución

Aplica a todo el equipo. El repositorio contiene documentación, prototipo navegable y datos ficticios (sin código de producción).

## 1. Estándares
| Regla | Cómo se hace cumplir |
|---|---|
| Vocabulario único: nombres del modelo conceptual (Estudiante, Suscripcion, Progreso, Entrega…) y de las pantallas del mapa de diseño | Glosario abajo; el revisor verifica nombres en cada PR |
| Formato uniforme: UTF-8, LF, 2 espacios, sin espacios sobrantes | `.editorconfig` + formateador al guardar |
| Archivos en kebab-case; estructura fija `docs/`, `prototipo/`, `datos-ficticios/` | Revisión en PR |
| Solo datos ficticios o anonimizados; nunca datos personales reales, claves ni credenciales (RNF-02, R-09) | Checklist de PR |
| Textos de beneficios/suscripción solo desde `docs/guia-contenido-legal/` (RNF-04, HU-13) | CODEOWNERS: aprueba Juan Sebastián |
| Comentarios mínimos: explicar el porqué; la deuda lleva ticket; nada "comentado por si acaso" | Etiquetas `nit` (menor) y `blocker` (obligatorio) en la revisión |
| Definition of Done: formato correcto, PR con descripción y enlace a la HU, 1 aprobación mínima | Plantilla de PR; protección de `main` |

Adopción gradual: semanas 1-2 formateador + EditorConfig; semanas 3-4 linter/CI en advertencia y luego error; después, reglas de estructura.

## 2. Flujo Git
- **Modelo:** trunk-based simplificado. `main` siempre estable; ramas cortas (máx. 2-3 días).
- **Ramas:** `feat/`, `fix/`, `chore/`, `docs/`, `hotfix/` + ID de historia, minúsculas con guiones. Ej.: `feat/HU-08-alertas-vencimiento`.
- **Commits:** pequeños y atómicos, Conventional Commits en imperativo, con referencia a la HU. Prohibido "WIP" o "arreglos".
  Ej.: `feat(notificaciones): agregar alertas a 30/15/7/1 días (HU-08)`
- **Pull Request:** una intención por PR, idealmente < ~400 líneas útiles; qué/por qué/cómo probar; capturas si hay UI; checklist de la DoD.
- **Merge:** única estrategia: **squash merge**, rama borrada después.
- **Protección de `main`:** sin push directo ni force push; PR obligatorio; ≥1 aprobación; conversaciones resueltas; CODEOWNERS en textos legales.
- **Sincronización:** actualizar la rama con `main` a diario y antes de abrir el PR; conflictos se resuelven localmente.

## 3. Cambios en paralelo (Sprint 1)
HU-08 (Nicolás, `feat/HU-08-alertas-vencimiento`) y HU-12 (Diego, `feat/HU-12-fecha-renovacion`) comparten datos de `Suscripcion`.
1. Se aprueba primero un PR pequeño `chore/datos-suscripcion`; ambas ramas parten de ahí.
2. Orden de merge: primero HU-12, luego HU-08. Quien mergea segundo actualiza su rama, resuelve conflictos y avisa en el PR.
3. Cada PR lo revisa el autor del otro cambio.

## 4. Releases
SemVer con tags anotados sobre `main`: `v1.0.0` cierre Sprint 1 (MVP); `v1.1.0` Sprint 2 (compatible); `v2.0.0` solo con cambio incompatible.
Hotfix: `hotfix/…` desde el tag, PR acelerado (1 aprobación), tag de parche (`v1.0.1`) y volver a `main`.
Trazabilidad: HU → rama → PR → tag. CHANGELOG desde los commits; notas del release al canal y al cliente.

## 5. Onboarding (30 min, sin codear)
1. Leer README y CONTRIBUTING; unirse al canal.
2. Clonar y abrir el prototipo y los datos ficticios.
3. Crear rama `docs/` con un cambio trivial y commit con el formato acordado.
4. Abrir PR de prueba con la plantilla.
5. Recibir revisión y simular el squash merge; confirmar borrado de la rama.

## Glosario de nombres
Estudiante, RutaAprendizaje, Curso, Progreso, ClaseEnVivo, Entrega, Evaluacion, Suscripcion, Notificacion, Certificacion.
Pantallas: Inicio, Detalle de curso, Calendario, Notificaciones, Suscripción, Perfil.
