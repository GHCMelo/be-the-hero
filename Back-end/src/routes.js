// Express é responsável pelas rotas
const express = require('express');

// Requisitar váriaveis dos controllers
const OngController = require('./controller/OngController');
const IncidentController = require('./controller/IncidentController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');

const routes = express.Router();

// Rota login
routes.post('/sessions', SessionController.create);

// Rotas ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

// Rota ong específica
routes.get('/profile', ProfileController.index);

// Rotas incidentes ongs
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

// exportar rotas
module.exports = routes;