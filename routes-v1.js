module.exports = function(app, services){
    app.get('/seven/paperboy/index.php', function(req, res){
        res.send('{"server": "up", "news":[]}');
    });

    app.get('/seven/framework_version.php', function(req, res){
        res.send('{"server":"up","frameworks":[{"name":"firefox","version":"7.4.4"},{"name":"safari","version":"7.4.2"}]}');
    });

    app.get('/xcloud/register', function(req, res){
        var username = req.query.username;
        var password = req.query.password;
        
        services.registerUser(username, password, function(ret){
            res.send(ret);    
        });
    });

    app.get('/xcloud/fetch', function(req, res){
        res.send('{}');
    });
}
