const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const dotenv = require('dotenv');

module.exports = () => {
    const app = express();
    dotenv.config();
    app.set('port', process.env.HOST_PORT);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // ENDPOINTS
    consign({cwd: 'api'})
        .then('Security')
        .then('Helpers')
        .then('Models')
        .then('Controllers')
        .then('Routes')
        .into(app);

    return app;
}