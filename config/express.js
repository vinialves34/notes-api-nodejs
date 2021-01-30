const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const consign = require('consign');

module.exports = () => {
    const app = express();

    app.set('port', process.env.PORT || config.get('server.port'));

    app.use(bodyParser.json());

    // ENDPOINTS
    consign({cwd: 'api'})
        .then('Controllers')
        .then('Routes')
        .then('Models')
        .into(app);

    return app;
}