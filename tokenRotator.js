const axios = require('axios');
require('dotenv').config();

// Cambiamos el nombre de la variable para el backend
const RENDER_API_KEY = process.env.RENDER_API_KEY;
const BACKEND_SERVICE_ID = process.env.BACKEND_SERVICE_ID; // Nueva variable para el backend
const { v4: uuidv4 } = require('uuid');

const NEW_TOKEN = uuidv4();
// Actualizamos la URL para usar BACKEND_SERVICE_ID
const API_URL = `https://api.render.com/v1/services/${BACKEND_SERVICE_ID}/env-vars/API_TOKEN`;

async function updateRenderEnvVar() {
  console.log('Comenzando la actualización de la variable de entorno...');
  console.log('RENDER_API_KEY:', RENDER_API_KEY ? 'está configurada' : 'no está configurada');
  console.log('BACKEND_SERVICE_ID:', BACKEND_SERVICE_ID);
  console.log('Nuevo Token generado:', NEW_TOKEN);
  console.log('URL de la Solicitud:', API_URL);

  try {
    const response = await axios.put(API_URL, {
      value: NEW_TOKEN
    }, {
      headers: {
        'Authorization': `Bearer ${RENDER_API_KEY}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    console.log('Respuesta de la solicitud HTTP:', JSON.stringify(response.data, null, 2));
    console.log('Variable de entorno API_TOKEN actualizada con éxito.');
  } catch (error) {
    console.error('Error al actualizar la variable de entorno:');
    if (error.response) {
      console.error('Código de estado:', error.response.status);
      console.error('Datos de la respuesta:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('La solicitud fue hecha pero no se recibió respuesta:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    console.error('Configuración de la solicitud:', JSON.stringify(error.config, null, 2));
  }
}

updateRenderEnvVar();