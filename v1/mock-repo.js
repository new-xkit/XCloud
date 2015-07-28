module.exports = {

    //Callback
    //  err: error if there was an error
    //  hasUser: true if a user exists, false otherwise.
    containsUser: function(username, callback){
        callback(null, false);
    },

    createUser: function(username, password, callback){
        callback(null, true);
    }
};
