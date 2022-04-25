const express = require('express');
const app = express();
const port = 5000;

var favicon = require('serve-favicon')
var path = require('path')

const home = require('./src/home/homeController.js');
app.use('/', home);

const client = require('./src/client/clientController.js');
app.use('/client', client);
app.use(express.static('./src/client'));

const light = require('./src/light/lightController.js');
app.use('/light', light);

app.use(favicon(path.join(__dirname, 'content', 'favicon.ico')))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});