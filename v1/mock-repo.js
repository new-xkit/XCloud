"use strict";

function Repository(aws, bcrypt, uuid){
    this.db = new aws.DynamoDB();
    this.s3 = new aws.S3();
    this.bcrypt = bcrypt;
    this.uuid = uuid;
}

Repository.prototype = {
    //Callback
    //  err: error if there was an error
    //  hasUser: true if a user exists, false otherwise.
    containsUser: function(username, callback){
        if(username === "04ceafe434034d96a6ffc14ad6062a1b"){
            callback(null, true);
        }
        else {
            callback(null, false);
        }
    },

    createUser: function(username, unsecure_password, callback){
        if(username === "04ceafe434034d96a6ffc14ad6062a1b"){
            callback(null, false);
        }
        else{
            callback(null, true);
        }

    },

    getUser: function(username, unsecure_password, callback){
        if(username === "6066655dc742d6b0605378c8262502b0"){
            var user = {"username": "6066655dc742d6b0605378c8262502b0", "userid": "10"};
            callback(null, user);
        }
        else{
            callback(null, null);
        }
    },

    storePreferences: function(userid, data, callback){
        callback(null, true);
    },

    fetchPreferences: function(userid, callback){
            callback(null, "yay preferences");
        }
};

module.exports = function(aws, bcrypt, uuid){
    return new Repository(aws, bcrypt, uuid);
};
