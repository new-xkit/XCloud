/**
 * Endpoints for AWS Lambda
 * Created by Chuck on 2015-08-18.
 */

"use strict";

var AWS = require('aws-sdk');
var bcrypt = require('bcrypt');
var uuid = require('node-uuid');
var auth = require('basic-auth');

//Load routes for v1 XCloud
var repo = require('./v1/aws-repo.js')(AWS, bcrypt, uuid);
//var repo = require('./v1/mock-repo.js')();
var services = require('./v1/services.js')(repo);


exports.fetch = function(event, context) {
    var authorization = auth(event);
    if(! authorization){
        authorization = {name:null, pass: null}
    }

    var username = authorization.name;
    var password = authorization.pass;

    services.fetchPreferences(username, password, function(err, data){
        if(err){
            context.succeed(err);
        } else {
            context.succeed(data);
        }
    });
};


exports.upload = function(event, context) {
    var authorization = auth(event);
    if(! authorization){
        authorization = {name:null, pass: null}
    }

    var username = authorization.name;
    var password = authorization.pass;
    var data = event.data === undefined ? null : event.data;

    services.storePreferences(username, password, data, function(err, success){
        if(err || success === false){
            context.succeed(err);
        } else {
            context.succeed({"errors": "false"});
        }
    });
};


exports.auth = function(event, context) {
    var authorization = auth(event);
    if(! authorization){
        authorization = {name:null, pass: null}
    }

    var username = authorization.name;
    var password = authorization.pass;

    services.loginUser(username, password, function(err, success){
        if(err || success === false){
            context.succeed(err);
        } else {
            context.succeed({"errors": "false"});
        }
    });
};


exports.register = function(event, context) {
    var username = event.username === undefined ? null : event.username;
    var password = event.password === undefined ? null : event.password;


    services.registerUser(username, password, function(err, success){
        if(err){
            context.succeed(err);
        } else {
            context.succeed({"errors": "false"});
        }
    });
};