#!/usr/bin/env node

var express = require('express');

var app = express();
app.configure(function() {
  app.use(app.router);
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/public'))
});


app.get('/', function(req, res) {
  res.render('home', {layout : true});
});

app.listen(4000);
