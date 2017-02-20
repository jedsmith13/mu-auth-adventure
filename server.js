'use strict';

const stormpath = require('express-stormpath');
const customRoutes = require('./custom-routes');

let app = express();

app.use(stormpath.init(app));

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');

app.use(stormpath.loginRequired, customRoutes);