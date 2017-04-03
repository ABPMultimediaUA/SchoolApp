    var user = sessionStorage.getItem('user');
    
    angular.module('myApp', [])
    .controller('navController', navController);
    

    navController.$inject = ['$scope', '$http', '$window'];
    function navController($scope, $http, $window){
        if(user == null){
            SUser="";
            bool = true;
            $window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
        }else{
            SUser="usuario/"+user;
            bool = false;
        }
        if(bool == false){
            var nav = this;
            //LLAMADA HTTP
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/profesor/profesor/"+SUser+"/format/json", 
                method: "GET",
                params: {usuario: user}
            })
             .then(function(response) {
                nav.compuesto = angular.fromJson(response.data);
                nav.nombre = nav.compuesto.nombre;
                nav.apellidos = nav.compuesto.apellidos;
                sessionStorage.setItem('idProfesor', nav.compuesto.idProfesor);
                }, function errorCallback(response) {
                $window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
            });
            
            //LOG OUT
            nav.logOut = function (){
                sessionStorage.setItem('user', null);
                $window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
            }
        }
    };