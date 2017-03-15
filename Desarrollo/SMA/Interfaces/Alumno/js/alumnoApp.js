    var user = sessionStorage.getItem('user');

    angular.module('alumnoApp', [])
    .controller('navController', navController)
    .controller('anuncioAlumController', anuncioAlumController)
    .controller('datosAlumnoController', datosAlumnoController)
    .controller('asistenciaController', asistenciaController)
    .controller('mencionController', mencionController)
    .controller('mensajeNuevoController', mensajeNuevoController);

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
                url: "http://localhost/prueba_api/alpha2/index.php/alumno/alumno/"+SUser+"/format/json", 
                method: "GET",
                params: {usuario: user}
            })
             .then(function(response) {
                nav.compuesto = angular.fromJson(response.data);
                nav.nombre = nav.compuesto.nombre;
                nav.apellidos = nav.compuesto.apellidos;
                sessionStorage.setItem('idAlumno', nav.compuesto.idAlumno);
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

    anuncioAlumController.$inject = ['$scope', '$http'];
    function anuncioAlumController($scope, $http){
        if(user == null){
            SUser="";
            bool = true;
        }else{
            SUser="usuario/"+user;
            bool = false;
        }
        if(bool == false){
            var anuncio = this;
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado/"+SUser+"/format/json", 
                method: "GET",
                params: {usuario: user}
            })
             .then(function(response) {
                anuncio.compuesto = angular.fromJson(response.data);
                var cont = 0;
                anuncio.total = [];
                for(var i=0;i<anuncio.compuesto.length;i++){
                    if(anuncio.compuesto[i].tipo == 1){
                        anuncio.total[cont] = anuncio.compuesto[i];
                        cont ++;
                    }   
                }
                }, function errorCallback(response) {
                alert(response)
            });
        }
    };
       
    datosAlumnoController.$inject = ['$scope', '$http'];
    function datosAlumnoController($scope, $http){
        if(user == null){
            SUser="";
            bool = true;
        }else{
            //SUser="user/"+user;
            idAu = "id/"+1;
            bool = false;
        }
        if(bool == false){
            var alumno = this;
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/alumno/alumno/"+idAu+"/format/json", 
                method: "GET",
                //params: {user: user}
                params: {id : 1}
            })
             .then(function(response) {
                alumno.compuesto = angular.fromJson(response.data);
                alumno.datos = {item: []};
                alumno.datos.item = alumno.compuesto;
                }, function errorCallback(response) {
                    alert()
                });
            }
    };

    asistenciaController.$inject = ['$scope', '$http'];
    function asistenciaController($scope, $http){
       var idAlumno = sessionStorage.getItem('idAlumno');
        if(user == null){
            idAlumnoParam="";
            bool = true;
        }else{
            idAlumnoParam=idAlumno;
            bool = false;
        }
        if(bool == false){ 
            var asistencia = this;
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asistencia/asistencia/"+idAlumnoParam+"/format/json", 
                method: "GET",
                params: {idAlumno: idAlumno}
            })
             .then(function(response) {
                asistencia.compuesto = angular.fromJson(response.data);
                console.log(asistencia.compuesto)
            }, function errorCallback(response) {
                alert()
            });
        }
    };

    mencionController.$inject = ['$scope', '$http'];
    function mencionController($scope, $http){
        var idAlumno = sessionStorage.getItem('idAlumno');
        if(user == null){
            idAlumnoParam="";
            bool = true;
        }else{
            idAlumnoParam=idAlumno;
            bool = false;
        }
        if(bool == false){
            var mencion = this;
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/mencion/mencion/"+idAlumnoParam+"/format/json",
                method: "GET",
                params: {idAlumno: idAlumnoParam}
            })
             .then(function(response) {
                mencion.compuesto = angular.fromJson(response.data);            
                }, function errorCallback(response) {
                alert()
            });
        }
    };

    mensajeNuevoController.$inject = ['$scope', '$http'];
    function mensajeNuevoController($scope, $http){
        if(user == null){
            SUser="";
            bool = true;
        }else{
            SUser="usuario/"+user;
            bool = false;
        }
        if(bool == false){
            var mensajeNuevo = this;
            $http({
                method  : 'POST',
                url     : 'http://localhost/prueba_api/alpha2/index.php/mensaje_alumno/mensaje_alumno',
                data    : $.param($scope.formMensaje),  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
             .succes(function(response){
                console.log("Correcto")
            })
             .then(function(response) {
                nav.compuesto = angular.fromJson(response.data);
                nav.nombre = nav.compuesto.nombre;
                nav.apellidos = nav.compuesto.apellidos;
                }, function errorCallback(response) {
                alert()
            });
        }
    }

