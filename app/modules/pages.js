module.exports = function(p,callback) {

     var app = p.app;
     
   // router Post
    app.post('/usuario', p.UsuariosCtrl.InsertarUsuario );
    app.post('/reset', p.UsuariosCtrl.RandomPassword );

    // Route ejs Html pages
    p.Helper.Pagina('/panel','panel',{ title: "Panel Chat"},app);
    p.Helper.Pagina('/admin','admin',{ title: "Admin Chat"},app);
    p.Helper.Pagina('/reset','reset',{ title: "Reset Chat"},app);

	p.Helper.Pagina('/registro','registro',{ title: "Registro de Usuarios"} , app);
    p.Helper.Pagina('/login','login',{ title: "Registro de Usuarios"} , app);
    
    app.get('/paises', p.PaisesCtrl.CatalogoPaises );

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