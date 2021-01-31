const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const consign = require('consign');

module.exports = () => {
    const app = express();

    app.set('port', process.env.PORT || config.get('server.port'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // ENDPOINTS
    consign({cwd: 'api'})
        .then('Helpers')
        .then('Models')
        .then('Controllers')
        .then('Routes')
        .into(app);

    return app;
}