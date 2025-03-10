var app = angular.module("miApp", [ ]); 

app.controller("miControlador",function($scope, $log, $http){

    cargaInicial();

    function cargaInicial(){

        $scope.texto = "Es un texto";

        console.log('hola', $scope.texto);
        

        


        // $scope.calidadesSeleccionadas = {};

        // $scope.calidades = [
        //     { "nivel": 1, "texto": "Normal"},
        //     { "nivel": 2, "texto": "Good"},
        //     { "nivel": 3, "texto": "Outstanding"},
        //     { "nivel": 4, "texto": "Excellent"},
        //     { "nivel": 5, "texto": "Masterpiece"},
        // ];

        // $scope.listadoRarezas = [
        //     { "nivel": 0, "texto": null},
        //     { "nivel": 1, "texto": "Uncommom"},
        //     { "nivel": 2, "texto": "Rare"},
        //     { "nivel": 3, "texto": "Exceptional"},
        // ];

        leerJSON().then(function(data){
            // return traerDatos();
        });

        // // $scope.filtroCalidad = function(calidad){
        // //     console.log(calidad);
            
        // // }

        // $scope.filtrar = function(calidad){
        //     filtrarPorcentaje();

        //     //añadimos quitamos la calidad según corresponda

        //     if(calidad){
        //         filtrarCalidad(calidad);
        //     }
        //     console.log($scope.datosTabla);
        // };

    }

    function obtenerCategorias(objetoRecibido){
        var categorias = {};
    
        // Recorremos los elementos y las agregamos al objeto
        objetoRecibido.forEach(function(item) {
            if(item.categoria){
                categorias[item.categoria] = true;
            }
        });
    
        // Convertimos las categorías únicas a un array
        return Object.keys(categorias);
    }


    function leerJSON(){

        //return $http.get('datos.json')
        return $http.get('datosJson2.json')
        .then(function(res){

            console.log(res.data);

            $scope.datosLeidos = []; 

            angular.forEach(res.data, function(fila){

                if(fila.mostrar === 'S'){
                    $scope.datosLeidos.push({
                        nombre: fila.nombre,
                        categoria: fila.categoria,
                        descripcion: fila.descripcion,
                        //mostrar: fila.mostrar,
                        url: fila.url,
                        imagen: '/img/'+fila.articulo+'.jpg',
                        precio: fila.precio,
                        mostrar: fila.mostrar
                    });
                }

                //console.log(fila);


            });

            $scope.categoriasFiltradas = obtenerCategorias($scope.datosLeidos);

            console.log('datos', $scope.datosLeidos);
            

        });
    }

    /*
    $scope.filtrarCategoria = filtrarCategoria();

    function filtrarCategoria(categoria){
        console.log(categoria);
    }
        */

    $scope.filtrarPorCategoria = function(categoria){
        if (!categoria) {
            // Si no hay categoría seleccionada, mostrar todos los elementos
            $scope.itemsFiltrados = angular.copy($scope.items);
        } else {
            // Filtrar los elementos que coincidan con la categoría seleccionada
            $scope.itemsFiltrados = $scope.items.filter(function(item) {
                return item.categoria === categoria;
            });
        }
    }
});