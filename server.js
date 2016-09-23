//Lets require/import the HTTP module
var http = require('http'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    dir = require('node-dir'),
    fs = require('fs');
var app = express();

const PORT = process.env.PORT || 3005;

var hbs = exphbs.create({
    helpers: {
        grouped_each: function(every, context, options) {
            var out = "",
                subcontext = [],
                i;
            if (context && context.length > 0) {
                for (i = 0; i < context.length; i++) {
                    if (i > 0 && i % every === 0) {
                        out += options.fn(subcontext);

                        subcontext = [];
                    }
                    subcontext.push(context[i]);
                }
                out += options.fn(subcontext);
            }
            return out;
        }
    },
    defaultLayout: 'main'
});

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.use(express.static('static'));

app.get('/', function(req, res) {
    fs.readFile("models/news/news.json", function(err, data) {

        console.log(err);
        var json = JSON.parse(data);
        json["layout"] = "index";
        console.log(json);
        res.render('News', json);

    });

});

app.get('/Bio', function(req, res) {
    dir.files("static/img/bio", function(err, files) {
        var images = {};

        for (var img in files) {
            files[img] = files[img].substring(6);
            images.carousel = files;
        }
        images["page-title"] = "Bio";
        res.render('Bio', images);

    });

});
app.get('/Gallery', function(req, res) {

    subdirsPromise("static/img/gallery").then(filesPromise).then(function(data) {
        data["page-title"] = "Gallery";
        res.render('Gallery', data);
    });
});
app.get('/Resume', function(req, res) {
    res.render('Resume', { "page-title": "Resume" });
});
app.get('/News', function(req, res) {
    fs.readFile("models/news/news.json", function(err, data) {

        console.log(err);
        var json = JSON.parse(data);
        json["page-title"] = "Sara in the News";
        res.render('News', json);

    });
});
app.get('/Contact', function(req, res) {
    fs.readFile("models/contact/contact.json", function(err, data) {
        console.log(err);
        var json = JSON.parse(data);
        json["page-title"] = "Contact Sara";

        res.render('Contact', json);

    });

});

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});

function subdirsPromise(path) {
    promise = new Promise(function(resolve, reject) {
        dir.subdirs(path, function(err, data) {
            resolve(data);
        });
    });

    return promise;
}

function filesPromise(dirs) {
    promise = new Promise(function(resolve, reject) {
        var imgObj = {};
        imgObj.galleries = [];

        for (var folder in dirs) {
            var JSONData;
            dir.files(dirs[folder], function(err, files) {
                console.log("dir: " + dirs[folder]);

                var images = files.filter(function(file) {
                    return file.indexOf('.jpg' || '.png' || '.gif') !== -1;
                });
                for (var img in images) {
                    images[img] = images[img].substring(6);
                }
                console.log(images);

                var JSONPath = files.filter(function(file) {
                    return file.indexOf('.json') !== -1;
                })[0];
                filePromise = new Promise(function(resolve, reject) {
                    fs.readFile(JSONPath + '', function(err, data) {
                        JSONData = JSON.parse(data);
                        var galObj = {};
                        galObj.name = JSONData.name;
                        galObj.text = JSONData.text;
                        galObj.images = images;
                        resolve(galObj);

                    });
                });
                filePromise.then(function(data) {
                    imgObj.galleries.push(data);
                    resolve(imgObj);

                });

            });
        }
    });

    return promise;
}
