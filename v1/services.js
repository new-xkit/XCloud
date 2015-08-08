function Services(repo){
    this.repo = repo;
}

Services.prototype = {


    registerUser: function(username, password, callback){
        var _this = this;
        if(_this.isValidUsernamePassword(username, password) === false){
            callback({"errors": "true", "error_code": "102", "message": "Username or password invalid."}, false);
            return;
        }

        username = username.toLowerCase();
        
        //Check if there's already a user in the repository.
        _this.repo.containsUser(username, function(err, hasUser){
            if(err !== null || hasUser === true){
                callback({"errors": "true", "error_code": "100"}, false);
                return;
            }

            //User is not in the repository, let's create ze.
            _this.repo.createUser(username, password, function(err, success){
                if(err !== null || success === false){
                    callback({"errors":"true", "message": "Repository unable to create user."}, false);
                }
                else{
                    callback(null, true);
                }
            });
        });
    },
    
    loginUser: function(username, password, callback){
        var _this = this;
        
        if(_this.isValidUsernamePassword(username, password) === false){
            callback({"errors": "true", "error_code": "102", "message": "Username or password invalid."}, false);
            return;
        }


        username = username.toLowerCase();

        this.repo.getUser(username, password, function(err, user){
            if(err !== null || user === null){
                callback({"errors": "true", "error_code":"602"}, false);
                return;
            }

            callback(null, true);
        });
    },

    storePreferences: function(username, password, data, callback){
          var _this = this;

        if(_this.isValidUsernamePassword(username, password) === false){
            callback({"errors": "true", "error_code": "102", "message": "Username or password invalid."}, false);
            return;
        }


        username = username.toLowerCase();

        if(data === null || data.length === 0){
            callback({"errors": "true"}, false)
            return;
        }

        this.repo.getUser(username, password, function(err, user){
           if(err !== null || user === null){
                callback({"errors": "true", "error_code": "602"}, false);
                return;
            }
            _this.repo.storePreferences(user.userid, data, function(error, success){
                if(err !== null || success === false){
                    calback({"errors": "true"}, false);
                    return;
                }
                callback(null, true);
            });
        });
   },

   fetchPreferences: function(username, password, callback){
        var _this = this;
        if(_this.isValidUsernamePassword(username, password) === false){
            callback({"errors": "true", "error_code": "102", "message": "Username or password invalid."});
            return;
        }


        username = username.toLowerCase();

        this.repo.getUser(username, password, function(err, user){
           if(err !== null || user === null){
                callback({"errors": "true", "error_code": "602"}, null);
                return;
            }

            _this.repo.fetchPreferences(user.userid, function(error, preferences){
                if(err !== null || preferences === null){
                    console.log(err);
                    calback({"errors": "true"}, null);
                    return;
                }
                
                callback(null, {"errors": "false", "data": preferences.data});
            });
        });
   },


    isValidUsernamePassword: function(username, password){
        if(username === null || password === null){
            return false;
        }

        //Limit the user length.
        if(username.length >= 100){
            return false;
        }
        
        username = username.toLowerCase();
        //Users alphanumeric check
        //Also allows hyphens so we can test with uuid.
        if(/^[a-z0-9\-]+$/i.test(username) === false){
            return false;
        }

        //Password MD5 check.
        if(/^[a-f0-9]{32}$/.test(password) === false){
            return false;
        }

        return true;
    }
      
    
}

module.exports = function(repo){
    return new Services(repo);
}
