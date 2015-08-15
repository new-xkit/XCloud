/**
 * Created by charles on 8/14/2015.
 */
"use strict";

function Repository(http){
    this.https = http;
}

Repository.prototype = {
    //Callback
    //  err: error if there was an error
    //  hasUser: true if a user exists, false otherwise.
    containsUser: function(username, callback){

    },

    createUser: function(username, unsecure_password, callback){

    },

    getUser: function(username, unsecure_password, callback){

    },

    storePreferences: function(userid, data, callback){

    },

    fetchPreferences: function(userid, callback){

    }
};

module.exports = function(http){
    return new Repository(http);
};
