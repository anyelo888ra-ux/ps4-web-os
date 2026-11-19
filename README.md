# 🎮 NEXUS.OS — PS4 Web OS Simulator

NEXUS.OS es una recreación web de una interfaz de consola, desarrollada con HTML, CSS y JavaScript vanilla. No es un emulador de PlayStation ni ejecuta juegos comerciales de PS4.

## Funciones
- Arranque animado, perfiles locales y dashboard estilo XMB.
- Navegación por teclado, táctil y Gamepad API.
- Aplicaciones y juegos HTML propios.
- NEXUS Store con publicación local e importación/exportación de juegos como archivos `.nexusgame`.
- Centro de trofeos y emblemas por perfil.
- Respaldo/restauración JSON de perfiles, juegos, preferencias, trofeos e identificadores.
- NEXUS Share con ID permanente por perfil y rutas `/console/shared-screen/:id` y `/console/controlling-sim/:id`.
- PWA con caché de páginas y recursos principales para uso offline.

## Inicio
Abre `index.html`. En el primer inicio se muestra `setup.html`; después podrás elegir un perfil en `login.html`.

## Compartir pantalla y control remoto
- En el mismo navegador/dispositivo se usa `BroadcastChannel`.
- Entre dispositivos se usa WebRTC con intercambio manual de oferta y respuesta JSON. No se necesita una base de datos ni servidor de señalización, pero el enlace por sí solo no realiza el emparejamiento.
- El emisor debe conceder permiso de captura de pantalla. Se requiere HTTPS y un navegador compatible.
- La conexión directa puede depender de NAT y de la red; no se garantiza que todas las redes permitan conexión P2P.
- El control se limita a enviar teclas a la interfaz NEXUS.OS; no controla el sistema operativo del dispositivo.
- Comparte los códigos de emparejamiento solo con personas de confianza.

## Respaldo y almacenamiento
Los datos se guardan localmente en el navegador. Usa Ajustes → Respaldo JSON para descargar una copia fuera del navegador. La importación crea primero una copia del estado actual. No borres los datos del navegador hasta verificar el archivo de respaldo.

## PWA / modo offline
El service worker se registra al entrar al dashboard y almacena páginas y recursos principales. La primera visita debe hacerse online para instalar la caché. Algunas páginas y estilos externos pueden necesitar conexión.

## Controles
- Flechas: moverse por el menú.
- Enter: abrir.
- Escape: salir de la aplicación.
- Gamepad: navegación básica cuando el navegador expone la Gamepad API.

## Desarrollo
HTML5, CSS3, JavaScript vanilla, Web Audio API, localStorage, BroadcastChannel, WebRTC y Service Worker.

## PS4TCHA
Prototipo de desafío visual ejecutado en el cliente. No es una barrera de seguridad real ni sustituye validación en servidor.
