var express = require('express');
var app = express();
app.listen(process.env.PORT_TEST || 3001, process.env.IP_TEST || '127.0.0.1');

var basicReply = (req, res) => {
    console.log(req);
    res.send('Successfully connected');
};

app.use(basicReply);