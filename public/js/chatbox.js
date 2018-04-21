/*
$(function(){
    $(".heading-compose").click(function() {
      $(".side-two").css({
        "left": "0"
      });
    });

    $(".newMessage-back").click(function() {
      $(".side-two").css({
        "left": "-100%"
      });
    });
})
*/
/*
$("#caritas").popover({
    'title' : 'Notifiche', 
    'html' : true,
    'placement' : 'bottom',
    'content' : $(".alert_list").html()
  });*/


 /*
$(document).on('mouseover','#caritas',function(){
    mostrarTooltip(this,'Mira un enlace que tiene en su tooltip una tabla '+
    '',
   {
     ancho:200,
     alto:200
     });
});


mostrarTooltip(this,'Mira un enlace que tiene en su tooltip una tabla '+
'',
{
 ancho:200,
 alto:200
 });



function mostrarTooltip(elemento,mensaje,params){
        // Si no existe aun el tooltip se crea
        if (!document.getElementById(elemento.id+"tp") ){
            // Dimensiones del elemento al que se quiere añadir el tooltip
            if(params.ancho != undefined ){

            }
            anchoElemento =  $('#'+elemento.id).width();
            altoElemento =  $('#'+elemento.id).height();

            widthElemento = params.ancho;
            heightElemento = params.alto;

            // Coordenadas del elemento al que se quiere añadir el tooltip
            coordenadaXElemento = $('#'+elemento.id).position().left;
            coordenadaYElemento = $('#'+elemento.id).position().top;

            // Coordenadas en las que se colocara el tooltip
            x = coordenadaXElemento + anchoElemento/2 + 20;
            y = coordenadaYElemento + altoElemento/2 + 10;

            // Crea el tooltip con sus atributos
            var tooltip = document.createElement('div');
            tooltip.id = elemento.id + "tp";
            tooltip.className = 'toolTip';
            tooltip.innerHTML = mensaje;
            tooltip.style.left = x + "px";
            tooltip.style.top = y + "px";
            if(widthElemento != undefined )
            {
                tooltip.style.width = widthElemento + "px";
            }
            if(heightElemento != undefined )
            {
                tooltip.style.height = heightElemento + "px";
            }

            // Añade el tooltip
            document.body.appendChild(tooltip); 
        }

        // Cambia la opacidad del tooltip y lo muestra o lo oculta (Si el raton esta encima del elemento se muestra el tooltip y sino se oculta)
        $('#'+elemento.id).hover(
            function(){
                tooltip.style.display = "block";
                $('#'+tooltip.id).animate({"opacity" : 1});

            },
            function(){
                $('#'+tooltip.id).animate({"opacity" : 0});
                setTimeout(
                    function (){
                        tooltip.style.display = "none";
                    },
                    10
                );

            }
        );
    }

*/


  