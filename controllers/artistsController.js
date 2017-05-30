var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

module.exports = function(app){
app.get('/', (req, res) =>{
	res.render('index')
})
app.get('/media', (req, res) =>{
	res.render('media')
})

};