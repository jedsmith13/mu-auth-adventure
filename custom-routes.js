var http = require('http');
var configRoutes = require('./config-routes');

// Removes the first section of the url (the route selector) so the rest can be passed to the new server.
var getBaseUrl = (url) => {
    return url.split('/')[1];
};

// Removes the first section of the url (the route selector) so the rest can be passed to the new server.
var removeBaseUrl = (url) => {
    return '/' + url.split('/').splice(2).join('/');
};

var customRoutes = (originalReq, originalRes) => {
    var baseUrl = getBaseUrl(originalReq.url);
    console.log('Configured Routes:', configRoutes);
    console.log('Base URL:', baseUrl);
    
    var baseRoute = configRoutes[baseUrl];
    if (baseRoute) {
        var path = removeBaseUrl(originalReq.url);
        var options = {
            hostname: baseRoute.hostname,
            port: baseRoute.port,
            path: path,
            method: originalReq.method,
            
        };
        
        var req = http.request(options, (res) => {
          res.pipe(originalRes);
        });
        
        req.on('error', (e) => {
          console.error(e);
        });
        
        // Include the body
        var postData = originalReq.body;
        if (postData) {
            req.write(postData);
        }
        
        req.end();
    } else {
        originalRes.send(404);
    }
    
};

module.exports = customRoutes;