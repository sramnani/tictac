// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express

// configuration =================
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");