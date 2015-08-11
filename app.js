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
var path = require('path');

var secureConfig = require('./secure_config.js');

var port = 443;
if(process.argv[2] !== undefined){
    port = process.argv[2];
}

//Setup Aws
AWS.config.region = 'us-west-2';

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));


app.use("/", express.static('public'));



//Load routes for v1 XCloud
var repo = require('./v1/aws-repo.js')(AWS, bcrypt, uuid);
//var repo = require('./v1/mock-repo.js')();
var services = require('./v1/services.js')(repo);
require('./v1/routes-v1.js')(app, services, auth);

//Catchall for reverse engineering.
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname + "/public/index.html"));
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

