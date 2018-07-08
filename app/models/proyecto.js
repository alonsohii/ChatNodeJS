var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('ProyModel', new Schema({ 
	nombre: {type: String, index: true}, 
	fecha:{type:Date,default:Date.now},
	descripcioncorta: {type: String, index: true},
	estatus:Boolean,
    categoriaid:Number,
    Subcatagoriaid: Number,
    categoria:String,
    Subcatagoria:String,
    Presupuestoid:Number,
    Presupuesto:String,
    urlproyecto:String,
    idproyecto:Number
}));


