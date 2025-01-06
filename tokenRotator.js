const axios = require('axios');
require('dotenv').config();

const RENDER_API_KEY = process.env.RENDER_API_KEY;
const RENDER_SERVICE_ID = process.env.RENDER_SERVICE_ID;
const { v4: uuidv4 } = require('uuid');

const NEW_TOKEN = uuidv4();
const API_URL = `https://api.render.com/v1/services/${RENDER_SERVICE_ID}/env-vars/API_TOKEN`;

async function updateRenderEnvVar() {
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

    console.log('Variable de entorno API_TOKEN actualizada:', response.data);
  } catch (error) {
    console.error('Error al actualizar la variable de entorno:', error.response ? error.response.data : error.message);
  }
}

updateRenderEnvVar();