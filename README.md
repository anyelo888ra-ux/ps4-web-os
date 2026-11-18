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
