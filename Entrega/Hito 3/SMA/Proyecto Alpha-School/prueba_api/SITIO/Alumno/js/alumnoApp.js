    var sesion = false;
    if(localStorage.user == null){
        if(sessionStorage.getItem('user2') == null){
            window.location.replace("/prueba_api/SITIO/PagPrincipal/index.html");
        }else{
            sesion = true;
        }     
    }


    angular.module('alumnoApp', [])
    .controller('navController', navController)
    .controller('anuncioAlumController', anuncioAlumController)
    .controller('datosAlumnoController', datosAlumnoController)
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
        if(!sesion)
            user1 = localStorage.user;
        else    
            user1 = sessionStorage.getItem('user2');
        
        SUser="usuario/"+user1
        
        var nav = this;
        //LLAMADA HTTP
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/alumno/alumno/"+SUser+"/format/json", 
            method: "GET",
            params: {usuario: user1}
        })
         .then(function(response) {
            nav.compuesto = angular.fromJson(response.data);
            nav.nombre = nav.compuesto.nombre;
            nav.apellidos = nav.compuesto.apellidos;
            if(!sesion)
                localStorage.setItem('idAlumno', nav.compuesto.idAlumno);
            else    
                sessionStorage.setItem('idAlumno', nav.compuesto.idAlumno);
        }, function errorCallback(response) {
            //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
        });
        //LOG OUT
        nav.logOut = function (){
            localStorage.setItem('user', null);
            $window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
        }
    };

    anuncioAlumController.$inject = ['$scope', '$http'];
    function anuncioAlumController($scope, $http){
        if(!sesion){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }else{    
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
                    anuncio.texto = [];
                    for(var i=0;i<anuncio.total.length;i++){
                        if(anuncio.total[i].leidoAlumno == true){
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
                            if(anuncio.total[i].leidoAlumno == true){
                                console.log("Ahora estoy leido")
                                console.log(anuncio.total[i].leidoAlumno)
                                $http.put("http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado",
                                      {idAlumno: idAlumno, idComunicado: index, noleido: true}
                                ).then(function(response){
                                    anuncio.llamada();
                                    anuncio.texto[i] = "Expandir"
                                    //anuncio.put = angular.fromJson(response.data); 
                                });
                            }else{ //No leido
                                console.log("Ahora estoy Noleido")
                                console.log(anuncio.total[i].leidoAlumno)
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
       
    datosAlumnoController.$inject = ['$scope', '$http'];
    function datosAlumnoController($scope, $http){
        if(!sesion){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }else{    
            user1 = sessionStorage.getItem('user2');
            idAlumno = sessionStorage.getItem('idAlumno');
        }
        idAlumnoParam="idAlumno/"+idAlumno+"/datoscurso/true";
            var alumno = this;
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/alumno/alumno/"+idAlumnoParam+"/format/json", 
                method: "GET",
                params: {id: idAlumnoParam,
                         datoscurso: true}
            })
             .then(function(response) {
                alumno.compuesto = angular.fromJson(response.data);
                alumno.datos = {item: []};
                alumno.datos.item = alumno.compuesto;
                }, function errorCallback(response) {
                    alert()
                });
        
    };
    
    asistenciaController.$inject = ['$scope', '$http', '$window'];
    function asistenciaController($scope, $http, $window){
        if(!sesion){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }else{    
            user1 = sessionStorage.getItem('user2');
            idAlumno = sessionStorage.getItem('idAlumno');
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
         
    };

    mencionController.$inject = ['$scope', '$http'];
    function mencionController($scope, $http){
        if(!sesion){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }else{    
            user1 = sessionStorage.getItem('user2');
            idAlumno = sessionStorage.getItem('idAlumno');
        }
            idAlumnoParam="idAlumno/"+idAlumno;
            var mencion = this;
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/mencion/mencion/"+idAlumnoParam+"/format/json",
                method: "GET",
                params: {idAlumno: idAlumno}
            })
             .then(function(response) {
                mencion.compuesto = angular.fromJson(response.data);            
                }, function errorCallback(response) {
                alert()
            });
    };

    mensajeController.$inject = ['$scope', '$http', '$window'];
    function mensajeController($scope, $http, $window){
        if(!sesion){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }else{    
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
                console.log(mensaje.noLeidos)
                }, function errorCallback(response) {
                alert()
            });
            
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
        if(!sesion){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }else{    
            user1 = sessionStorage.getItem('user2');
            idAlumno = sessionStorage.getItem('idAlumno');
        }
            noLei="idAlumno/"+idAlumno+"/noleidos/1";
            var nuevo = this;
            
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
            
            nuevo.selectAsig = function(idAsig, idProfe, nombreAsig, nombreProfesor){
                nuevo.profesor = nombreProfesor;
                nuevo.idAsignatura = idAsig;
                nuevo.idProfesor = idProfe;
                nuevo.nombreAsignatura = nombreAsig;
                nuevo.mostrar=false;
            }
            
            nuevo.crearMensaje = function(){
                //LLAMADA PARA CREAR MENSAJE
                $http.post("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                              {emisor: "al", idAlumno: idAlumno, receptor: "pro", 
                               idProfesor: nuevo.idProfesor, asunto: nuevo.asunto, texto: nuevo.texto}
                ).then(function(response){
                    console.log("enviado")
                })
            }
    }

    msgHechosController.$inject = ['$scope', '$http', '$window'];
    function msgHechosController($scope, $http, $window){
        if(!sesion){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }else{    
            user1 = sessionStorage.getItem('user2');
            idAlumno = sessionStorage.getItem('idAlumno');
        }
            Lei="idAlumno/"+idAlumno+"/leidos/1";
            var msghechos = this;
            
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
                url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje/"+Lei+"/format/json",
                method: "GET",
                params: {idAlumno: idAlumno,
                         leidos: 1}
            })
             .then(function(response) {
                msghechos.leidos = angular.fromJson(response.data);     
                console.log(msghechos.leidos)
                }, function errorCallback(response) {
                alert()
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
            
            msghechos.crearMensaje = function(idProfe, asunt, idMens){
                //LLAMADA PARA CREAR MENSAJE
                $http.post("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                              {emisor: "al", idAlumno: idAlumno, receptor: "pro", 
                               idProfesor: idProfe, asunto: asunt, texto: msghechos.formMensaje}
                ).then(function(response){
                    console.log("anana")
                    $window.location.reload();
                })
            }
    }

    evaluacionController.$inject = ['$scope', '$http'];
    function evaluacionController($scope, $http){
        if(!sesion){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }else{    
            user1 = sessionStorage.getItem('user2');
            idAlumno = sessionStorage.getItem('idAlumno');
        }
            idAlumnoParam="idAlumno/"+idAlumno;
            var evaluacion = this;
            examAntic = idAlumnoParam + "/pasados/true";
            evaluacion.numero = "X";
            //LLAMADA PARA COGER EXAMENES ANTIGUOAS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/examen/examen/"+examAntic+"/format/json",
                method: "GET",
                params: {idAlumno: idAlumno,
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
                    evaluacion.noHay = true;
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

    expedienteController.$inject = ['$scope', '$http'];
    function expedienteController($scope, $http){
        if(!sesion){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }else{    
            user1 = sessionStorage.getItem('user2');
            idAlumno = sessionStorage.getItem('idAlumno');
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
                expediente.nCurso = any;
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
                        if(expediente.hist[i].curso == any){
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
        if(!sesion){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }else{    
            user1 = sessionStorage.getItem('user2');
            idAlumno = sessionStorage.getItem('idAlumno');
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
        if(!sesion){
            user1 = localStorage.user;
            idAlumno = localStorage.idAlumno;
        }else{    
            user1 = sessionStorage.getItem('user2');
            idAlumno = sessionStorage.getItem('idAlumno');
        }
    }


