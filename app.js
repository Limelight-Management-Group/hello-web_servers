const express = require('express');
let ejs = require('ejs')
let bodyParser = require('body-parser');
let path = require('path')


let app = express();
require('./controllers/artistsController')(app)

// set up template
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static files using express static
app.use(express.static(path.join(__dirname, './public/')));

var port = process.env.PORT || 3001


// listen to port
app.listen(port, function() {
console.log('Hello, web_servers is LIVE on port: ' + port);
});