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
        var params = {"Key": {"username": {"S": username}}, "TableName": "xcloud_users"};
        this.db.getItem(params, function(err, data){
            if(err !== null){
		console.log(err);
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
    },

    getUser: function(username, unsecure_password, callback){
        var _this = this;
        var params = {"Key": {"username": {"S": username}}, "TableName": "xcloud_users"};
        this.db.getItem(params, function(err, data){
            if(err !== null){
                console.log(err);
                callback(err, {});
                return;
            } else if(Object.keys(data).length === 0) {
                callback(null, {});
                return;
            } else {
                var isValid = _this.bcrypt.compareSync(unsecure_password, data.Item.password.S);
                if(isValid){
                    var user = {"username": username, "userid": data.Item.userid.S};
                    callback(null, user);
                    return;
                }
            }

            callback(null, {});
            return;
        });
    },

    storePreferences: function(userid, data, callback){
        params =    {   "Bucket": "xcloud.preferences", 
                        "Key": userid,
                        "Body": data };

        
        this.s3.upload(params, {}, function(err, data){
            if(err !== null){
                console.log(err);
                callback(err, false);
                return;    
            }
            
            callback(null, true);
            return; 
        });
    },

    fetchPreferences: function(userid, callback){
        params =    {   "Bucket": "xcloud.preferences", 
                        "Key": userid
                    };

        this.s3.getObject(params, function(err, data){
            if(err !== null){
                console.log(err);
                callback(err, {});
                return;
            } else if(data.length === 0){
                callback({"errors": true, "message": "No preferences found for that user."}, {});
                return;
            }

            var preferences = {"errors": "false", "data": data.Body.toString()};
            callback(null, preferences);
            return;
        });
    }
};

module.exports = function(aws, bcrypt, uuid){
    return new Repository(aws, bcrypt, uuid);
}
