# 🎮 NEXUS.OS — PS4 Web OS Simulator

NEXUS.OS es una recreación web de una interfaz de consola, desarrollada con HTML, CSS y JavaScript vanilla. No es un emulador de PlayStation ni ejecuta juegos comerciales de PS4.

## Funciones
- Arranque animado, perfiles locales y dashboard estilo XMB.
- Navegación por teclado, táctil y Gamepad API.
- Aplicaciones y juegos HTML propios.
- NEXUS GameScript Studio 1.0 con lenguaje PlayScript declarativo e intérprete limitado.
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

## Recursos locales y compatibilidad
El dashboard y NEXUS Store usan `assets/css/nexus-ui.css`; no dependen del CDN de Tailwind. El iframe de aplicaciones limita permisos a pantalla completa y gamepad cuando están disponibles. NEXUS.OS no intenta desactivar ni eludir bloqueadores de contenido; si una extensión bloquea un recurso legítimo, revisa sus avisos o permite ese recurso manualmente.

## PWA / modo offline
El service worker se registra al entrar al dashboard y almacena páginas y recursos principales. La primera visita debe hacerse online para instalar la caché. Algunas páginas y estilos externos pueden necesitar conexión.

## Controles
- Flechas: moverse por el menú.
- Enter: abrir.
- Escape: salir de la aplicación.
- Gamepad: navegación básica cuando el navegador expone la Gamepad API.

## Desarrollo
HTML5, CSS3, JavaScript vanilla, Web Audio API, localStorage, BroadcastChannel, WebRTC y Service Worker.

## NEXUS GameScript Studio 1.0
El lenguaje NEXUS PlayScript permite crear mini-juegos con comandos limitados (`GAME`, `BG`, `RECT`, `CIRCLE`, `TEXT`, `PLAYER`, `GOAL`, `SPEED`). No acepta JavaScript arbitrario, eval ni acceso a red o archivos. El código se valida con límites de tamaño, líneas, objetos, colores y coordenadas; la vista previa corre en un iframe `sandbox` sin `allow-same-origin` y con CSP restrictiva. Es un prototipo educativo, no un entorno para ejecutar HTML/JS de terceros.

## PS4TCHA 1.0
Prototipo de desafío visual ejecutado en el cliente. No es una barrera de seguridad real ni sustituye validación en servidor. PS4TCHA es independiente del motor PlayScript.
