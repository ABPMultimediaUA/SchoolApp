    var user = sessionStorage.getItem('user');

    angular.module('alumnoApp', [])
    .controller('navController', navController)
    .controller('anuncioAlumController', anuncioAlumController)
    .controller('datosAlumnoController', datosAlumnoController)
    .controller('asistenciaController', asistenciaController)
    .controller('mencionController', mencionController)
    .controller('mensajeNuevoController', mensajeNuevoController)
    .controller('evaluacionController', evaluacionController);

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

    asistenciaController.$inject = ['$scope', '$http', '$window'];
    function asistenciaController($scope, $http, $window){
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
            //LLAMADA PARA RECOGER LAS FALTAS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asistencia/asistencia/"+idAlumno+"/format/json", 
                method: "GET",
                params: {idAlumno: idAlumno}
            })
             .then(function(response) {
                asistencia.compuesto = angular.fromJson(response.data);
                //PASAR FECHA A FORMATO DD/MM/AAAA
                for(var i=0;i<asistencia.compuesto.length;i++){
                    fecha = asistencia.compuesto[i].fecha;
                    aa = fecha.split('-');
                    fecha2 = aa[2]+"-"+aa[1]+"-"+aa[0];
                    asistencia.compuesto[i].fecha = fecha2;
                }
                asistencia.lista = asistencia.compuesto;
            }, function errorCallback(response) {
                alert()
            });
            
            asistencia.justificar = function(item){
                //$window.location.reload();
                //JUSTIFICADA
                var cont =0;
                asistencia.lista = [];
                if(item==1){
                    for(var i=0;i<asistencia.compuesto.length;i++){
                        if(asistencia.compuesto[i].justificada == 'Sí'){
                            asistencia.lista[cont] = asistencia.compuesto[i];
                            cont++;
                        }
                    }
                }
                //NO JUSTIFICADA
                if(item==2){
                    for(var i=0;i<asistencia.compuesto.length;i++){
                        if(asistencia.compuesto[i].justificada == 'No'){
                            asistencia.lista[cont] = asistencia.compuesto[i];
                            cont++;
                        }
                    }
                }
                //TODAS
                if(item==3){
                    asistencia.lista = asistencia.compuesto;
                }
            }
            
            //LLAMADA PARA RECOGER ASIGNATURAS DEL ALUMNO
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/"+idAlumnoParam+"/format/json", 
                method: "GET",
                params: {idAlumno: idAlumno}
            })
             .then(function(response) {
                asistencia.asignaturas = angular.fromJson(response.data);
            }, function errorCallback(response) {
                alert()
            });
            
            //FILTRAR POR ASIGNATURA
            asistencia.selectAsignatura = function(idAsign){
                var aux = 0;
                asistencia.lista = [];
                for(var i=0;i<asistencia.compuesto.length;i++){  
                    if(asistencia.compuesto[i].Asignatura_has_Curso_has_Alumno_idAsignatura == idAsign){
                            asistencia.lista[aux] = asistencia.compuesto[i];
                            aux++;
                    }
                }
            }
            
            //LLAMADA DE FECHA
            asistencia.verFecha = function(){
                //ESTO SOLO PARA FIREFOX Y CHROME (EN EDGE NO HACE FALTA SPLIT)
//                var userAgent = $window.navigator.userAgent;
//                var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};
//                edgeBrowser = false;
//                for(var key in browsers) {
//                    if (browsers[key].test(userAgent)) {
//                        edgeBrowser = true;
//                    }
//                };
                
                stringFecha = $scope.fecha.toString()
                fechaSeparada = stringFecha.split(' ');
                dia = fechaSeparada[2];
                mesLetras = fechaSeparada[1];
                anyo = fechaSeparada[3];
                if(mesLetras == "Jan")
                    mes = "01";
                if(mesLetras == "Feb")
                    mes = "02";
                if(mesLetras == "Mar")
                    mes = "03";
                if(mesLetras == "Apr")
                    mes = "04";
                if(mesLetras == "May")
                    mes = "05";
                if(mesLetras == "Jun")
                    mes = "06";
                if(mesLetras == "Jul")
                    mes = "07";
                if(mesLetras == "Aug")
                    mes = "08";
                if(mesLetras == "Sep")
                    mes = "09";
                if(mesLetras == "Oct")
                    mes = "10";
                if(mesLetras == "Nov")
                    mes = "11";
                if(mesLetras == "Dec")
                    mes = "12";
                
                fechaParam = dia+mes+anyo;
                as = "fecha/"+fechaParam+"/idAlumno/"+idAlumno;
                $http({
                    url: "http://localhost/prueba_api/alpha2/index.php/asistencia/asistencia/"+as+"/format/json", 
                    method: "GET",
                    params: {idAlumno: idAlumno,
                             fecha: fechaParam}
                })
                 .then(function(response) {
                    asistencia.lista = angular.fromJson(response.data);
                }, function errorCallback(response) {
                    alert()
                });//asistencia.limpiarFecha();
            }
            
            asistencia.limpiarFecha = function(){
                $scope.fecha = null;
            }
            


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

    evaluacionController.$inject = ['$scope', '$http'];
    function evaluacionController($scope, $http){
        var idAlumno = sessionStorage.getItem('idAlumno');
        if(user == null){
            idAlumnoParam="";
            bool = true;
        }else{
            idAlumnoParam=idAlumno;
            bool = false;
        }
        if(bool == false){
            var evaluacion = this;
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/examen/examen/"+idAlumnoParam+"/format/json",
                method: "GET",
                params: {idAlumno: idAlumnoParam}
            })
             .then(function(response) {
                evaluacion.compuesto = angular.fromJson(response.data);     
                console.log(evaluacion.compuesto[0])
                }, function errorCallback(response) {
                alert()
            });
            
            //LLAMADA PARA RECOGER ASIGNATURAS DEL ALUMNO
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/"+idAlumnoParam+"/format/json", 
                method: "GET",
                params: {idAlumno: idAlumno}
            })
             .then(function(response) {
                evaluacion.asignaturas = angular.fromJson(response.data);
            }, function errorCallback(response) {
                alert()
            });
        }
        

    };



