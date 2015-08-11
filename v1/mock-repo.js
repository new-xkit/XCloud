"use strict";

function Repository(){

}

Repository.prototype = {
    //Callback
    //  err: error if there was an error
    //  hasUser: true if a user exists, false otherwise.
    containsUser: function(username, callback){
        callback(null, true);
    },

    createUser: function(username, unsecure_password, callback){

        callback(null, true);
    },

    getUser: function(username, unsecure_password, callback){
        var user = {"username": username, "userid": "0"};
        callback(null, user);
    },

    storePreferences: function(userid, data, callback){

        callback(null, true);
    },

    fetchPreferences: function(userid, callback){
        var preferences = {"errors": "false", "data": "Mock Data"};
        callback(null, preferences);

    }
};

module.exports = function(){
    return new Repository();
};
