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
    }
}

module.exports = function(repo){
    return new Services(repo);
}
