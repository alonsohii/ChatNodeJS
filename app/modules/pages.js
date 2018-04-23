module.exports = function(params,callback) {

   /* this.UsuariosCtrl = params.UsuariosCtrl;
    this.ProyectCtrl = params.ProyectCtrl;
    this.PaisesCtrl = params.PaisesCtrl;
    this.Helper = params.Helper;
    this.app = params.app;
    */

	//this.app.post('/usuario', this.UsuariosCtrl.InsertarUsuario );

    params.Helper.Pagina('/panel','panel',{ title: "Panel Chat"},params.app);
    params.Helper.Pagina('/admin','admin',{ title: "Reset Chat"},params.app);
    params.Helper.Pagina('/reset','reset',{ title: "Reset Chat"},params.app);


	

//	this.app.get('/setup', this.UsuariosCtrl.UsuarioMongoDb);


	   /*this.app.get('/project/:nombre', function(req, res) {

	    var param = {};

    this.ProyectCtrl.GetProject(null,function(data){
      // 	this.Helper.UrlReplace(req.params.nombre)
     // console.log(data);

		    if(data != null){
			    res.render('detalle', data[0]);
			    res.status(200);
		    }else{
		    	var data = { nombre:'(404) No existe un proyecto con este nombre' , desarrollo:"", categoria:"",subcategoria :""}
		        res.render('detalle', data);
		        res.status(200);
		    }

       },req.params.nombre);

    

    });
   */




	this.greet = function(params,callback){

    };


}