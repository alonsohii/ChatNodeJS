module.exports = function(params, callback) {

    // ---------------------------------------------------------
    // get an instance of the router for api routes
    // ---------------------------------------------------------

    var apiRoutes = this.express.Router();

    // ---------------------------------------------------------
    // authentication (no middleware necessary since this isnt authenticated)
    // ---------------------------------------------------------
    // http://localhost:8080/api/authenticate
    apiRoutes.post('/authenticate', params.AutCtrl.autentificarMysql);

    // ---------------------------------------------------------
    // route middleware to authenticate and check token
    // ---------------------------------------------------------
    apiRoutes.use(params.Middleware.Verificar);

    // ---------------------------------------------------------
    // authenticated routes
    // ---------------------------------------------------------
    apiRoutes.get('/', function(req, res) {
        //console.log(req.decoded.id) ;
        res.json({
            success: true,
            message: 'Welcome to the coolest API on earth!',
            user: req.decoded.usuario,
            correo: req.decoded.correo
        });
    });

    apiRoutes.get('/users', function(req, res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    });

    apiRoutes.get('/logout',params.AutCtrl.blackListToken);

    apiRoutes.get('/check', function(req, res) {
        res.json(req.decoded);
    });

    app.use('/api', apiRoutes);

}