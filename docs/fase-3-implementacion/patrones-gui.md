# Patrones de GUI — Platzi Ruta

Fuente de verdad visual del prototipo. Tokens en `prototipo/design-tokens.json`.

## Principios
1. **Claridad antes que persuasión:** la información académica y de suscripción se muestra sin ambigüedad (Legal, UX Learning).
2. **Máximo 3 toques** a cualquier función clave (RNF-03).
3. **Una acción principal por pantalla** (botón verde).
4. **Coherencia con el ecosistema Platzi** (RNF-05): oscuro por defecto, acento verde.

## Componentes
| Componente | Uso | Reglas |
|---|---|---|
| Card | Agrupa una unidad de información | Radio 14, borde 1 px, padding 12 |
| Barra de progreso | Avance de ruta/curso | Alto 8, etiqueta de % siempre visible |
| Tag de estado | Completado / En curso / No iniciado / Pendiente | Texto + color (nunca solo color) |
| Botón primario | Acción principal | Verde, texto oscuro, ancho completo |
| Botón secundario | Acción alternativa | Contorno verde |
| Chip | Filtros y opciones | Radio completo; seleccionado = verde |
| Bottom nav | Navegación global | 4 destinos: Inicio, Calendario, Alertas, Expert |
| Bottom sheet | Simulador de renovación | Cierre explícito; nota legal visible |
| Nota legal | Textos de suscripción/datos | Borde izquierdo ámbar, tamaño 11-12 |

## Patrones de interacción
- **Alerta → detalle → decisión:** Notificación de vencimiento → Suscripción → Simulador (2-3 toques).
- **Próxima acción:** Inicio siempre ofrece "Retomar" (1 toque a la lección).
- **Urgencia:** entregas ≤ 7 días usan etiqueta ámbar con días restantes.

## Matriz de toques (RNF-03)
| Función | Toques desde Inicio |
|---|---|
| Retomar lección | 1 |
| Ver entrega límite | 1 (tarjeta) o 1 (tab Calendario) |
| Ver fecha de renovación | 1 (tab Expert) |
| Simular renovación | 2 |
| Ver certificación | 2 |
| Configurar recordatorios | 2 (Alertas) |

## Accesibilidad mínima
Contraste ≥ 4.5:1, objetivos táctiles ≥ 44 px, no depender solo del color, estados vacío/error/carga definidos.
