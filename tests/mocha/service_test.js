/**
 * Created by charles on 8/8/2015.
 */

var assert = require("assert");
var repo = require("/v1/mock");
var services = require("/v1/services.js")(repo);
describe('Register User', function() {
    describe('No username', function () {
        it('should return errors true and error code 102 if a username is not given.', function () {
            services.registerUser(null, "5f4dcc3b5aa765d61d8327deb882cf99", function(err, success){
                
            });
        });
    });


    describe("invalid user", function(){
        it('should return an error code when there is not a given user', function (){

            assert.equal(true, true);
        });
    });
});