function Repository(aws, bcrypt, uuid){
    this.db = new aws.DynamoDB();
    this.bcrypt = bcrypt;
    this.uuid = uuid;
}

Repository.prototype = {
    //Callback
    //  err: error if there was an error
    //  hasUser: true if a user exists, false otherwise.
    containsUser: function(username, callback){
        var params = {"Key": {"username": {"S": username}}, "TableName": "xcloud_users"};
        this.db.getItem(params, function(err, data){
            if(err !== null){
                callback(err, true);
                return;
            }
            if(Object.keys(data).length !== 0){
                callback(null, true);
                return;
            }

            callback(null, false);
            return;
        });
    },

    createUser: function(username, unsecure_password, callback){
        var salt = this.bcrypt.genSaltSync(10);
        var hash = this.bcrypt.hashSync(unsecure_password, salt);
        var userId = this.uuid.v1();
        var params =    {   "Item": { 
                                "username": {"S": username},
                                "password": {"S": hash},
                                "userid": {"S": userId}
                            },
                            "TableName": "xcloud_users"
                        };

        this.db.putItem(params, function(err, data){
            if(err !== null){
                callback(err, false);
                return;
            }
            
            callback(null, true);
            return;
        });
    }
};



module.exports = function(aws, bcrypt, uuid){
    return new Repository(aws, bcrypt, uuid);
}
