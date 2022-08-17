//Aqui esta explicado con comentarios todo el js y tambien hay comentarios en el css y el html correspondientes a sorteo
$(function() {
// Variables sorteo
    var msa = [

            { name: "descuento del 25% en un mes de clases)" },
            { name: "Pala de Padel (150 euros)" },
            { name: "Raqueta de Tenis (180 euros)" },
            { name: "Vale Decathlon (30 euros)" },
            { name: "Cordaje gratis (15,89 euros)" },
            { name: "Camiseta head (13,99 euros)" },
            { name: "Gorra nike (13,99 euros)"  },
            { name: "Zapatillas adidas (59,99 euros)"},
            { name: "Viaje fin de semana a Francia (250 euros)" },
            { name: "Exursion Mutua Madid Open (55,50 euros)"},
            { name: "Charla psicologo deportivo (30,99 euros)" },

        
        ],
        $input = $('input'),
        random_index;

    //lista recursiva hasta detenerse en el elemento configurado
    function makeSlotList(list){
        //hasta 18 valores en la animacion
        if(list.length<20){//el valor puede ser ajustado
            var index = _.random(msa.length-1);
            if(list.length===1){
                /*
                    elemento inicial de la lista
                */
                random_index = index;
            }
            list.push( '<li index='+_.random(msa.length-1)+'>'+msa[index].name+'</li>' );
            return makeSlotList(list);
        } else {
            //dio un giro
            //la entrada se limpia
            $input.val('');
            // se agrega el elemento seleccionado
            $('#slot').html(list.join('')).parent().show().trigger('spin');
            return list;
        }
    }

    //se crea la lista de elementos o slot
    function makeSlots(){
        //inicia en el valor aleatorio previo
        var list = ['<li>'+$input.val()+'</li>'];

        //se hace recursivo el llamado
        makeSlotList(list);
    }

    $('#slot').jSlots({
        number: 1,
        spinner : '.jSlots-wrapper',
        spinEvent: 'spin',
        time: 300,
        loops: 1,
        endNum: 2,//finaliza en el segundo elmento del arreglo aleatorio
        onEnd: function(finalElement){
            //set result
            $input.val(msa[random_inde].name);
            //oculta spiner
            $(this.spinner).hide();
        }
    });

    //elemento aleatorio
    $('#random_location').on('click', makeSlots);

});
$(document).ready(function() {
    //obtenemos el valor de los input
    
    $('#adicionar').click(function() {
      var nombre = document.getElementById("nombre").value;
      var apellido = document.getElementById("apellido").value;
      var cedula = document.getElementById("telefono").value;
      var i = 1; //contador para asignar id al boton que borrara la fila
      var fila = '<tr id="row' + i + '"><td>' + nombre + '</td><td>' + apellido + '</td><td>' + cedula + '</td><td><button type="button" name="remove" id="' + i + '" class="btn btn-danger btn_remove">Quitar</button></td></tr>'; //esto seria lo que contendria la fila
    
      i++;
    
      $('#mytable tr:first').after(fila);
        $("#adicionados").text(""); //esta instruccion limpia el div adicioandos para que no se vayan acumulando
        var nFilas = $("#mytable tr").length;
        $("#adicionados").append(nFilas - 1);
        //le resto 1 para no contar la fila del header
        document.getElementById("apellido").value ="";
        document.getElementById("telefono").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("nombre").focus();
      });
    $(document).on('click', '.btn_remove', function() {
      var button_id = $(this).attr("id");
        //cuando da click obtenemos el id del boton
        $('#row' + button_id + '').remove(); //borra la fila
        //limpia para que vuelva a contar las filas de la tabla
        $("#adicionados").text("");
        var nFilas = $("#mytable tr").length;
        $("#adicionados").append(nFilas - 1);
      });
    });
   


