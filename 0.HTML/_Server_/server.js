var path = require('path');
var stringify = require('node-stringify');
var bodyParser = require('body-parser');
var fs = require('fs');
var express = require("express");
var app = express();
var data = "";

app.use(bodyParser.urlencoded({ extended: true }));

/* serves main page */
app.get('/form.html', function(req, res){
  fs.readFile(__dirname + '/www/form.html', function(error, content) {
    if (error) {
      res.send(error);
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end("<hr>"+data, 'utf-8');
    }
  });
  // res.sendFile(path.join(__dirname, "/www/form.html"));
});

app.post("/form", function(req, res) { 
  console.log(req.body);
  data = data + stringify(req.body) + "<br>";
  res.status(200).send('<html><body></body><script type="text/javascript">window.location.href="form.html";</script></html>');
});

app.use(express.static('www'));
app.use('/content', express.static('www'))

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});