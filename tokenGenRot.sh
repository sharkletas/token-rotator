#!/bin/bash

# Cargar variables de entorno usando dotenv
node -e "require('dotenv').config()"

# Generar un nuevo token usando Node.js y la librería uuid
NEW_TOKEN=$(node -e "console.log(require('uuid').v4())")

# Función para actualizar la variable de entorno en una instancia de Render
update_render_env_var() {
    local service_id=$1
    curl -X PATCH \
         "https://api.render.com/v1/services/${service_id}/env-vars" \
         -H "Authorization: Bearer ${RENDER_API_KEY}" \
         -H "Content-Type: application/json" \
         -d '[
               {
                 "key": "API_TOKEN",
                 "value": "'${NEW_TOKEN}'",
                 "scope": "deploy"
               }
             ]'
}

# Actualizar la variable de entorno en la instancia principal de Render
echo "Actualizando API_TOKEN en la instancia principal de Render..."
update_render_env_var "$RENDER_SERVICE_ID"

# Actualizar la variable de entorno en la instancia del cron job en Render
echo "Actualizando API_TOKEN en la instancia del cron job en Render..."
update_render_env_var "$RENDER_CRON_JOB_SERVICE_ID"