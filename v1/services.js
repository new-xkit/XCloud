function Services(repo){
    this.repo = repo;
}

Services.prototype = {


    registerUser: function(username, password, callback){
        var _this = this;
        if(username === undefined || password === undefined){
            callback({"errors": "true", "error_code": "102", "message": "No username or password given."});
            return;
        }

        
        username = username.toLowerCase();
        //Users alphanumeric check
        if(/^[a-z0-9]+$/i.test(username) === false){
            callback({"errors": "true", "error_code": "102"});
            return;
        }
        
        //Make sure password is there.
        if(password.length === 0){
            callback({"errors": "true", "error_code": "202"});
            return;
        }

        //Check if there's already a user in the repository.
        _this.repo.containsUser(username, function(err, hasUser){
            if(err !== null || hasUser === true){
                callback({"errors": "true", "error_code": "100"});
                return;
            }

            
            _this.repo.createUser(username, password, function(err, success){
                if(err === null){
                    callback({"errors": "false"});
                    return;
                }
                else{
                    callback({"errors":"true", "message": "Repository unable to create user."});
                    return;
                }
            });
        });
    },
    
    loginUser: function(username, password, callback){
        var _this = this;
        if(username === undefined || password === undefined){
            callback({"errors": "true", "error_code": "102", "message": "No username or password given."});
            return;
        }
        
        username = username.toLowerCase();
        //Users alphanumeric check
        if(/^[a-z0-9]+$/i.test(username) === false){
            callback({"errors": "true", "error_code": "102"});
            return;
        }
        
        this.repo.getUser(username, password, function(err, user){
            if(err !== null){
                callback({"errors": "true", "error_code":"100"});
                return;
            }

            var isValid = Object.keys(user).length !== 0;

            if(isValid){
                callback({"errors": "false" });
                return;
            }
            else{
                callback({"errors": "true", "error_code": "400"});
                return;
            }
        });
    },

    storePreferences: function(username, password, data, callback){
        var _this = this;
        if(username === undefined || password === undefined){
            callback(null, {"errors": "true", "error_code": "102", "message": "No username or password given."});
            return;
        }
        
        username = username.toLowerCase();
        //Users alphanumeric check
        if(/^[a-z0-9]+$/i.test(username) === false){
            callback(null, {"errors": "true", "error_code": "102"});
            return;
        }

        var user = this.repo.getUser(username, password, function(err, user){
           if(err !== null){
                callback(err, null);
                return;
            }

            if(Object.keys(user).length === 0 || user.userid === undefined || user.userid.length === 0){
                callback(null, {"errors": "true", "error_code": "400"});
                return;
            }
            else{
                _this.repo.storePreferences(user.userid, data, function(error, success){
                    if(err !== null){
                        console.log(err);
                        calback(error, {"errors": "true"});
                        return;
                    }
                    callback(null, {"errors": "false"});
                    return;
                });
            }
        });
    }
}

module.exports = function(repo){
    return new Services(repo);
}
