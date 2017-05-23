
    angular.module('gestorApp', [])
    .controller("notasController", notasController);



    notasController.$inject = ['$scope', '$http', '$window'];
    function notasController($scope, $http, $window){        
        var crear = this;
        
        crear.user1 = "";
            crear.user1 = localStorage.user;
            crear.idGestor = localStorage.idGestor;
            crear.idCentro = localStorage.idCentro;
        
            crear.user1 = sessionStorage.getItem('user2');
            crear.idGestor = sessionStorage.getItem('idGestor');
            crear.idCentro = sessionStorage.getItem('idCentro');
        
        
        //LLAMADA HTTP PARA CURsOS
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/curso/curso/", 
            method: "GET",
            params: {idCentro: 1}
        })
         .then(function(response) {
            crear.compuesto = angular.fromJson(response.data);
            crear.cursos = crear.compuesto;
        }, function errorCallback(response) {
            //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
        });    
        
        crear.selectCurso = function(){
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/alumno/alumno/", 
                method: "GET",
                params: {idCurso: crear.curso, idCentro: 1}
            })
             .then(function(response) {
                crear.alumnos = angular.fromJson(response.data);
            }, function errorCallback(response) {
                //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
            });
        }
        
        crear.selectAlum = function(){
            idAlumno = crear.alum;
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/alumno/alumno/", 
                method: "GET",
                params: {idCurso: crear.curso, id: idAlumno, idCentro: 1}
            })
             .then(function(response) {
                crear.notas = angular.fromJson(response.data);
            }, function errorCallback(response) {
                //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
            });
            
        }

            crear.load = function () {
                var dataLength = 0;
                var datos=[];
                var dps=[];
                
                    if(crear.compuesto.length > 0){
                        for(var i = dataLength; i < crear.compuesto.length; i++){
                            datos.push({
                                x: crear.compuesto[i].apellidos,
                                y: parseFloat(crear.compuesto[i].NotaFinal)
                            });
                        }
                        dataLength = crear.compuesto.length;

                        
                        //chart.render();
                    }
                    $.each(datos, function(i, item){
                    dps.push({label: item.x, y: item.y});

                });

                
                var updateInterval = 1000;
                                var chart = new CanvasJS.Chart("chart", {
                    title: {
                        text: "Notas finales de alumnos"
                    },
                    axisX: {
                        title: "Alumnos",
                    },
                    axisY: {
                        title: "Notas", maximum:10,
                    },
                    data: [{type: "column", dataPoints: dps}]
                });
                    chart.render();
            }


    };
