# Fake Bird Mobile — 0.1.0
Aplicación de escritura ficticia, independiente de la web existente.
## Prueba en Windows y iPhone
Instalar Node.js 22 LTS y Expo Go desde App Store. Descargar el ZIP del repositorio, descomprimirlo y abrir PowerShell en mobile. Ejecutar npm install, npx expo install --fix y npx expo start. Con ambos dispositivos en la misma Wi-Fi, escanear el QR con Cámara. Si no se conecta, probar npx expo start --tunnel. Verificar que Expo Go sea compatible con SDK 54. Esta es una prueba, no un binario independiente.
## Alcance
Timeline de raíces, perfiles, publicaciones, respuestas anidadas, fotos locales, búsqueda y estadísticas ficticias. SQLite confirma escrituras antes de mostrarlas guardadas; imágenes en documentos de la app, sin servidor de contenido ni analítica propia.
## Pendiente
Migración de la web, varios proyectos, capturas exportables, chats, modo oscuro y respaldo automático cifrado. Desinstalar o perder el dispositivo aún puede ocasionar pérdida de datos. No usar historias importantes en la prueba. Expo Go solo para desarrollo.
## Validación
npm test (lógica de dominio); npx expo-doctor@latest (dependencias); prueba física pendiente.
