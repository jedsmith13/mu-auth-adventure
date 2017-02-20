var express = require('express');
var customRoutes = require('../custom-routes.js');

var app = express();

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');

app.use(customRoutes);

module.exports = app;