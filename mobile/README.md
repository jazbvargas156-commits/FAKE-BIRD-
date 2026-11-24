# Fake Bird Mobile — 0.1.0
Aplicación de escritura ficticia, independiente de la web existente.

## Probar solo con iPhone usando Codespaces
1. Abrir el repositorio en GitHub desde Safari e iniciar sesión.
2. Code > Codespaces > Create codespace on main (máquina de 2 núcleos). Revisar la cuota antes de crear.
3. Esperar a que termine postCreateCommand (instalación de dependencias y pruebas).
4. En la terminal: cd mobile && npm run start:tunnel
5. Abrir la URL exp:// que muestre Expo CLI en Expo Go compatible con SDK 58. Si Expo exige login, usar npx expo login con tu propia cuenta desde la terminal privada. No compartir credenciales.
6. Al terminar, detener el servidor y el codespace desde github.com/codespaces para no consumir cuota. La app de prueba necesita el servidor activo para cargar el código.

## Prueba local alternativa
Node.js 22 LTS o superior, carpeta mobile: npm install, npm run check, npm test, npm start.

## Alcance
Timeline de raíces, perfiles, publicaciones, respuestas anidadas, fotos locales, búsqueda y estadísticas ficticias. SQLite confirma escrituras antes de mostrarlas guardadas; imágenes en documentos de la app, sin servidor de contenido ni analítica propia.
## Pendiente
Migración de la web, varios proyectos, capturas exportables, chats, modo oscuro y respaldo automático cifrado. Desinstalar o perder el dispositivo aún puede ocasionar pérdida de datos. No usar historias importantes en la prueba. Expo Go solo para desarrollo.
## Validación
SDK 58: versiones alineadas con bundledNativeModules.json de la rama sdk-58 de Expo. Instalación, expo-doctor y prueba física pendientes.
