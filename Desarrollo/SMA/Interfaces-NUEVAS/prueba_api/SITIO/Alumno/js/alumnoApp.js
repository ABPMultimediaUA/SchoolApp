    var sesionLocal = false;
    var sesionSesion = false;

    if(typeof localStorage.user == 'undefined' || localStorage.user == "null"){
        if(typeof sessionStorage.getItem('user2') == 'undefined' || sessionStorage.getItem('user2') == null){
            window.location.replace("/prueba_api/SITIO/LandingPage/index.html");
        }else{
            sesionSesion = true;
        }     
    }else{
        sesionLocal = true; 
    }

    //var app = angular.module('app' , ['htmlToPdfSave']);

    angular.module('alumnoApp', ['htmlToPdfSave'])
    .controller('navController', navController)
    .controller('contrasenyaController', contrasenyaController)
    .controller('principalController', principalController)
    .controller('anuncioAlumController', anuncioAlumController)
    .controller('asistenciaController', asistenciaController)
    .controller('mencionController', mencionController)
    .controller('mensajeNuevoController', mensajeNuevoController)
    .controller('evaluacionController', evaluacionController)
    .controller('mensajeController', mensajeController)
    .controller('evaluacionController', evaluacionController)
    .controller('expedienteController', expedienteController)
    .controller('tareaController', tareaController)
    .controller('horarioController', horarioController)
    .controller('msgHechosController', msgHechosController);

    navController.$inject = ['$scope', '$http', '$window'];
    function navController($scope, $http, $window){        
        var nav = this;
//        if(!sesion)
//            user1 = localStorage.user;
//        else    
//            user1 = sessionStorage.getItem('user2');
        nav.user1 = "";
        if(sesionLocal){
            nav.user1 = localStorage.user;
        }
        if(sesionSesion){  
            nav.user1 = sessionStorage.getItem('user2');
        } 

        
        

        //LLAMADA HTTP
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/alumno/alumno/", 
            method: "GET",
            params: {usuario: nav.user1}
        })
         .then(function(response) {
            nav.compuesto = angular.fromJson(response.data);
            nav.nombre = nav.compuesto.nombre;
            nav.apellidos = nav.compuesto.apellidos;
            nav.telefono = nav.compuesto.telefono;
            nav.email = nav.compuesto.email;
            nav.idCurso = nav.compuesto.idCurso;
            nav.idAlumno = nav.compuesto.idAlumno;
            if(sesionLocal){
                localStorage.setItem('idAlumno', nav.compuesto.idAlumno);
                localStorage.setItem('idCurso', nav.idCurso);
            }
                
            if(sesionSesion){
                sessionStorage.setItem('idAlumno', nav.compuesto.idAlumno);
                sessionStorage.setItem('idCurso', nav.idCurso);
            }    
                
            
        }, function errorCallback(response) {
            //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
        });
    
        if(sesionLocal)
            var idCurso = localStorage.idCurso;
        if(sesionSesion)
            var idCurso = sessionStorage.getItem('idCurso');
        
        console.log(idCurso)
        //LLAMADA HTTP
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/curso/curso", 
            method: "GET",
            params: {id: idCurso}
        })
         .then(function(response) {
            nav.cursos = angular.fromJson(response.data);
            nav.nombreCurso = nav.cursos.nombre;
            nav.grupo = nav.cursos.grupo;
        }, function errorCallback(response) {
            
        });
        
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

    contrasenyaController.$inject = ['$scope', '$http', '$window'];
    function contrasenyaController($scope, $http, $window){        
        var contra = this;

        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
        }
        //LLAMADA HTTP
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/alumno/alumno/", 
            method: "GET",
            params: {usuario: user1}
        })
         .then(function(response) {
            contra.compuesto = angular.fromJson(response.data);
            contra.contrasenyaActual = contra.compuesto.password;
        }, function errorCallback(response) {
            //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
        });

        contra.cambiarCon = function(){
            if(contra.contrasenyaActual == contra.contrasenyaAnt){
               if(contra.contrasenyaNueva1 == contra.contrasenyaNueva2){
                   contra.inco = false;
                   contra.coin = false;
                    $http.put("http://localhost/prueba_api/alpha2/index.php/alumno/alumno",
                            {idAlumno: idAlumno, password: contra.contrasenyaNueva1}
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

    principalController.$inject = ['$scope', '$http', '$window'];
    function principalController($scope, $http, $window){
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
        }
            var prin = this;
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                method: "GET",
                params: {idAlumno: idAlumno, noleidos: 1}
            })
             .then(function(response) {
                prin.noLeidos = angular.fromJson(response.data);
                prin.mensaje = true;
                }, function errorCallback(response) {
                    prin.mensaje = false;
            });
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado/", 
            method: "GET",
            params: {idAlumno: idAlumno}
        })
         .then(function(response) {
            prin.total = angular.fromJson(response.data);
            prin.anucnio = false;
            for(var j=0;j<prin.total.length && prin.anucnio==false;j++){
                if(prin.total[j].leidoAlumno == false && typeof prin.total[j].idAsignatura != 'undefined'){
                    prin.anucnio = true;
                }
            }
         }, function errorCallback(response) {   
        });
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
                    url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado", 
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
                    anuncio.texto = [];
                    for(var i=0;i<anuncio.total.length;i++){
                        if(anuncio.total[i].leidoAlumno == true){
                            anuncio.texto[i] = "Expandir";
                        }else{
                            anuncio.texto[i] = "Esconder";
                        }
                    }
                    }, function errorCallback(response) {
                        console.log("Error")
                    
                });                
            }
            
            anuncio.llamada();
            anuncio.ocultar = function(index){
                    anuncio.llamada();
                
                    for(var i=0;i<anuncio.total.length;i++){
                        if(anuncio.total[i].idComunicado == index){
                            //Esta leido
                            if(anuncio.total[i].leidoAlumno == true){
                                console.log("Ahora estoy leido")
                                $http.put("http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado",
                                      {idAlumno: idAlumno, idComunicado: index, noleido: true}
                                ).then(function(response){
                                    anuncio.llamada();
                                    anuncio.texto[i] = "Expandir"
                                    //anuncio.put = angular.fromJson(response.data); 
                                });
                            }else{ //No leido
                                console.log("Ahora estoy Noleido")
                                $http.put("http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado",
                                      {idAlumno: idAlumno, idComunicado: index, leido: true}
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

    mencionController.$inject = ['$scope', '$http'];
    function mencionController($scope, $http){
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
        }
            var mencion = this;
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/mencion/mencion/",
                method: "GET",
                params: {idAlumno: idAlumno}
            })
             .then(function(response) {
                mencion.compuesto = angular.fromJson(response.data);            
                }, function errorCallback(response) {
                    console.log("error")
            });
    };

    mensajeController.$inject = ['$scope', '$http', '$window'];
    function mensajeController($scope, $http, $window){
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
        }
            noLei="/idAlumno/"+idAlumno+"/noleidos/1";
            var mensaje = this;
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje"+noLei+"/format/json",
                method: "GET",
                params: {idAlumno: idAlumno,
                         noleidos: 1}
            })
             .then(function(response) {
                mensaje.noLeidos = angular.fromJson(response.data); 
                mensaje.notifi = true;
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
                              {emisor: "al", idAlumno: idAlumno, receptor: "pro", 
                               idProfesor: idProfe, asunto: asunt, texto: mensaje.formMensaje}
                ).then(function(response){
                    $http.put("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                                  {idMensaje: idMens, idAlumno: idAlumno, leido: 1}
                    ).then(function(response){
                        //$route.reload();
                        $window.location.reload();
                    })
                })
            }
            
            mensaje.marcarLeido = function(id){
                $http.put("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                              {idMensaje: id, idAlumno: idAlumno, leido: 1}
                ).then(function(response){
                    
                })
            }
        
    }

    mensajeNuevoController.$inject = ['$scope', '$http', '$window'];
    function mensajeNuevoController($scope, $http, $window){
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
        }
            noLei="idAlumno/"+idAlumno+"/noleidos/1";
            var nuevo = this;
            
            
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                method: "GET",
                params: {idAlumno: idAlumno,
                         noleidos: 1}
            })
             .then(function(response) {
                nuevo.noLeidos = angular.fromJson(response.data); 
                nuevo.notifi = true;
                }, function errorCallback(response) {
                 nuevo.vacio = true;
            });
        
//            //LLAMADA PARA RECOGER ASIGNATURAS DEL ALUMNO
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/"+idAlumno+"/format/json", 
                method: "GET",
                params: {idAlumno: idAlumno}
            })
             .then(function(response) {
                nuevo.listAsignaturas = angular.fromJson(response.data);
            }, function errorCallback(response) {
                alert()
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
                              {emisor: "al", idAlumno: idAlumno, receptor: "pro", 
                               idProfesor: nuevo.idProfesor, asunto: nuevo.asunto, texto: nuevo.texto,
                               idAsignatura: nuevo.idAsignatura}
                ).then(function(response){
                    console.log("enviado")
                })
            }
    }

    msgHechosController.$inject = ['$scope', '$http', '$window'];
    function msgHechosController($scope, $http, $window){
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
        }
            Lei="idAlumno/"+idAlumno+"/leidos/1";
            var msghechos = this;
            
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                method: "GET",
                params: {idAlumno: idAlumno,
                         noleidos: 1}
            })
             .then(function(response) {
                msghechos.noLeidos = angular.fromJson(response.data); 
                msghechos.notifi = true;
                }, function errorCallback(response) {
                 msghechos.vacio = true;
            });
    
//            //LLAMADA PARA RECOGER ASIGNATURAS DEL ALUMNO
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/"+idAlumno+"/format/json", 
                method: "GET",
                params: {idAlumno: idAlumno}
            })
             .then(function(response) {
                msghechos.listAsignaturas = angular.fromJson(response.data);
            }, function errorCallback(response) {
                alert()
            });
           
            //LLAMADA PARA RECOGER MENSAJES LEIDOS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                method: "GET",
                params: {idAlumno: idAlumno}
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
                    params: {idAlumno: idAlumno}
                })
                 .then(function(response) {
                    msghechos.mensajes = angular.fromJson(response.data);
                    //msghechos.conver = [];
                    var con = 0;
                    for(var i=0;i<msghechos.mensajes.length;i++){
                        if(msghechos.mensajes[i].idProfesor == idProfesor && msghechos.mensajes[i].idAsignatura == msghechos.idAsignatura){
                            msghechos.conver = msghechos.mensajes[i];
                            con++;
                        }
                    }
                    msghechos.menAlum = msghechos.conver.MensajesAlumno;
                    msghechos.menProf = msghechos.conver.MensajesProfesor;
                    
                    var par = 0;
                    var impar = 1;
                    msghechos.todos = [];
                    for(var i=0;i<msghechos.menAlum.length;i++){
                        msghechos.todos[par] = msghechos.menAlum[i];
                        par = par+2;
                    }
                    for(var j=0;j<msghechos.menProf.length;j++){
                        msghechos.todos[impar] = msghechos.menProf[j];
                        impar = impar+2;
                    }
                    if(msghechos.todos.length % 2 == 0){
                        //
                        msghechos.llegit = msghechos.todos[msghechos.todos.length-1].leido;
                    }else{
                        msghechos.llegit = 1;
                        msghechos.dis = 1;
                    }
                    
                    msghechos.idM = msghechos.todos[msghechos.todos.length-1].idMensaje;
                    
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
                              {emisor: "al", idAlumno: idAlumno, receptor: "pro", 
                               idProfesor: msghechos.idPro, texto: msghechos.formMensaje,
                                idAsignatura: msghechos.idAsignatura}
                ).then(function(response){
                    console.log("anana")
                    msghechos.responder = false;
                    msghechos.respon = true;
                })
            }
            
            msghechos.crearMensaje = function(idProfe, asunt, idMens){
                //LLAMADA PARA CREAR MENSAJE
                $http.post("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                              {emisor: "al", idAlumno: idAlumno, receptor: "pro", 
                               idProfesor: idProfe, asunto: asunt, texto: msghechos.formMensaje,
                                idAsignatura: msghechos.idAsignatura}
                ).then(function(response){
                    console.log("anana")
                    $window.location.reload();
                })
            }
    }

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

    horarioController.$inject = ['$scope', '$http'];
    function horarioController($scope, $http){
        if(sesionLocal){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }
        if(sesionSesion){    
            user1 = sessionStorage.getItem('user2');
            idAlumno=sessionStorage.getItem('idAlumno');
        }
    }


