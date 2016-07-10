//Lets require/import the HTTP module
var http = require('http'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    fs = require('fs');
var app = express();
//Lets define a port we want to listen to
const PORT = 3005;

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('static'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/Bio', function(req, res) {
    res.render('Bio');
});
app.get('/Gallery', function(req, res) {
    fs.readdir("static/img", function(err, files) {
        res.render('Gallery', {
            "images": files
        });
        console.log(files);
    });

});
app.get('/Resume', function(req, res) {
    res.render('Resume');
});
app.get('/News', function(req, res) {
    res.render('News');
});
app.get('/Contact', function(req, res) {
    res.render('Contact');
});

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});
