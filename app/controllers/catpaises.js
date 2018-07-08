var db = require('../connection'),
    geoip = require('geoip-lite'),
  //  requestIp = require('request-ip');
Helper = require('../helpers/general'); // get helper

// Categorias de proyecto
exports.CategoriasProyecto = function(req, res) {

    db.query('SELECT idbp_Categorias as id , nombre as categoria , descripcion , url as  uri FROM freelancer.bp_categorias', function(err, rows, fields) {

        res.setHeader('Content-Type', 'application/json');
        //res.writeHead(200, {'Content-Type': 'text/plain'});

        res.json(rows);
        //res.header("Access-Control-Allow-Origin", "*");
        if (!err)
            console.log('The solution is: ');
        else

            console.log('Error while performing Query.' + err);
    });
}

// SubCategorias de proyecto
exports.SubCategoriasProyecto = function(req, res) {
    console.log(req.query.cat);
    Helper.Query(function(data) {
        if (data != 'nodata') {

            res.setHeader('Content-Type', 'application/json');
            //res.writeHead(200, {'Content-Type': 'text/plain'});

            res.json(data);
        } else {
            res.json({
                success: false
            });
            res.status(400);
        }
    }, "SELECT idbp_Subcategorias as id, nombreSub AS subcategoria , descripcion , url as uri FROM freelancer.bp_subcategorias WHERE bp_subcategorias.idbp_Categoriasfk = " + req.query.cat + "", db);

}

// SubCategorias de proyecto
exports.Presupuestos = function(req, res) {

    //Helper.Emitir();

    Helper.Query(function(data) {
        if (data != 'nodata') {

            res.setHeader('Content-Type', 'application/json');
            //res.writeHead(200, {'Content-Type': 'text/plain'});

            res.json(data);
        } else {
            res.json({
                success: false
            });
            res.status(400);
        }
    }, "SELECT idPresupuesto as id , descripcion , cantidad as desde , cantidad2 as hasta FROM   freelancer.presupuesto", db);

}

// Categoria de paises
exports.CatalogoPaises = function(req, res) {


    
    db.query('select * from v_paisesestados order by Nombre , nombreEstado', function(err, rows, fields) {

        res.setHeader('Content-Type', 'application/json');
        //res.writeHead(200, {'Content-Type': 'text/plain'});

        res.json(rows);
        //res.header("Access-Control-Allow-Origin", "*");
        if (!err)
            console.log('The solution is: ');
        else{
            console.log('Error while performing Query.' + err);

        }

        
    });
    
}

exports.Visitante = function(req, res) {
    var requestIp = "";
    console.log(requestIp.getClientIp(req));
    var ip = (req.headers['x-forwarded-for'] || '').split(',')[0];
    res.json(requestIp.getClientIp(req));
}

function getClientIp(req) {
    var ipAddress;
    // The request may be forwarded from local web server.
    var forwardedIpsStr = req.header('x-forwarded-for');
    if (forwardedIpsStr) {

        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        // If request was not forwarded
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
};
exports.Demo = function(demo) {

    return demo;
}