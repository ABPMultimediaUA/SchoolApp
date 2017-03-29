    var user = sessionStorage.getItem('user');

    angular.module('alumnoApp', [])
    .controller('navController', navController)
    .controller('anuncioAlumController', anuncioAlumController)
    .controller('datosAlumnoController', datosAlumnoController)
    .controller('asistenciaController', asistenciaController)
    .controller('mencionController', mencionController)
//    .controller('mensajeNuevoController', mensajeNuevoController)
    .controller('evaluacionController', evaluacionController)
    .controller('mensajeController', mensajeController)
    .controller('evaluacionController', evaluacionController)
    .controller('expedienteController', expedienteController)
    .controller('tareaController', tareaController);

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
            
            anuncio.ocultar = function(index){
                //document.getElementById('quitar'+index).style.display = 'none';

            }
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
                console.log(asistencia.compuesto[1])
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
            
            //LLAMADA PARA RECOGER ASIGNATURAS DEL ALUMNO
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/"+idAlumnoParam+"/format/json", 
                method: "GET",
                params: {idAlumno: idAlumno}
            })
             .then(function(response) {
                asistencia.asignaturas = angular.fromJson(response.data);
            }, function errorCallback(response) {
                alert("Errir")
            });
            
            asistencia.just = 0;
            asistencia.asig = 0;
            asistencia.fec = 0;

            asistencia.justificar = function(item){
                asistencia.limpiarFecha();
                asistencia.quitarAsignatura();
                asistencia.lista = [];
                
                var cont = 0;
                if(item==1){
                    asistencia.just = 'Si';
                    for(var i=0;i<asistencia.compuesto.length;i++){
                        if(asistencia.compuesto[i].justificada == 'Sí'){
                            asistencia.lista[cont] = asistencia.compuesto[i];
                            cont++;
                        }
                    }
                }
                //NO JUSTIFICADA
                if(item==2){
                    asistencia.just = 'No';
                    for(var i=0;i<asistencia.compuesto.length;i++){
                        if(asistencia.compuesto[i].justificada == 'No'){
                            asistencia.lista[cont] = asistencia.compuesto[i];
                            cont++;
                        }
                    }
                }
                //TODAS
                if(item==3){
                    asistencia.just = 0;
                    asistencia.lista = asistencia.compuesto;
                }
//                if(asistencia.fec == 0){
//                    asistencia.lista = [];
//                    asistencia.justificarAux(item);               
//                }else{
//                    var tam = 0;
//                    asistencia.lista = [];
//                    //JUSTIFICADA
//                    if(item==1){
//                        var cont =0;
//                        asistencia.just = 'Si';
//                        for(var i=0;i<asistencia.compuesto.length;i++){
//                            if(asistencia.compuesto[i].justificada == 'Sí' && asistencia.compuesto[i].fecha == asistencia.fec){
//                                asistencia.lista[cont] = asistencia.compuesto[i];
//                                cont++;
//                            }
//                        }
//                    }
//                    //NO JUSTIFICADA
//                    if(item==2){
//                        var cont =0;
//                        asistencia.just = 'No';
//                        for(var i=0;i<asistencia.compuesto.length;i++){
//                            if(asistencia.compuesto[i].justificada == 'No' && asistencia.compuesto[i].fecha == asistencia.fec){
//                                asistencia.lista[cont] = asistencia.compuesto[i];
//                                cont++;
//                            }
//                        }
//                    }
//                    //TODAS
//                    if(item==3){
//                        var cont =0;
//                        asistencia.just = 0;
//                        for(var i=0;i<asistencia.compuesto.length;i++){
//                            if(asistencia.compuesto[i].fecha == asistencia.fec){
//                                asistencia.lista[cont] = asistencia.compuesto[i];
//                                cont++;
//                            }
//                        }
//                    }
//                }
//                
//                //Si solo ha sido cambiada la asignaturs
//                if(asistencia.asign == 0){
//                    asistencia.lista = [];
//                    asistencia.justificarAux(item); 
//                }else{
//                    var tam = 0;
//                    asistencia.lista = [];
//                    //JUSTIFICADA
//                    if(item==1){
//                        var cont =0;
//                        asistencia.just = 'Si';
//                        for(var i=0;i<asistencia.compuesto.length;i++){
//                            if(asistencia.compuesto[i].justificada == 'Sí' 
//                               && asistencia.compuesto[i].Asignatura_has_Curso_has_Alumno_idAsignatura == asistencia.asign){
//                                asistencia.lista[cont] = asistencia.compuesto[i];
//                                cont++;
//                            }
//                        }
//                    }
//                    //NO JUSTIFICADA
//                    if(item==2){
//                        var cont =0;
//                        asistencia.just = 'No';
//                        for(var i=0;i<asistencia.compuesto.length;i++){
//                            if(asistencia.compuesto[i].justificada == 'No' 
//                               && asistencia.compuesto[i].Asignatura_has_Curso_has_Alumno_idAsignatura == asistencia.asign){
//                                asistencia.lista[cont] = asistencia.compuesto[i];
//                                cont++;
//                            }
//                        }
//                    }
//                    //TODAS
//                    if(item==3){
//                        var cont =0;
//                        asistencia.just = 0;
//                        for(var i=0;i<asistencia.compuesto.length;i++){
//                            if(asistencia.compuesto[i].Asignatura_has_Curso_has_Alumno_idAsignatura == asistencia.asign){
//                                asistencia.lista[cont] = asistencia.compuesto[i];
//                                cont++;
//                            }
//                        }
//                    }
//                }
//                
//                //Si han sido modificados todos
//                if(asistencia.just == 0 && asistencia.fec == 0){
//                    asistencia.lista = [];
//                    asistencia.justificarAux(item); 
//                }else{
//                    var tam = 0;
//                    asistencia.lista = [];
//                    //JUSTIFICADA
//                    if(item==1){
//                        var cont =0;
//                        asistencia.just = 'Si';
//                        for(var i=0;i<asistencia.compuesto.length;i++){
//                            if(asistencia.compuesto[i].justificada == 'Sí' && asistencia.compuesto[i].fecha == asistencia.fec
//                               && asistencia.compuesto[i].Asignatura_has_Curso_has_Alumno_idAsignatura == asistencia.asign){
//                                asistencia.lista[cont] = asistencia.compuesto[i];
//                                cont++;
//                            }
//                        }
//                    }
//                    //NO JUSTIFICADA
//                    if(item==2){
//                        var cont =0;
//                        asistencia.just = 'No';
//                        for(var i=0;i<asistencia.compuesto.length;i++){
//                            if(asistencia.compuesto[i].justificada == 'No' && asistencia.compuesto[i].fecha == asistencia.fec 
//                               && asistencia.compuesto[i].Asignatura_has_Curso_has_Alumno_idAsignatura == asistencia.asign){
//                                asistencia.lista[cont] = asistencia.compuesto[i];
//                                cont++;
//                            }
//                        }
//                    }
//                    //TODAS
//                    if(item==3){
//                        var cont =0;
//                        asistencia.just = 0;
//                        for(var i=0;i<asistencia.compuesto.length;i++){
//                            if(asistencia.compuesto[i].Asignatura_has_Curso_has_Alumno_idAsignatura == asistencia.asign
//                               && asistencia.compuesto[i].fecha == asistencia.fec){
//                                asistencia.lista[cont] = asistencia.compuesto[i];
//                                cont++;
//                            }
//                        }
//                    }
//                }
//
            }

            
            //FILTRAR POR ASIGNATURA
            asistencia.selectAsignatura = function(idAsign){
                var aux = 0;
                asistencia.asig = idAsign;
                //Si ha sido cambiada solo la fecha
                if(asistencia.fec == 0){
                    asistencia.lista = [];
                    for(var i=0;i<asistencia.compuesto.length;i++){  
                        if(asistencia.compuesto[i].Asignatura_has_Curso_has_Alumno_idAsignatura == idAsign){
                                asistencia.lista[aux] = asistencia.compuesto[i];
                                aux++;
                        }
                    }                    
                }else{
                    var tam = 0;
                    asistencia.lista = [];
                    for(var i=0;i<asistencia.compuesto.length;i++){  
                        if(asistencia.compuesto[i].Asignatura_has_Curso_has_Alumno_idAsignatura == idAsign
                          && asistencia.compuesto[i].fecha == asistencia.fec){
                                asistencia.lista[tam] = asistencia.compuesto[i];
                                tam++;
                        }
                    }
                }
//                
//                //Si solo ha sido cambiada la justi
//                if(asistencia.just == 0){
//                    asistencia.lista = [];
//                    for(var i=0;i<asistencia.compuesto.length;i++){  
//                        if(asistencia.compuesto[i].Asignatura_has_Curso_has_Alumno_idAsignatura == idAsign){
//                                asistencia.lista[aux] = asistencia.compuesto[i];
//                                aux++;
//                        }
//                    }
//                }else{
//                    var tam = 0;
//                    asistencia.lista = [];
//                    for(var i=0;i<asistencia.compuesto.length;i++){  
//                        if(asistencia.compuesto[i].Asignatura_has_Curso_has_Alumno_idAsignatura == idAsign
//                          && asistencia.compuesto[i].justificada == asistencia.just){
//                                asistencia.lista[tam] = asistencia.compuesto[i];
//                                tam++;
//                        }
//                    }
//                }
                
//                //Si han sido modificados todos
//                if(asistencia.just == 0 && asistencia.fec == 0){
//                    asistencia.lista = [];
//                    for(var i=0;i<asistencia.compuesto.length;i++){  
//                        if(asistencia.compuesto[i].Asignatura_has_Curso_has_Alumno_idAsignatura == idAsign){
//                                asistencia.lista[aux] = asistencia.compuesto[i];
//                                aux++;
//                        }
//                    }
//                }else{
//                    var tam = 0;
//                    asistencia.lista = [];
//                    for(var i=0;i<asistencia.compuesto.length;i++){  
//                        if(asistencia.compuesto[i].Asignatura_has_Curso_has_Alumno_idAsignatura == idAsign
//                          && asistencia.compuesto[i].justificada == asistencia.just && asistencia.compuesto[i].fec == asistencia.fec){
//                                asistencia.lista[tam] = asistencia.compuesto[i];
//                                tam++;
//                        }
//                    }
//                }

            }
            
            asistencia.quitarAsignatura = function(){
                if(angular.isDefined($scope.first)){
                    delete $scope.first;
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
                
                asistencia.fec = dia+"-"+mes+"-"+anyo;
                asistencia.fechaParam = dia+mes+anyo;
                
                //Si ha sido cambiada solo la asignatura
                if(asistencia.asig == 0){
                    var aux = 0;
                    asistencia.lista = [];
                    for(var i=0;i<asistencia.compuesto.length;i++){  
                        if(asistencia.compuesto[i].fecha == asistencia.fec){
                                asistencia.lista[aux] = asistencia.compuesto[i];
                                aux++;
                        }
                    }                    
                }else{
                    var tam = 0;
                    asistencia.lista = [];
                    for(var i=0;i<asistencia.compuesto.length;i++){  
                        if(asistencia.compuesto[i].Asignatura_has_Curso_has_Alumno_idAsignatura == asistencia.asig
                          && asistencia.compuesto[i].fecha == asistencia.fec){
                                asistencia.lista[tam] = asistencia.compuesto[i];
                                tam++;
                        }
                    }
                }
                
//                //Si solo ha sido cambiada la justi
//                if(asistencia.just == 0){
//                    asistencia.lista = [];
//                    for(var i=0;i<asistencia.compuesto.length;i++){  
//                        if(asistencia.compuesto[i].fecha == asistencia.fec){
//                                asistencia.lista[aux] = asistencia.compuesto[i];
//                                aux++;
//                        }
//                    }
//                }else{
//                    var tam = 0;
//                    asistencia.lista = [];
//                    for(var i=0;i<asistencia.compuesto.length;i++){  
//                        if(asistencia.compuesto[i].justificada == asistencia.just 
//                           && asistencia.compuesto[i].fecha == asistencia.fec){
//                                asistencia.lista[tam] = asistencia.compuesto[i];
//                                tam++;
//                        }
//                    }
//                }
//                
//                //Si han sido modificados todos
//                if(asistencia.just == 0 && asistencia.asig == 0){
//                    asistencia.lista = [];
//                    for(var i=0;i<asistencia.compuesto.length;i++){  
//                        if(asistencia.compuesto[i].fecha == asistencia.fec){
//                                asistencia.lista[aux] = asistencia.compuesto[i];
//                                aux++;
//                        }
//                    }
//                }else{
//                    var tam = 0;
//                    asistencia.lista = [];
//                    for(var i=0;i<asistencia.compuesto.length;i++){  
//                        if(asistencia.compuesto[i].Asignatura_has_Curso_has_Alumno_idAsignatura == asistencia.asig
//                          && asistencia.compuesto[i].justificada == asistencia.just && asistencia.compuesto[i].fec == asistencia.fec){
//                                asistencia.lista[tam] = asistencia.compuesto[i];
//                                tam++;
//                        }
//                    }
//                }
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

    mensajeController.$inject = ['$scope', '$http'];
    function mensajeController($scope, $http){
        var idAlumno = sessionStorage.getItem('idAlumno');
        if(user == null){
            idAlumnoParam="";
            bool = true;
        }else{
            idAlumnoParam=idAlumno;
            bool = false;
        }
        if(bool == false){
            var mensaje = this;
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje/"+idAlumnoParam+"/format/json",
                method: "GET",
                params: {idAlumno: idAlumnoParam}
            })
             .then(function(response) {
                mensaje.compuesto = angular.fromJson(response.data);     
                console.log(mensaje.compuesto[0])
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
                mensaje.asignaturas = angular.fromJson(response.data);
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
            examAntic = idAlumnoParam + "pasados/true";
            evaluacion.numero = "X";
            //LLAMADA PARA COGER EXAMENES ANTIGUOAS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/examen/examen/"+examAntic+"/format/json",
                method: "GET",
                params: {idAlumno: idAlumnoParam,
                         pasados: true}
            })
             .then(function(response) {
                evaluacion.compuesto = angular.fromJson(response.data); 
                evaluacion.lista = evaluacion.compuesto;
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
                console.log()
            }, function errorCallback(response) {
                alert()
            });
            
            //LLAMADA PARA RECOGER PROXIMOS EXAMENES
            examProx = idAlumnoParam + "proximos/true";
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/examen/examen/"+examProx+"/format/json",
                method: "GET",
                params: {idAlumno: idAlumnoParam,
                         proximos: true}
            })
             .then(function(response) {
                evaluacion.proxCompuesto = angular.fromJson(response.data); 
                evaluacion.proxLista = evaluacion.proxCompuesto;
                console.log(evaluacion.proxCompuesto[0])
                }, function errorCallback(response) {
                alert()
            });
            
            
            evaluacion.id = 0;
            evaluacion.ev = 0;
            //FILTRAR POR ASIGNATURA
            evaluacion.selectAsignatura = function(idAsign, epoca){
                if(epoca == false){
                    var aux = 0;
                    evaluacion.id = idAsign;

                    if(evaluacion.ev == 0){
                        evaluacion.lista = [];
                        for(var i=0;i<evaluacion.compuesto.length;i++){  
                            if(evaluacion.compuesto[i].idAsignatura == idAsign){
                                    evaluacion.lista[aux] = evaluacion.compuesto[i];
                                    aux++;
                            }
                        }
                    }else{
                        tam = 0;
                        evaluacion.lista = [];
                        for(var i=0;i<evaluacion.compuesto.length;i++){  
                            if(evaluacion.compuesto[i].idAsignatura == idAsign 
                               && evaluacion.compuesto[i].evaluacion == evaluacion.ev){
                                    evaluacion.lista[tam] = evaluacion.compuesto[i];
                                    tam++;
                            }
                        }
                    }
                }else{
                    num = 0;
                    evaluacion.proxLista = [];
                    for(var i=0;i<evaluacion.proxCompuesto.length;i++){  
                        if(evaluacion.proxCompuesto[i].idAsignatura == idAsign){
                                evaluacion.proxLista[num] = evaluacion.proxCompuesto[i];
                                    num++;
                        }
                    }
                }
                    
            }
            //FILTRAR POR EVALUACION
            evaluacion.selectEvaluacion = function(index){
                var con = 0;
                evaluacion.ev = index;
                evaluacion.numero = index;
                
                if(evaluacion.id == 0){
                    evaluacion.lista = [];
                    for(var i=0;i<evaluacion.compuesto.length;i++){  
                        if(evaluacion.compuesto[i].evaluacion == index){
                                evaluacion.lista[con] = evaluacion.compuesto[i];
                                con++;
                        }
                    }
                }else{
                    tam = 0;
                    evaluacion.lista = [];
                    for(var i=0;i<evaluacion.compuesto.length;i++){  
                        if(evaluacion.compuesto[i].idAsignatura == evaluacion.id 
                           && evaluacion.compuesto[i].evaluacion == index){
                                evaluacion.lista[tam] = evaluacion.compuesto[i];
                                tam++;
                        }
                    }
                }
            }

        }
    }

    expedienteController.$inject = ['$scope', '$http'];
    function expedienteController($scope, $http){
        var idAlumno = sessionStorage.getItem('idAlumno');
        if(user == null){
            idAlumnoParam="";
            bool = true;
        }else{
            idAlumnoParam=idAlumno;
            bool = false;
        }
        if(bool == false){
            var expediente = this;
            //LLAMADA PARA COGER EXAMENES ANTIGUOAS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/alumno/alumno/"+idAlumnoParam+"/format/json",
                method: "GET",
                params: {id: idAlumnoParam}
            })
             .then(function(response) {
                expediente.compuesto = angular.fromJson(response.data); 
                expediente.lista = expediente.compuesto;
                console.log(expediente.compuesto)
                }, function errorCallback(response) {
                alert()
            });
        }
    }

    tareaController.$inject = ['$scope', '$http'];
    function tareaController($scope, $http){
        var idAlumno = sessionStorage.getItem('idAlumno');
        if(user == null){
            idAlumnoParam="";
            bool = true;
        }else{
            idAlumnoParam=idAlumno;
            bool = false;
        }
        if(bool == false){
            var tarea = this;
            tareaSin = idAlumnoParam+"sinhacer/true";
            //LLAMADA PARA COGER TAREAS ANTIGUOAS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/tarea/tarea/"+tareaSin+"/format/json",
                method: "GET",
                params: {idAlumno: idAlumnoParam,
                         sinhacer: true}
            })
             .then(function(response) {
                tarea.compuesto = angular.fromJson(response.data); 
                
                tarea.lista = tarea.compuesto;
                }, function errorCallback(response) {
                console.log("NO HAY NO HECHAS")
            });
        
            
            tareaHec = idAlumnoParam+"hechas/true";
            //LLAMADA PARA COGER EXAMENES ANTIGUOAS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/tarea/tarea/"+tareaHec+"/format/json",
                method: "GET",
                params: {idAlumno: idAlumnoParam,
                         hechas: true}
            })
             .then(function(response) {
                tarea.compuestoHec = angular.fromJson(response.data); 
                tarea.listaHec = tarea.compuestoHec;
                //console.log(tarea.compuestoHec)
                }, function errorCallback(response) {
                console.log("NO HAY HECHAS")
            });
            
            //PASAR TAREA A HECHA
            tarea.hecha = function(index, id){
                //PONER TAREA A HECHA
                tarea.marcado = false;
                $http.put("http://localhost/prueba_api/alpha2/index.php/tarea/tarea",
                      {idAlumno: idAlumnoParam, idTarea: id, completada: 1}
                ).then(function(response){
                    tarea.put = angular.fromJson(response.data); 
                    console.log(tarea.put.message)
                    if(tarea.put.message){
                        tarea.marcado = true;
                    }
                });
            }
            
        }
    }


