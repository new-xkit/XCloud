module.exports = function(app, services){


    app.get('/seven/paperboy/index.php', function(req, res){
        res.send('{"server": "up", "news":[]}');
    });

    app.get('/seven/framework_version.php', function(req, res){
        res.send('{"server":"up","frameworks":[{"name":"firefox","version":"7.4.4"},{"name":"safari","version":"7.4.2"}]}');
    });

    app.get('/seven/get.php', function(req, res){
        var extension = req.query.extension;
        res.redirect('/dist/' + extension + '.json');
    });


    app.get('/xcloud/register', function(req, res){
        var username = req.query.username;
        var password = req.query.password;
        
        services.registerUser(username, password, function(ret){
            res.send(ret);    
        });
    });

    app.get('/xcloud/auth', function(req, res){
        var username = req.query.username;
        var password = req.query.password;

        services.loginUser(username, password, function(ret){
            res.send(ret);
        });
    });

    
    app.get('/xcloud/fetch', function(req, res){
        username = req.query.username;
        password = req.query.password;
        
        services.fetchPreferences(username, password, function(err, message){
            if(err !== null){
                res.sendStatus(500);
                return;
            }
            res.send(message);
        });
    });

    app.post('/upload', function(req, res){
        username = req.body.username;
        password = req.body.password;
        data = req.body.data;

        services.storePreferences(username, password, data, function(err, message){
            if(err !== null){
                res.sendStatus(500);
                return;
            }
            res.send(message);
        });
    });
}
