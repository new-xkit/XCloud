/**
 * Endpoints for AWS Lambda
 * Created by Chuck on 2015-08-18.
 */
"use strict";
exports.fetch = function(event, context) {
	var authorization = auth(event.headers) === undefined ? {name: null, pass: null} : auth(event.headers);

    var username = authorization.name;
    var password = authorization.pass;
    
    services.fetchPreferences(username, password, function(err, data){
        if(err !== null){
            res.send(err);
        } else {
            res.send(data);
        }
    });
};


exports.upload = function(event, context) {
    var authorization = auth(event.headers) === undefined ? {name: null, pass: null} : auth(event.headers);

    var username = authorization.name;
    var password = authorization.pass;

    var data = event.data === undefined || event.data === undefined ? null : event.data;

    services.storePreferences(username, password, data, function(err, success){
        if(err !== null || success === false){
            res.send(err);
        } else {
            res.send({"errors": "false"});
        }
    });
};


exports.auth = function(event, context) {
    var authorization = auth(event.headers) === undefined ? {name: null, pass: null} : auth(event.headers);

    var username = authorization.name;
    var password = authorization.pass;

    services.loginUser(username, password, function(err, success){
        if(err !== null || success === false){
            res.send(err);
        } else {
            res.send({"errors": "false"});
        }
    });
};


exports.register = function(event, context) {
    var username = event.username === undefined ? null : event.username;
    var password = event.password === undefined ? null : event.password;


    services.registerUser(username, password, function(err, success){
        if(err !== null){
            res.send(err);
        } else {
            res.send({"errors": "false"});
        }
    });
};