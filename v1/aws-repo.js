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
        var params = {"Key": {"username": {"S": username}}, "TableName": "xcloud_users"};
        this.db.getItem(params, function(err, data){
            if(err){
                console.log(err);
                callback(err, true);
                return;
            }
            if(Object.keys(data).length !== 0){
                callback(null, true);
                return;
            }

            callback(null, false);
        });
    },

    createUser: function(username, unsecure_password, callback){
        var _this = this;

        this.bcrypt.genSalt(10, function(err, salt){
            if(err){
                callback(err, false);
                return;
            }

            _this.bcrypt.hash(unsecure_password, salt, function(err, hash){
                if(err){
                    callback(err, false)
                }

                var userId = _this.uuid.v1();
                var params =    {   "Item": {
                    "username": {"S": username},
                    "password": {"S": hash},
                    "userid": {"S": userId}
                    },
                    "TableName": "xcloud_users"
                };

                _this.db.putItem(params, function(err, data){
                    if(err){
                        callback(err, false);
                        return;
                    }

                    callback(null, true);
                });
            });
        });

    },

    getUser: function(username, unsecure_password, callback){
        var _this = this;
        var params = {"Key": {"username": {"S": username}}, "TableName": "xcloud_users"};
        this.db.getItem(params, function(err, data){
            if(err){
                console.log(err);
                callback(err, null);
                return;
            } else if(Object.keys(data).length === 0) {
                callback(null, null);
                return;
            } else {
                _this.bcrypt.compare(unsecure_password, data.Item.password.S, function(err, res){
                    if(err || res === false){
                        callback(null, null);
                    } else {
                        var user = {"username": username, "userid": data.Item.userid.S};
                        callback(null, user);
                    }
                });

            }

        });
    },

    storePreferences: function(userid, data, callback){
        var params =    {   "Bucket": "xcloud.preferences",
                        "Key": userid,
                        "Body": data };

        
        this.s3.upload(params, {}, function(err, data){
            if(err){
                console.log(err);
                callback(err, false);
                return;    
            }
            
            callback(null, true);
        });
    },

    fetchPreferences: function(userid, callback){
        var params =    {   "Bucket": "xcloud.preferences",
                        "Key": userid
                    };

        this.s3.getObject(params, function(err, data){
            if(err){
                console.log(err);
                callback(err, null);
                return;
            } else if(data.length === 0){
                callback({"errors": true, "message": "No preferences found for that user."}, null);
                return;
            }

            var preferences = {"errors": "false", "data": data.Body.toString()};
            callback(null, preferences);
        });
    }
};

module.exports = function(aws, bcrypt, uuid){
    return new Repository(aws, bcrypt, uuid);
};
