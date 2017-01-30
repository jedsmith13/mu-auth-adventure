var express = require('express');
var stormpath = require('express-stormpath');
var customRoutes = require('./custom-routes');

var app = express();

app.use(stormpath.init(app));

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');

app.use(stormpath.loginRequired, customRoutes);