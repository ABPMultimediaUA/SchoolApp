//    var sesionLocal = false;
//    var sesionSesion = false;
//
//    if(typeof localStorage.user == 'undefined' || localStorage.user == "null"){
//        if(typeof sessionStorage.getItem('user2') == 'undefined' || sessionStorage.getItem('user2') == null){
//            window.location.replace("/prueba_api/SITIO/LandingPage/index.html");
//        }else{
//            sesionSesion = true;
//        }     
//    }else{
//        sesionLocal = true; 
//    }

    angular.module('gestorApp', [])
    .controller('navController', navController)
    .controller("notasController", notasController);

    navController.$inject = ['$scope', '$http', '$window'];
    function navController($scope, $http, $window){        
        var nav = this;
        
        nav.user1 = "";
//        if(sesionLocal){
//            nav.user1 = localStorage.user;
//        }
//        if(sesionSesion){  
//            nav.user1 = sessionStorage.getItem('user2');
//        }
        
        SUser="usuario/"+nav.user1

        //LLAMADA HTTP
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/gestor/gestor/", 
            method: "GET",
            params: {usuario: "polonio2016"}
        })
         .then(function(response) {
            nav.compuesto = angular.fromJson(response.data);
            nav.nombre = nav.compuesto.nombre;
            nav.apellidos = nav.compuesto.apellidos;
//            if(sesionLocal)
                localStorage.setItem('idGestor', nav.compuesto.idGestor);
                localStorage.setItem('idCentro', nav.compuesto.idCentro);
//            if(sesionSesion)    
                sessionStorage.setItem('idGestor', nav.compuesto.idGestor);
                sessionStorage.setItem('idCentro', nav.compuesto.idCentro);
        }, function errorCallback(response) {
            //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
        });
        //LOG OUT
//        nav.logOut = function (){
//            if(sesionLocal){
//                localStorage.setItem('user', "null");
//                $window.location.href = '/prueba_api/SITIO/LandingPage/index.html';
//            }
//            if(sesionSesion){  
//                sessionStorage.setItem('user2', "null");
//                $window.location.href = '/prueba_api/SITIO/LandingPage/index.html';
//            }
//        }
    };

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
                url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/", 
                method: "GET",
                params: {idCurso: crear.curso}
            })
             .then(function(response) {
                crear.compuesto = angular.fromJson(response.data);
                crear.asignaturas = crear.compuesto;
            }, function errorCallback(response) {
                //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
            });
        }
        
        crear.selectAsig = function(){
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/alumno/alumno/", 
                method: "GET",
                params: {idCurso: crear.curso, idAsignatura: crear.asig, notas: 1}
            })
             .then(function(response) {
                crear.compuesto = angular.fromJson(response.data);
                console.log(crear.compuesto);
            }, function errorCallback(response) {
                //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
            });
        }

    };
