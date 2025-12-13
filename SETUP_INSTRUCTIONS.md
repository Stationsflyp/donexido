# Setup Instructions

## Important: Environment Variables

Este proyecto requiere variables de entorno para funcionar correctamente. Las variables de entorno solo se cargan cuando el servidor de desarrollo arranca.

### Pasos para configurar:

1. **Verifica que el archivo `.env.local` existe** en la raíz del proyecto con el siguiente contenido:

\`\`\`env
# Discord OAuth Configuration
DISCORD_CLIENT_ID=1449186590814507019
DISCORD_CLIENT_SECRET=Ns0IOV_mg2qre8Z8aE2JPZS33Tb5JcuD

# For local development
NEXT_PUBLIC_DISCORD_CLIENT_ID=1449186590814507019
NEXT_PUBLIC_DISCORD_REDIRECT_URI=http://localhost:3000/auth/callback

# API Configuration
NEXT_PUBLIC_API_URL=http://0.0.0.0:8080
\`\`\`

2. **Reinicia el servidor de desarrollo:**
   - Detén el servidor (Ctrl+C)
   - Ejecuta: `npm run dev`

3. **Si sigues viendo errores de "undefined":**
   - Borra la carpeta `.next` (caché de Next.js)
   - Ejecuta nuevamente: `npm run dev`

## Discord OAuth Configuration

El redirect URI debe coincidir exactamente con lo configurado en Discord Developer Portal:
- Discord Redirect URI: `http://localhost:3000/auth/callback`
- Client ID: `1449186590814507019`

## API Backend

Asegúrate de que el backend FastAPI esté corriendo en `http://0.0.0.0:8080`
