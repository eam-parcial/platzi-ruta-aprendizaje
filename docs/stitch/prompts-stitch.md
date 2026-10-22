# Prompts para Google Stitch

Orden recomendado: 1) pegar el prompt de sistema; 2) generar cada pantalla con su prompt; 3) exportar a `prototipo/stitch-exports/`; 4) enlazar pantallas en modo prototipo (tap → destino) y registrar la revisión de GUI.

## Prompt de sistema (design system)

Design a mobile app (iOS/Android, 390x844) called "Platzi Ruta", a companion app to Platzi's online learning platform. Dark theme: background #0A0E17, cards #111827 with 1px #1F2937 border, primary green #00E58A (button text #04210F), warning amber #FBBF24, text #F3F6FB, muted text #8B95A7. Font: clean sans-serif (Inter or Roboto). Card radius 14px, buttons radius 10px, chips fully rounded. Minimum touch target 44px. Bottom navigation with 4 tabs: Inicio, Calendario, Alertas, Expert; a profile avatar (initials CR) at the top right of Inicio. All UI text in Spanish. Use only fictitious data (student: Camila Rojas). Never show prices, discounts or real benefit claims: any subscription text must include the note "Texto sujeto a validación de Legal". Every key function must be reachable in 3 taps or fewer.

## Pantalla 1 — Inicio / Resumen de progreso (HU-01, HU-05, HU-09, HU-12, HU-15)

Home screen. Greeting "Hola, Camila". Top card "Continúa: Closures en JavaScript" (JavaScript Avanzado, lección 7 de 12) with a green button "Retomar clase". Amber card "Proyecto final · JavaScript Avanzado — 6 días, entrega mié 21 oct". Section "Mis rutas activas": two cards with progress bars: "Ruta de Desarrollo Web 62%" (5 de 8 cursos) and "Ruta de Análisis de Datos 18%" (1 de 6 cursos). A habit tip card: "Llevas 5 días sin avanzar en tu ruta. Con 20 minutos hoy retomas el ritmo." A subscription card "Platzi Expert · Activa · Vence en 58 días (12 dic 2026)". A small card "Siguiente curso en tu ruta: Testing con JavaScript".

## Pantalla 2 — Detalle de curso / ruta (HU-02, HU-03)

Route detail screen "Ruta de Desarrollo Web" with overall progress bar 62%. List of courses with status tags: "Fundamentos de HTML y CSS" Completado, "JavaScript Básico" Completado, "JavaScript Avanzado" En curso (58%, lección 7 de 12, 1 proyecto, 1 quiz pendiente, button "Retomar lección"), "Testing con JavaScript" No iniciado. Section "Certificaciones": card "Fundamentos de HTML y CSS — Emitido 03 jun 2026 — ID de validación DEMO-0001-HTML". Footer note about demo data.

## Pantalla 3 — Calendario / Plan de estudios (HU-04, HU-05, HU-06)

Study plan screen for the week 15–21 October. Filter chips: Todo, Platzi Live, Entregas, Evaluaciones. Items grouped by day: Jue 15 "Quiz: Closures" (Evaluación, 20 min, Pendiente); Vie 16 "Platzi Live: Arquitectura de componentes" 7:00 p. m.; Mar 20 "Platzi Live: Preguntas de Testing" 7:00 p. m.; Mié 21 "Entrega: Proyecto final JS Avanzado" with amber "6 días" badge and deadline 11:59 p. m. Secondary button "Activar recordatorio de estudio".

## Pantalla 4 — Notificaciones (HU-07, HU-08, HU-09)

Notifications screen. Cards: amber "Tu Platzi Expert vence en 58 días. Próxima alerta: 12 nov (a 30 días)"; "Platzi Live mañana 7:00 p. m."; "Tienes pendiente el quiz de Closures"; habit message. Settings section: dropdown "Recordatorios de estudio" (Diario / 3 veces por semana / Semanal / Desactivado) and chips for expiry alerts 30, 15, 7 and 1 días (all selected).

## Pantalla 5 — Suscripción / Platzi Expert (HU-10, HU-11, HU-12)

Subscription screen. Status card "Estado: Activa — Se renueva el 12 de diciembre de 2026 — Faltan 58 días". Table "¿Qué incluye cada cosa?" comparing Platzi Expert vs Platzi Live (rows: Cursos y rutas, Certificaciones, Clases en vivo). Primary button "Simular renovación anticipada" that opens a bottom sheet with two options ("Renovar ahora" / "Renovar al vencer") and a bullet list of continuity benefits, no prices. Legal note at the bottom: "Esta pantalla no modifica precios ni beneficios reales. Texto sujeto a validación de Legal."

## Pantalla 6 — Perfil / Cuenta (HU-03, HU-14)

Profile screen. "Camila Rojas (ficticia)", camila.demo@ejemplo.com, "Learner desde ene 2025". Row "Certificaciones: 1 certificación, ver historial". Privacy card explaining that progress data is used only to show the route and send reminders, mentioning Habeas Data (Ley 1581/2012) and RGPD, with button "Gestionar permisos de notificación".

