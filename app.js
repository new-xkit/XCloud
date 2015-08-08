"use strict";

var express = require('express');
var app = express();
var https = require('https');
var bodyParser = require('body-parser');
var fs = require('fs');
var AWS = require('aws-sdk');
var bcrypt = require('bcryptjs');
var uuid = require('node-uuid');
var auth = require('basic-auth');

var secureConfig = require('./secure_config.js');

var port = 443;
if(process.argv[2] !== undefined){
    port = process.argv[2];
}

//Setup Aws
AWS.config.region = 'us-west-2';

//Setup expressjs parsers

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));


app.use('/dist', express.static('dist'));
app.use('/dist/pages', express.static('dist/pages'));
//Load routes for v1 XCloud
var repo = require('./v1/aws-repo.js')(AWS, bcrypt, uuid);
var services = require('./v1/services.js')(repo);
require('./v1/routes-v1.js')(app, services, auth);

//Catchall for reverse engineering.
app.get('*', function(req, res){
    console.log('found url: ' + req.url);
    res.sendStatus(200);
});

app.post('*', function(req, res){
    console.log('found post: ' + req.url);
    res.sendStatus(201);
});

var options = {};

if(secureConfig.use_ssl){
    //Add SSL Info
    options.cert = fs.readFileSync(secureConfig.ssl_cert);
    options.key = fs.readFileSync(secureConfig.ssl_key) ;  
}

if(secureConfig.use_ssl){
    console.log("Starting secure server :" + port);
    https.createServer(options, app).listen(port);
} else {
    console.log("Starting server :" + port);
    app.listen(port);
}

