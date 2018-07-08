var mongoose = require('mongoose');
var User = require('../models/user'); // get our mongoose model
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get our config file
var express = require('express');
var db = require('../connection');
var app = express();
app.set('superSecret', config.secret); // secret variable
var crypto = require('crypto');
var TokenModel = require('../models/token'); // get our mongoose model


exports.autentificar = function(req, res) {

    User.findOne({
        name: req.query.name
    }, function(err, user) {
        if (err) {
            res.status(400);
            res.send(err);
            throw err;

        };

        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {

            // check if password matches
            if (user.password != req.query.password) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 100000 // expires in 24 hours
                });

                console.log(token);

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
}

exports.autentificarMysql = function(req, res) {

    db.query('SELECT correo, pw    , idbp_personas  as id , username as usuario FROM bp_personas     WHERE correo = "' + req.body.name + '"' /* + 'AND password =' [hash] */ , function(err, rows, fields) {
        console.log(rows.length);
        if (rows != undefined && rows.length > 0) {

            const secret = 'webos con frijoles@327';
            const hash = crypto.createHmac('sha256', secret)
                .update(req.body.password)
                .digest('hex');

            console.log(hash);
            console.log(rows[0]);
            console.log(rows);
            console.log(rows[0].pw)

            if (rows[0].pw != hash && rows[0].correo != '' && rows[0].correo != null) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(rows[0], app.get('superSecret'), {
                    expiresIn: 30000 // expires in 24 hours

                });

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        } else {

            res.json({
                success: false,
                message: 'Autentification erronea.'
            });
        }

        if (!err)
            console.log('The solution is: ');
        else
            console.log('Error while performing Query.' + err);
    });

}

exports.blackListToken = function(req,res)
{
    try
    {
        // db.bios.find( { _id: 5 } )
        var token = new TokenModel({
            token:req.query.token,
            estatus:true
        });
        var TokenModels = mongoose.model('TokenModel');
        var tokenStr = req.query.token;

        var query =  TokenModels.find( { "token": tokenStr });

        query.exec(function(err, docs) {
            if (err) {
                res.json({
                    success: false
                });
                throw err;
            } else {
                if(docs.length==0){

                    token.save(function(err) {
                        if (err) {
                            res.json({
                                success: false
                            });
                            throw err;
                
                        } else {
                            res.json({
                                success: true
                            });
                        }
                
                    });

                }else{
                    res.json({
                        success: false
                    });
                }

            }
    
        });
        


    }
    catch(err){
        throw err;
    }


}

// SELECT correo, pw FROM projectb.bp_personas;