    var sesionLocal = false;
    var sesionSesion = false;

    if(typeof localStorage.user == 'undefined' || localStorage.user == "null"){
        console.log("hola1")
        if(typeof sessionStorage.getItem('user2') == 'undefined' || sessionStorage.getItem('user2') == null){
        console.log("hola2")
            window.location.replace("/prueba_api/SITIO/LandingPage/index.html");
        }else{
            sesionSesion = true;
        }     
    }else{
        sesionLocal = true; 
    }


    angular.module('padreApp', ['htmlToPdfSave'])
    .controller('entrarController', entrarController)
    .controller('tareaController', tareaController)
    .controller('navController', navController)
    .controller('principalController', principalController)
    .controller('anuncioAlumController', anuncioAlumController)
    .controller('evaluacionController', evaluacionController)
    .controller('expedienteController', expedienteController)
    .controller('asistenciaController', asistenciaController)
    .controller('justifiController', justifiController)
    .controller('autorizacionController', autorizacionController)
    .controller('msgHechosController', msgHechosController)
    .controller('mensajeController', mensajeController)
    .controller('contrasenyaController', contrasenyaController)
    .controller('mensajeNuevoController', mensajeNuevoController);

    principalController.$inject = ['$scope', '$http', '$window'];
    function principalController($scope, $http, $window){
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
            idPadre = localStorage.idPadre;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
            idPadre=sessionStorage.getItem('idPadre');
        }
        var prin = this;
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado/"+SUser+"/format/json", 
            method: "GET",
            params: {idAlumno: idAlumno}
        })
         .then(function(response) {
            prin.total = angular.fromJson(response.data);
            for(var j=0;j<prin.total.length;j++){
                if(prin.total[j].leidoPadre == false && typeof prin.total[j].idAsignatura != 'undefined'){
                    prin.anucnio = true;
                }
            }
         }, function errorCallback(response) {
                console.log(response)    
        }); 

        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
            method: "GET",
            params: {idPadre: idPadre, noleidos: 1}
        })
         .then(function(response) {
            prin.noLeidos = angular.fromJson(response.data);
            prin.mensaje = true;
        }, function errorCallback(response) {
                    
            });
    }  
        
    navController.$inject = ['$scope', '$http', '$window'];
    function navController($scope, $http, $window){        
        var nav = this;
        
        nav.user1 = "";
        if(sesionLocal){
            nav.user1 = localStorage.user;
        }
        if(sesionSesion){  
            nav.user1 = sessionStorage.getItem('user2');
        }
        SUser="usuario/"+nav.user1

        //LLAMADA HTTP
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/padre/padre/", 
            method: "GET",
            params: {usuario: nav.user1}
        })
         .then(function(response) {
            nav.compuesto = angular.fromJson(response.data);
            nav.nombre = nav.compuesto.nombre;
            nav.apellidos = nav.compuesto.apellidos;
            nav.telefono = nav.compuesto.telefono;
            nav.email = nav.compuesto.email;
            if(sesionLocal){
                localStorage.setItem('idPadre', nav.compuesto.idPadre);
                localStorage.setItem('nombrePadre', nav.nombre);
                localStorage.setItem('apellidosPadre', nav.apellidos);
            }
            if(sesionSesion){ 
                sessionStorage.setItem('idPadre', nav.compuesto.idPadre);
                sessionStorage.setItem('nombrePadre', nav.nombre);
                sessionStorage.setItem('apellidosPadre', nav.apellidos);
            }
        }, function errorCallback(response) {
            //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
        });
        
        nav.seleccHijo = function(id){
            if(sesionLocal)
                localStorage.setItem('idAlumno', id);
            if(sesionSesion)    
                sessionStorage.setItem('idAlumno', id);
        }
        
        //LOG OUT
        nav.logOut = function (){
            if(sesionLocal){
                localStorage.setItem('user', null);
                $window.location.href = '/prueba_api/SITIO/LandingPage/index.html';
            }
            if(sesionSesion){  
                sessionStorage.setItem('user2', null);
                $window.location.href = '/prueba_api/SITIO/LandingPage/index.html';
            }
        }
    };

    contrasenyaController.$inject = ['$scope', '$http', '$window'];
    function contrasenyaController($scope, $http, $window){        
        var contra = this;

        if(sesionLocal){
            user1 = localStorage.user;
            idPadre = localStorage.idPadre;
        }
        if(sesionSesion){
            user1 = sessionStorage.getItem('user2');
            idPadre = sessionStorage.getItem('idPadre');
        }
        //LLAMADA HTTP
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/padre/padre/", 
            method: "GET",
            params: {usuario: user1}
        })
         .then(function(response) {
            contra.compuesto = angular.fromJson(response.data);
            contra.contrasenyaActual = contra.compuesto.password;
            console.log( contra.compuesto)
        }, function errorCallback(response) {
            //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
        });

        contra.cambiarCon = function(){
            if(contra.contrasenyaActual == contra.contrasenyaAnt){
               if(contra.contrasenyaNueva1 == contra.contrasenyaNueva2){
                   contra.inco = false;
                   contra.coin = false;
                    $http.put("http://localhost/prueba_api/alpha2/index.php/padre/padre",
                            {idPadre: idPadre, password: contra.contrasenyaNueva1}
                    ).then(function(response){
                        contra.cambiada = true;
                    });
               }else{
                   contra.coin = true;
               }
            }else{
                contra.inco = true;
            }
        }
    };

    entrarController.$inject = ['$scope', '$http', '$window'];
    function entrarController($scope, $http, $window){        
        var nav = this;
        
        nav.user1 = "";
        if(sesionLocal){
            nav.user1 = localStorage.user;
        }
        if(sesionSesion){  
            nav.user1 = sessionStorage.getItem('user2');
        }
        
        SUser="usuario/"+nav.user1

        //LLAMADA HTTP
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/padre/padre/", 
            method: "GET",
            params: {usuario: nav.user1}
        })
         .then(function(response) {
            nav.compuesto = angular.fromJson(response.data);
            nav.nombre = nav.compuesto.nombre;
            nav.apellidos = nav.compuesto.apellidos;
            nav.idPadre = nav.compuesto.idPadre;
            if(sesionLocal){
                localStorage.setItem('idPadre', nav.compuesto.idPadre);
            }
            if(sesionSesion){ 
                sessionStorage.setItem('idPadre', nav.compuesto.idPadre);
            } 
            //LLAMADA PARA RECOGER LOS HIJSOS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/padre/padre/", 
                method: "GET",
                params: {idPadre: nav.idPadre, hijos: 1}
            })
             .then(function(response) {
                nav.compuesto = angular.fromJson(response.data);
                nav.hijos = nav.compuesto;
                nav.id = nav.hijos[0].idAlumno;
                if(nav.hijos.length==1){
                    if(sesionLocal)
                        localStorage.setItem('idAlumno', nav.id);
                    if(sesionSesion)    
                        sessionStorage.setItem('idAlumno', nav.id);
                    $window.location.href = '/prueba_api/SITIO/Padre/pagePadre.html';
                }
            }, function errorCallback(response) {
                //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
            });
        }, function errorCallback(response) {
            //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
        });
        
        nav.seleccHijo = function(id){
            if(sesionLocal)
                localStorage.setItem('idAlumno', id);
            if(sesionSesion)    
                sessionStorage.setItem('idAlumno', id);
        }
        
        //LOG OUT
        nav.logOut = function (){
            if(sesionLocal){
                localStorage.setItem('user', "null");
                $window.location.href = '/prueba_api/SITIO/LandingPage/index.html';
            }
            if(sesionSesion){  
                sessionStorage.setItem('user2', "null");
                $window.location.href = '/prueba_api/SITIO/LandingPage/index.html';
            }
        }
    };

    tareaController.$inject = ['$scope', '$http'];
    function tareaController($scope, $http){
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
        }
            idAlumnoParam="idAlumno/"+idAlumno;
            var tarea = this;
            tareaSin = idAlumnoParam+"/sinhacer/true";
            //LLAMADA PARA COGER TAREAS ANTIGUOAS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/tarea/tarea/"+tareaSin+"/format/json",
                method: "GET",
                params: {idAlumno: idAlumno,
                         sinhacer: true}
            })
             .then(function(response) {
                tarea.compuesto = angular.fromJson(response.data); 
                
                tarea.lista = tarea.compuesto;
                }, function errorCallback(response) {
                console.log("NO HAY NO HECHAS")
                tarea.fin = true;
            });
        
            
            tareaHec = idAlumnoParam+"hechas/true";
            //LLAMADA PARA COGER tareas ANTIGUOAS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/tarea/tarea/"+tareaHec+"/format/json",
                method: "GET",
                params: {idAlumno: idAlumno,
                         hechas: true}
            })
             .then(function(response) {
                tarea.compuestoHec = angular.fromJson(response.data); 
                tarea.listaHec = tarea.compuestoHec;
                //console.log(tarea.compuestoHec)
                }, function errorCallback(response) {
                console.log("NO HAY HECHAS")
                tarea.mim = true;
            });
            
            //PASAR TAREA A HECHA
            tarea.hecha = function(index, id, accion){
                //PONER TAREA A HECHA
                if(accion){
                    tarea.marcado = false;
                    $http.put("http://localhost/prueba_api/alpha2/index.php/tarea/tarea",
                          {idAlumno: idAlumno, idTarea: id, completada: 1}
                    ).then(function(response){
                        tarea.put = angular.fromJson(response.data); 
                        if(tarea.put.message){
                            tarea.marcado = true;
                        }
                    });
                }else{
                    //PUT DE QUIOTAR
                    $http.put("http://localhost/prueba_api/alpha2/index.php/tarea/tarea",
                          {idAlumno: idAlumno, idTarea: id, noCompletada: 1}
                    ).then(function(response){
                        tarea.put = angular.fromJson(response.data); 
                        if(tarea.put.message){
                            tarea.marcado = false;
                        }
                    });
                }

            }
    }

    anuncioAlumController.$inject = ['$scope', '$http'];
    function anuncioAlumController($scope, $http){
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
        }
        SUser="id/"+idAlumno;
        
            var anuncio = this;
            
            anuncio.llamada = function() {
                $http({
                    url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado/"+SUser+"/format/json", 
                    method: "GET",
                    params: {idAlumno: idAlumno}
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
//                    leidoPadre = false;
//                    for(var j=0;j<anuncio.total.length;j++){
//                        if(typeof anuncio.total[j].leidoPadre == 'undefined'){
//                            anuncio.total[j].push(leidoPadre);
//                        }
//                    }
                    anuncio.texto = [];
                    for(var i=0;i<anuncio.total.length;i++){
                        if(anuncio.total[i].leidoPadre == true){
                            anuncio.texto[i] = "Expandir";
                        }else{
                            anuncio.texto[i] = "Esconder";
                        }
                    }
                    }, function errorCallback(response) {
                    alert(response)
                    
                });                
            }
            
            anuncio.llamada();
            anuncio.ocultar = function(index){
                    anuncio.llamada();
                
                    for(var i=0;i<anuncio.total.length;i++){
                        if(anuncio.total[i].idComunicado == index){
                            //Esta leido
                            if(anuncio.total[i].leidoPadre == true){
                                $http.put("http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado",
                                      {idAlumno: idAlumno, idComunicado: index, noleidoPadre: true}
                                ).then(function(response){
                                    anuncio.llamada();
                                    anuncio.texto[i] = "Expandir"; 
                                });
                            }else{ //No leido
                                $http.put("http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado",
                                      {idAlumno: idAlumno, idComunicado: index, leidoPadre: true}
                                ).then(function(response){
                                    anuncio.llamada();
                                    anuncio.texto[i] = "Esconder";
                                    //anuncio.put = angular.fromJson(response.data); 
                                });
                            }
                        }
                    }


                
            }
    };

    evaluacionController.$inject = ['$scope', '$http'];
    function evaluacionController($scope, $http){
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
        }
            idAlumnoParam="idAlumno/"+idAlumno;
            var evaluacion = this;
            examAntic = idAlumnoParam + "/pasados/true";
            evaluacion.numero = "X";
            //LLAMADA PARA COGER EXAMENES ANTIGUOAS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/examen/examen/",
                method: "GET",
                params: {idAlumno: idAlumno,
                         pasados: true}
            })
             .then(function(response) {
                evaluacion.compuesto = angular.fromJson(response.data); 
                evaluacion.lista = evaluacion.compuesto;
                console.log(evaluacion.compuesto[0])
                }, function errorCallback(response) {
                    console.log("No hay examenes")
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
                conosle.log("No hay asignaturas")
            });
            
            //LLAMADA PARA RECOGER PROXIMOS EXAMENES
            examProx = idAlumnoParam + "proximos/true";
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/examen/examen/"+examProx+"/format/json",
                method: "GET",
                params: {idAlumno: idAlumno,
                         proximos: true}
            })
             .then(function(response) {
                evaluacion.proxCompuesto = angular.fromJson(response.data); 
                evaluacion.proxLista = evaluacion.proxCompuesto;
                console.log(evaluacion.proxCompuesto[0])
                }, function errorCallback(response) {
                    evaluacion.noHay = true;
                    console.log("No hay exmanes")
            });
            
            
            evaluacion.id = 0;
            evaluacion.ev = 0;
            //FILTRAR POR ASIGNATURA
            evaluacion.selectAsignatura = function(){
                evaluacion.arr = evaluacion.selectedVal.split(',')
                             
                evaluacion.id = evaluacion.arr[0];
                var epoca = evaluacion.arr[1];
                if(epoca == "false"){
                    var aux = 0;

                    if(evaluacion.ev == 0){
                        evaluacion.lista = [];
                        for(var i=0;i<evaluacion.compuesto.length;i++){  
                            if(evaluacion.compuesto[i].idAsignatura == evaluacion.id){
                                    evaluacion.lista[aux] = evaluacion.compuesto[i];
                                    aux++;
                            }
                        }
                    }else{
                        tam = 0;
                        evaluacion.lista = [];
                        for(var i=0;i<evaluacion.compuesto.length;i++){  
                            if(evaluacion.compuesto[i].idAsignatura == evaluacion.id 
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
                        if(evaluacion.proxCompuesto[i].idAsignatura == evaluacion.id){
                                evaluacion.proxLista[num] = evaluacion.proxCompuesto[i];
                                    num++;
                        }
                    }
                }
                    
            }
            //FILTRAR POR EVALUACION
            evaluacion.selectEvaluacion = function(){
                var con = 0;
                evaluacion.ev = evaluacion.selectedItem;
                evaluacion.numero = evaluacion.selectedItem;
                
                if(evaluacion.id == 0){
                    evaluacion.lista = [];
                    for(var i=0;i<evaluacion.compuesto.length;i++){  
                        if(evaluacion.compuesto[i].evaluacion == evaluacion.selectedItem){
                                evaluacion.lista[con] = evaluacion.compuesto[i];
                                con++;
                        }
                    }
                }else{
                    tam = 0;
                    evaluacion.lista = [];
                    for(var i=0;i<evaluacion.compuesto.length;i++){  
                        if(evaluacion.compuesto[i].idAsignatura == evaluacion.id 
                           && evaluacion.compuesto[i].evaluacion == evaluacion.selectedItem){
                                evaluacion.lista[tam] = evaluacion.compuesto[i];
                                tam++;
                        }
                    }
                }
            }
    }

    expedienteController.$inject = ['$scope', '$http'];
    function expedienteController($scope, $http){
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
        }
            idAlumnoParam="idAlumno/"+idAlumno+"/datoscurso/true";
            var expediente = this;
            //LLAMADA PARA COGER DATOS DE ALUMNO
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/alumno/alumno/"+idAlumnoParam+"/format/json",
                method: "GET",
                params: {id: idAlumno,
                         datoscurso: true}
            })
             .then(function(response) {
                expediente.compuesto = angular.fromJson(response.data); 
                expediente.lista = expediente.compuesto;
                }, function errorCallback(response) {
                alert()
            });
            
            //LLAMADA PARA COGERHISTORICO DE AÑOS
            idAlumnoParam2=idAlumno+"/soloanyos/true";
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/curso/curso/"+idAlumnoParam2+"/format/json",
                method: "GET",
                params: {idAlumno: idAlumno,
                         soloanyos: true}
            })
             .then(function(response) {
                expediente.respuesta = angular.fromJson(response.data); 
                }, function errorCallback(response) {
                alert()
            });
            
            expediente.selec = function(any){
                //LLAMADA PARA COGERHISTORICO DE CURSOS
                idAlumnoParam3 = idAlumno+ "/todas/1";
                expediente.mostrar = true;
                expediente.nCurso = expediente.selectedItem;
                $http({
                    url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/"+idAlumnoParam3+"/format/json",
                    method: "GET",
                    params: {idAlumno: idAlumno,
                             todas: 1}
                })
                 .then(function(response) {
                    expediente.respuesta3 = angular.fromJson(response.data); 
                    expediente.hist = expediente.respuesta3;
                    expediente.listHist = [];
                    var aux = 0;
                    for(i=0;i<expediente.hist.length;i++){
                        if(expediente.hist[i].curso == expediente.selectedItem){
                            expediente.listHist[aux] = expediente.hist[i];
                            console.log(expediente.listHist[aux])
                            aux++;
                        }
                    }
                    }, function errorCallback(response) {
                    alert()
                });
            }
    }

    asistenciaController.$inject = ['$scope', '$http', '$window'];
    function asistenciaController($scope, $http, $window){
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
        }
            idAlumnoParam="idAlumno/"+idAlumno;
            var asistencia = this;
            //LLAMADA PARA RECOGER LAS FALTAS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asistencia/asistencia/"+idAlumno+"/format/json", 
                method: "GET",
                params: {idAlumno: idAlumno}
            })
             .then(function(response) {
                asistencia.compuesto = angular.fromJson(response.data);
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
                        if(asistencia.compuesto[i].justificada == '1'){
                            asistencia.lista[cont] = asistencia.compuesto[i];
                            cont++;
                        }
                    }
                }
                //NO JUSTIFICADA
                if(item==2){
                    asistencia.just = 'No';
                    for(var i=0;i<asistencia.compuesto.length;i++){
                        if(asistencia.compuesto[i].justificada == '0'){
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
            }

            
            //FILTRAR POR ASIGNATURA
            asistencia.selectAsignatura = function(){
                var aux = 0;
                //Si ha sido cambiada solo la fecha
                if(asistencia.fec == 0){
                    asistencia.lista = [];
                    for(var i=0;i<asistencia.compuesto.length;i++){
                        if(asistencia.compuesto[i].idAsignatura == asistencia.selectedItem){
                                asistencia.lista[aux] = asistencia.compuesto[i];
                                aux++;
                        }
                    }                    
                }else{
                    var tam = 0;
                    asistencia.lista = [];
                    for(var i=0;i<asistencia.compuesto.length;i++){  
                        if(asistencia.compuesto[i].idAsignatura == asistencia.selectedItem
                          && asistencia.compuesto[i].fecha == asistencia.fec){
                                asistencia.lista[tam] = asistencia.compuesto[i];
                                tam++;
                        }
                    }
                }
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
                        if(asistencia.compuesto[i].idAsignatura == asistencia.asig
                          && asistencia.compuesto[i].fecha == asistencia.fec){
                                asistencia.lista[tam] = asistencia.compuesto[i];
                                tam++;
                        }
                    }
                }
            }
            
            asistencia.limpiarFecha = function(){
                $scope.fecha = null;
            }
         
    };

    justifiController.$inject = ['$scope', '$http', '$window'];
    function justifiController($scope, $http, $window){
        var just = this;
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
            just.nombre = localStorage.nombrePadre;
            just.apellidos = localStorage.apellidosPadre;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
            just.nombre = sessionStorage.getItem('nombrePadre');
            just.apellidos = sessionStorage.getItem('apellidosPadre');
        }
            just.enviado = false;
            just.date = new Date();
            //LLAMADA PARA RECOGER ASIGNATURAS DEL ALUMNO
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/", 
                method: "GET",
                params: {idAlumno: idAlumno}
            })
             .then(function(response) {
                just.asignaturas = angular.fromJson(response.data);
            }, function errorCallback(response) {
                console.log("Errir")
            });
            
            //LLAMADA PARA RECOGER INFO DEL ALUMNO
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/alumno/alumno/", 
                method: "GET",
                params: {id: idAlumno, datoscurso: 1}
            })
             .then(function(response) {
                just.alumno = angular.fromJson(response.data);
                just.nombreAlum = just.alumno.nombre;
                just.apellidosAlum = just.alumno.apellidos;
                just.nombreCurso = just.alumno.nombreCurso;
                just.grupo = just.alumno.grupo;
            }, function errorCallback(response) {
                console.log("Errir")
            });

                //LLAMADA PARA RECOGER LAS FALTAS
                $http({
                    url: "http://localhost/prueba_api/alpha2/index.php/asistencia/asistencia/", 
                    method: "GET",
                    params: {idAlumno: idAlumno}
                })
                 .then(function(response) {
                    just.faltas = angular.fromJson(response.data);
                }, function errorCallback(response) {

                });
        
            //LLAMADA PARA RECOGER LOS JUSTIFICANTES DEL PROFESOR
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asistencia/asistencia/", 
                method: "GET",
                params: {idAlumno: idAlumno, justificantes: 1}
            }).then(function(response){
                just.compuesto = angular.fromJson(response.data);
                just.justificantes = just.compuesto;
                        console.log(just.justificantes)
                var con = 0;
                just.justi = [];
                for(var i=0;i<just.justificantes.length;i++){
                    if(just.justificantes[i].justificada == 0){
                        just.justi[con] = just.justificantes[i];
                        con++;
                    }
                }
            })
            just.mostrar = true;
                    //FILTRAR POR ASIGNATURA
            just.selectAsignatura = function(){
                var aux = 0;
                just.profesor = "";
                for(var i=0;i<just.faltas.length;i++){
                    if(just.faltas[i].idAsignatura == just.selectedItem){
                        just.profesor = just.faltas[i].nombreProfesor;
                        just.idAsignatura = just.faltas[i].idAsignatura;
                        just.mostrar = false;
                        just.falta = false;
                        //LLAMADA PARA RECOGER LAS FALTAS
                        $http({
                            url: "http://localhost/prueba_api/alpha2/index.php/asistencia/asistencia/", 
                            method: "GET",
                            params: {idAlumno: idAlumno}
                        })
                         .then(function(response) {
                            just.compuesto = angular.fromJson(response.data);
                            var aux=0;
                            just.lista = [];
                            for(var i=0;i<just.compuesto.length;i++){
                                if(just.compuesto[i].idAsignatura == just.idAsignatura){
                                    just.lista[aux] = just.compuesto[i];
                                    aux++;
                                }
                            }

                        }, function errorCallback(response) {

                        });
                    }else{
                        just.mostrar = true;
                        just.falta = true;
                    }
                }
            }
        
            just.selectFecha = function(){
                just.idAsistencia = just.selectedId;
                just.fec = "";
                for(var i=0;i<just.lista.length;i++){
                    if(just.lista[i].idAsistencia == just.idAsistencia){
                        just.fec = just.lista[i].fecha;
                    }
                }
            }
            
            just.crearJustificante = function(){
                $http({
                    url: "http://localhost/prueba_api/alpha2/index.php/asistencia/asistencia/", 
                    method: "PUT",
                    data: {idAsistencia: just.idAsistencia, justificada: 0, justificante: just.descrip}
                }).success(function(response){
                    just.justifica = true;
                    just.enviado = true;
                })
            }
         
    };

    autorizacionController.$inject = ['$scope', '$http', '$window'];
    function autorizacionController($scope, $http, $window){
        var auto = this;
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
            auto.nombre = localStorage.nombrePadre;
            auto.apellidos = localStorage.apellidosPadre;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
            auto.nombre = sessionStorage.getItem('nombrePadre');
            auto.apellidos = sessionStorage.getItem('apellidosPadre');
        }
            //LLAMADA PARA RECOGER AUTORIZACIONES DEL ALUMNO FIRMADAS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado/", 
                method: "GET",
                params: {idAlumno: idAlumno, tipo: 2, firmadas: 1}
            })
             .then(function(response) {
                auto.autorizacionesFirmadas = angular.fromJson(response.data);
            }, function errorCallback(response) {
                auto.firm = true;
            });
        
            //LLAMADA PARA RECOGER AUTORIZACIONES DEL ALUMNO NO FIRMADAS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado/", 
                method: "GET",
                params: {idAlumno: idAlumno, tipo: 2, nofirmadas: 1}
            })
             .then(function(response) {
                auto.autorizacionesNoFirmadas = angular.fromJson(response.data);
            }, function errorCallback(response) {
                auto.noFirmada = true;
            });
        
            //LLAMADA PARA RECOGER INFO DEL ALUMNO
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/alumno/alumno/", 
                method: "GET",
                params: {id: idAlumno, datoscurso: 1}
            })
             .then(function(response) {
                auto.alumno = angular.fromJson(response.data);
                auto.nombreAlum = auto.alumno.nombre;
                auto.apellidosAlum = auto.alumno.apellidos;
                auto.nombreCurso = auto.alumno.nombreCurso;
                auto.grupo = auto.alumno.grupo;
            }, function errorCallback(response) {
                console.log("Errir")
            });
        
            auto.firmar = function(idC){
                     auto.firmada = true;
                $http.put("http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado",
                 {idAlumno: idAlumno, idComunicado: idC, firmado: 1}
                ).then(function(response){
                     auto.firmada = true;
                     auto.put = angular.fromJson(response.data); 
                     if(auto.put.message){
                        //LLAMADA PARA RECOGER AUTORIZACIONES DEL ALUMNO NO FIRMADAS
                        $http({
                            url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado/", 
                            method: "GET",
                            params: {idAlumno: idAlumno, tipo: 2, nofirmadas: 1}
                        })
                         .then(function(response) {
                            auto.autorizacionesNoFirmadas = angular.fromJson(response.data);
                        }, function errorCallback(response) {
                            auto.noFirmada = true;
                        });

                        //LLAMADA PARA RECOGER AUTORIZACIONES DEL ALUMNO FIRMADAS
                        $http({
                            url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado/", 
                            method: "GET",
                            params: {idAlumno: idAlumno, tipo: 2, firmadas: 1}
                        })
                         .then(function(response) {
                            auto.autorizacionesFirmadas = angular.fromJson(response.data);
                            auto.firm = false;
                        }, function errorCallback(response) {
                             auto.firm = true;
                        });
                    }

                 });
            }
    };

    mensajeController.$inject = ['$scope', '$http', '$window'];
    function mensajeController($scope, $http, $window){
        var mensaje = this;
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
            idPadre = localStorage.idPadre;
            mensaje.nombre = localStorage.nombrePadre;
            mensaje.apellidos = localStorage.apellidosPadre;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
            idPadre = sessionStorage.getItem('idPadre');
            mensaje.nombre = sessionStorage.getItem('nombrePadre');
            mensaje.apellidos = sessionStorage.getItem('apellidosPadre');
        }
            
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje/",
                method: "GET",
                params: {idPadre: idPadre,
                         noleidos: 1}
            })
             .then(function(response) {
                mensaje.noLeidos = angular.fromJson(response.data);     
                mensaje.mensaje = true;
                }, function errorCallback(response) {
                 mensaje.vacio = true;
            });
        
            mensaje.selectDatos = function(idProfesor, idAsignatura, profesor, asignatura){
                if(sesionLocal){
                    localStorage.setItem('profesor', profesor);
                    localStorage.setItem('asignatura', asignatura);
                    localStorage.setItem('idProfesor2', idProfesor);
                    localStorage.setItem('idAsignatura', idAsignatura);
                }
                if(sesionSesion){
                    sessionStorage.setItem('profesor', profesor);
                    sessionStorage.setItem('asignatura', asignatura);
                    sessionStorage.setItem('idProfesor2', idProfesor);
                    sessionStorage.setItem('idAsignatura', idAsignatura);
                }
            }
            
            mensaje.crearMensaje = function(idProfe, asunt, idMens){
                //LLAMADA PARA CREAR MENSAJE
                $http.post("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                              {emisor: "pa", idPadre: idPadre, receptor: "pro", 
                               idProfesor: idProfe, asunto: asunt, texto: mensaje.formMensaje}
                ).then(function(response){
                    $http.put("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                                  {idMensaje: idMens, idPadre: idPadre, leido: 1}
                    ).then(function(response){
                        //$route.reload();
                        $window.location.reload();
                    })
                })
            }
            
            mensaje.marcarLeido = function(id){
                $http.put("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                              {idMensaje: id, idPadre: idPadre, leido: 1}
                ).then(function(response){
                    
                })
            }
        
    }

    mensajeNuevoController.$inject = ['$scope', '$http', '$window'];
    function mensajeNuevoController($scope, $http, $window){
        var nuevo = this;
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
            idPadre = localStorage.idPadre;
            nuevo.nombre = localStorage.nombrePadre;
            nuevo.apellidos = localStorage.apellidosPadre;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
            idPadre = sessionStorage.getItem('idPadre');
            nuevo.nombre = sessionStorage.getItem('nombrePadre');
            nuevo.apellidos = sessionStorage.getItem('apellidosPadre');
        }
            noLei="idAlumno/"+idAlumno+"/noleidos/1";
            
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje/",
                method: "GET",
                params: {idPadre: idPadre,
                         noleidos: 1}
            })
             .then(function(response) {   
                nuevo.mensaje = true;
                }, function errorCallback(response) {
            });
        
//            //LLAMADA PARA RECOGER ASIGNATURAS DEL ALUMNO
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/", 
                method: "GET",
                params: {idAlumno: idAlumno}
            })
             .then(function(response) {
                nuevo.listAsignaturas = angular.fromJson(response.data);
            }, function errorCallback(response) {
                console.log("No hay asignaturas")
            });
        
            nuevo.selectAsig = function(){
                nuevo.arr = nuevo.selectedItem.split(',')
                             
                nuevo.profesor = nuevo.arr[0];
                nuevo.idAsignatura = nuevo.arr[1];
                nuevo.idProfesor = nuevo.arr[2];
                nuevo.nombreAsignatura = nuevo.arr[3];
                nuevo.mostrar=false;
            }
            
            nuevo.crearMensaje = function(){
                //LLAMADA PARA CREAR MENSAJE
                $http.post("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                              {emisor: "pa", idPadre: idPadre, receptor: "pro", 
                               idProfesor: nuevo.idProfesor, asunto: nuevo.asunto, texto: nuevo.texto,
                               idAsignatura: nuevo.idAsignatura}
                ).then(function(response){
                    console.log("enviado")
                })
            }
    }

    msgHechosController.$inject = ['$scope', '$http', '$window'];
    function msgHechosController($scope, $http, $window){
        var msghechos = this;
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
            idPadre = localStorage.idPadre;
            msghechos.nombre = localStorage.nombrePadre;
            msghechos.apellidos = localStorage.apellidosPadre;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
            idPadre = sessionStorage.getItem('idPadre');
            msghechos.nombre = sessionStorage.getItem('nombrePadre');
            msghechos.apellidos = sessionStorage.getItem('apellidosPadre');
        }
            Lei="idAlumno/"+idAlumno+"/leidos/1";
            
            
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje/",
                method: "GET",
                params: {idPadre: idPadre,
                         noleidos: 1}
            })
             .then(function(response) {   
                msghechos.mensaje = true;
                }, function errorCallback(response) {
            });
        
//            //LLAMADA PARA RECOGER ASIGNATURAS DEL ALUMNO
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/", 
                method: "GET",
                params: {idAlumno: idAlumno}
            })
             .then(function(response) {
                msghechos.listAsignaturas = angular.fromJson(response.data);
            }, function errorCallback(response) {
                console.log("No hay mensajes")
            });
           
            //LLAMADA PARA RECOGER MENSAJES LEIDOS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                method: "GET",
                params: {idPadre: idPadre}
            })
             .then(function(response) {
                msghechos.leidos = angular.fromJson(response.data);  
                }, function errorCallback(response) {
                console.log("No hay mensajes")
            });
            
            msghechos.filtrar = function(id){
                var cont = 0;
                msghechos.filtrados = [];
                msghechos.leido = true;
//                for(i=0;i<msghechos.leidos[i].length;i++){
//                    if(msghechos.leidos[i].idAsignatura == id){
//                        msghechos.filtrados[cont] = msghechos.leidos[i];
//                        cont++;
//                    }
//                }
            }
            
            msghechos.selectDatos = function(idProfesor, idAsignatura, profesor, asignatura){
                if(sesionLocal){
                    localStorage.setItem('profesor', profesor);
                    localStorage.setItem('asignatura', asignatura);
                    localStorage.setItem('idProfesor2', idProfesor);
                    localStorage.setItem('idAsignatura', idAsignatura);
                }
                if(sesionSesion){
                    sessionStorage.setItem('profesor', profesor);
                    sessionStorage.setItem('asignatura', asignatura);
                    sessionStorage.setItem('idProfesor2', idProfesor);
                    sessionStorage.setItem('idAsignatura', idAsignatura);
                }
            }
            
            msghechos.init = function(){
                if(sesionLocal){
                    msghechos.nProfesor = localStorage.profesor;
                    msghechos.nAsignatura = localStorage.asignatura;
                    var idProfesor = localStorage.idProfesor2;
                    msghechos.idAsignatura = localStorage.idAsignatura;
                }
                if(sesionSesion){    
                    msghechos.nProfesor = sessionStorage.getItem('profesor');
                    msghechos.nAsignatura = sessionStorage.getItem('asignatura');
                    var idProfesor = sessionStorage.getItem('idProfesor2');
                    msghechos.idAsignatura = sessionStorage.getItem('idAsignatura');
                }
                msghechos.idPro = idProfesor;
                //LLAMADA PARA RECOGER MENSAJES LEIDOS
                $http({
                    url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                    method: "GET",
                    params: {idPadre: idPadre}
                })
                 .then(function(response) {
                    msghechos.mensajes = angular.fromJson(response.data);
                        //msghechos.conver = [];
                        var con = 0;
                        for(var i=0;i<msghechos.mensajes.length;i++){
                            if(msghechos.mensajes[i].idProfesor == msghechos.idPro){
                                msghechos.conver = msghechos.mensajes[i];
                                con++;
                            }
                        }
                        msghechos.menPadre = msghechos.conver.MensajesPadre;
                    if(msghechos.conver.MensajesProfesor == null){//Profesor no crea
                        msghechos.padreCrea = true;
                        var par = 0;
                        var impar = 1;
                        msghechos.todos = [];
                        for(var i=0;i<msghechos.menPadre.length;i++){
                            msghechos.todos[par] = msghechos.menPadre[i];
                            par = par+2;
                        }
                        
                        if(msghechos.todos.length % 2 == 0){
                            //
                            msghechos.llegit = msghechos.todos[msghechos.todos.length-1].leido;
                        }else{
                            msghechos.llegit = 1;
                            msghechos.dis = 1;
                        }

                        msghechos.idM = msghechos.todos[msghechos.todos.length-1].idMensaje;
                    }else{//eL PROFESOR LO CREO
                        msghechos.profesorCrea = true;
                        msghechos.menProf = msghechos.conver.MensajesProfesor;
                        var par = 0;
                        var impar = 1;
                        msghechos.todos = [];
                        for(var i=0;i<msghechos.menProf.length;i++){
                            msghechos.todos[par] = msghechos.menProf[i];
                            par = par+2;
                        }
                        for(var i=0;i<msghechos.menPadre.length;i++){
                            msghechos.todos[impar] = msghechos.menPadre[i];
                            impar = impar+2;
                        }
                        console.log(msghechos.todos)
                        if(msghechos.todos.length % 2 != 0){
                            //
                            msghechos.llegit = msghechos.todos[msghechos.todos.length-1].leido;
                        }else{
                            msghechos.llegit = msghechos.todos[msghechos.todos.length-2].leido;
                            msghechos.dis = 1;
                        }

                        msghechos.idM = msghechos.todos[msghechos.todos.length-1].idMensaje;
                    }
                    }, function errorCallback(response) {
                        console.log("No hay mensajes")
                });


            }
            
            
            msghechos.marcarLeido = function(id){
                $http.put("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                              {idMensaje: msghechos.idM, idProfesor: msghechos.idPro, leido: 1}
                ).then(function(response){
                    msghechos.llegit = 1;
                })
            }
            
            msghechos.responderMensaje = function(){
                //LLAMADA PARA CREAR MENSAJE
                $http.post("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                              {emisor: "pa", idPadre: idPadre, receptor: "pro", 
                               idProfesor: msghechos.idPro, texto: msghechos.formMensaje,
                               idAsignatura: msghechos.idAsignatura}
                ).then(function(response){
                    msghechos.responder = false;
                    msghechos.respon = true;
                    console.log("anana")
                })
            }
            
            msghechos.crearMensaje = function(idProfe, asunt, idMens){
                //LLAMADA PARA CREAR MENSAJE
                $http.post("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                              {emisor: "pa", idPadre: idPadre, receptor: "pro", 
                               idProfesor: idProfe, asunto: asunt, texto: msghechos.formMensaje,
                               idAsignatura: msghechos.idAsignatura}
                ).then(function(response){
                    console.log("anana")
                    $window.location.reload();
                })
            }
    }