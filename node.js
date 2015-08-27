/**
 * Created by charles on 8/13/2015.
 *
 * This file will never run in production.  This is just for local development as this will run on a server in production.
 */
var express = require('express');
var app = express();
var path = require('path');

var port = 8551;
if(process.argv[2] !== undefined){
    port = process.argv[2];
}

app.use("/", express.static(__dirname + ''));

//Catchall for reverse engineering.
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});


console.log("Starting server :" + port);
app.listen(port);