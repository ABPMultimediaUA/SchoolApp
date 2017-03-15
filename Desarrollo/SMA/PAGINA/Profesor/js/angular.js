    var user = sessionStorage.getItem('user');
    
    angular.module('myApp', [])
    .controller('navController', navController);
    
    //ESTE CONTROLADOR SERIA MEJOR QUE ESTUVIERA FUERA
    navController.$inject = ['$scope', '$http'];
    function navController($scope, $http){
        if(user == null){
            SUser="";
            bool = true;
        }else{
            SUser="usuario/"+user;
            bool = false;
        }
        if(bool == false){
            var nav = this;
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
                alert()
            });
        }
    };