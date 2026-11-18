# 🎮 PS4 Web OS Simulator — NEXUS.OS

Un simulador web de consola inspirado en interfaces XMB, construido con HTML, CSS y JavaScript.

## Funciones
- Pantalla de inicio animada con logo SVG y comprobación de recursos del sistema.
- Perfiles locales: crear, seleccionar y cambiar usuario.
- Dashboard XMB con navegación por teclado, móvil y gamepad.
- Transición de carga estilo **PS4 LOADING** al abrir aplicaciones: oscurece la pantalla, muestra barra de progreso y el recurso que se está preparando.
- NEXUS Blank: pantalla about:blank personalizada, color de fondo y navegación a páginas web compatibles con iframe.
- Efectos de audio sintetizados y controles de sonido/volumen en Ajustes.
- NEXUS Store y juegos originales integrados en pantalla completa.

## Inicio
Abre el sitio desde index.html. En el primer inicio se muestra setup.html; después podrás elegir un perfil en login.html.

Los perfiles y preferencias se guardan en el almacenamiento local del navegador. No se sincronizan entre dispositivos.

## Controles
- Flechas izquierda/derecha: moverse por el menú.
- Enter: abrir.
- Escape: cerrar la aplicación (en páginas embebidas que cooperen con el mensaje de salida).
- Gamepad: navegación básica cuando el navegador expone la Gamepad API.

## Nota sobre la carga
La barra de inicio comprueba los recursos locales del sistema. La transición de aplicaciones usa un progreso visual estimado y el evento de carga del iframe; las páginas externas pueden bloquear la inserción mediante sus propias políticas de seguridad.

## Desarrollo
Tecnologías: HTML5, CSS3, JavaScript vanilla y Web Audio API.

## PS4TCHA (prototipo)
- Página independiente de demostración: `ps4tcha.html`.
- Estilos: `assets/css/ps4tcha.css`.
- Motor del desafío y evaluación básica de señales de automatización: `assets/js/ps4tcha.js`.
- Se integra en el inicio, selección de perfil, creación de perfil y dashboard.
- Si detecta señales fuertes (por ejemplo, `navigator.webdriver` o un agente de automatización), muestra un reto visual de selección de símbolos.
- Una verificación superada se conserva en la pestaña durante 10 minutos.

**Limitación de seguridad:** esta primera versión es un prototipo de interfaz y detección del lado del navegador. El reto y su comprobación se ejecutan en el cliente, por lo que un bot avanzado puede inspeccionarlos o saltárselos. No protege por sí solo formularios, cuentas ni datos. Para usarlo como protección real, la siguiente fase debe emitir desafíos y validar respuestas en un backend, con tokens firmados de un solo uso, caducidad y límites de intentos. PS4TCHA no bloquea F12 ni intenta luchar contra las herramientas de desarrollo.
