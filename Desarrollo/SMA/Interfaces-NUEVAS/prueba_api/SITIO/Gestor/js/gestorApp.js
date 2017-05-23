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

    angular.module('gestorApp', ['checklist-model'])
    .controller('navController', navController)
    .controller("crearUsuarioController", crearUsuarioController)
    .controller("asignaturaController", asignaturaController)
    .controller("crearCursoController", crearCursoController)
    .controller('comunicadoController', comunicadoController);

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
            url: "http://localhost/prueba_api/alpha2/index.php/gestor/gestor/", 
            method: "GET",
            params: {usuario: nav.user1}
        })
         .then(function(response) {
            nav.compuesto = angular.fromJson(response.data);
            nav.nombre = nav.compuesto.nombre;
            nav.apellidos = nav.compuesto.apellidos;
            if(sesionLocal)
                localStorage.setItem('idGestor', nav.compuesto.idGestor);
                localStorage.setItem('idCentro', nav.compuesto.idCentro);
            if(sesionSesion)    
                sessionStorage.setItem('idGestor', nav.compuesto.idGestor);
                sessionStorage.setItem('idCentro', nav.compuesto.idCentro);
        }, function errorCallback(response) {
            //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
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

    crearUsuarioController.$inject = ['$scope', '$http', '$window'];
    function crearUsuarioController($scope, $http, $window){        
        var crear = this;
        
        crear.user1 = "";
        if(sesionLocal){
            crear.user1 = localStorage.user;
            crear.idGestor = localStorage.idGestor;
            crear.idCentro = localStorage.idCentro;
        }
        if(sesionSesion){  
            crear.user1 = sessionStorage.getItem('user2');
            crear.idGestor = sessionStorage.getItem('idGestor');
            crear.idCentro = sessionStorage.getItem('idCentro');
        }
        
        //LLAMADA HTTP PARA CURsOS
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/curso/curso/", 
            method: "GET",
            params: {idCentro: crear.idCentro}
        })
         .then(function(response) {
            crear.compuesto = angular.fromJson(response.data);
            crear.cursos = crear.compuesto;
        }, function errorCallback(response) {
            //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
        });        
        
        crear.clickUser = function(){
            crear.rol = crear.selectedItem;
            if(crear.selectedItem == "alumno"){
                crear.alum = true;
                crear.padreT = false;
                crear.profe = false;
                crear.denei = true;
                //LLAMADA HTTP PARA CURsOS
                $http({
                    url: "http://localhost/prueba_api/alpha2/index.php/curso/curso", 
                    method: "GET",
                    params: {academicos: 1}
                })
                 .then(function(response) {
                    crear.compuesto = angular.fromJson(response.data);
                    crear.anyos = crear.compuesto;
                }, function errorCallback(response) {
                    //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
                });                
            }else{
                crear.alum = false;
            }
            
            if(crear.selectedItem == "padre"){
                crear.padreT = true;
                crear.alum = false;
                crear.profe = false;
                crear.gest = false;
                crear.denei = true;
            }else{
                crear.padreT = false;
            }            
            
            if(crear.selectedItem == "profesor"){
                crear.profe = true;
                crear.padreT = false;
                crear.alum = false;
                crear.gest = false;
                crear.denei = true;
            }else{
                crear.profe = false;
            }            
            
            if(crear.selectedItem == "gestor"){
                crear.gest = true;
                crear.profe = false;
                crear.padreT = false;
                crear.alum = false;
                crear.denei = false;
                //LLAMADA HTTP PARA CURsOS
                $http({
                    url: "http://localhost/prueba_api/alpha2/index.php/centro/centro", 
                    method: "GET"
                })
                 .then(function(response) {
                    crear.compuesto = angular.fromJson(response.data);
                    crear.listGest = crear.compuesto;
                }, function errorCallback(response) {
                    //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
                }); 
            }else{
                crear.gest = false;
            }
        }
        
        crear.clickCurso = function(){
            if(crear.selectedItem == "alumno"){
                crear.asig = true;
                //LLAMADA HTTP PARA ASIGNATUIRAS
                $http({
                    url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/", 
                    method: "GET",
                    params: {idCurso: crear.idCurso}
                })
                 .then(function(response) {
                    crear.compuesto = angular.fromJson(response.data);
                    crear.asignaturas = crear.compuesto;
                    crear.asi = [];
                    crear.nombresA = [];
                    for(var i=0;i<crear.asignaturas.length;i++){
                        crear.asi[i] = crear.asignaturas[i].idAsignatura;
                        crear.nombresA[i] = crear.asignaturas[i].nombre;
                    }
                }, function errorCallback(response) {
                    //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
                });                 
            }
 
            if(crear.selectedItem == "padre"){
                crear.padr = true;
                //LLAMADA HTTP PARA CURsOS
                $http({
                    url: "http://localhost/prueba_api/alpha2/index.php/alumno/alumno", 
                    method: "GET",
                    params: {idCurso: crear.idCurso, idCentro: crear.idCentro}
                })
                 .then(function(response) {
                    crear.compuesto = angular.fromJson(response.data);
                    crear.hijos = crear.compuesto;
                }, function errorCallback(response) {
                    //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
                });
            }
        }
        
        crear.clickHijo = function(num){
            if(num == 1){
                crear.listaID = [];
                crear.listaID.push(crear.idAlumno);
                crear.padr2 = true;
            }
            if(num == 2){
                crear.listaID.push(crear.idAlumno2);
                crear.padr3 = true;
            }            
            if(num == 3){
                crear.listaID.push(crear.idAlumno3);
            }
        }
                            
        crear.user = {
        };
        
          crear.checkAll = function() {
            crear.user = angular.copy(crear.asi);
          };
          crear.uncheckAll = function() {
            crear.user = [];
          };
        

        crear.randomPass = function(){
            var chars = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
            crear.pass = "";
            for (var x = 0; x < 8; x++) {
                var i = Math.floor(Math.random() * chars.length);
                crear.pass += chars.charAt(i);
            }
            var ran = Math.floor((Math.random() * 9) + 1);
            var ran2 = Math.floor((Math.random() * 9) + 1);
            numbe = ran.toString();
            numbe2 = ran2.toString();
            usurero = crear.nombreF[0]+crear.apellidosF[0]+numbe+numbe2;
            crear.usuario = usurero.toLowerCase();
            
            
            if(crear.rol == "alumno"){
                $http({
                url: "http://localhost/prueba_api/alpha2/index.php/alumno/alumno", 
                method: "POST",
                data: {nombre: crear.nombreF, apellidos: crear.apellidosF, user: crear.usuario, password: crear.pass,
                         email: crear.email, telefono: crear.telefono, dni: crear.dni, idCurso: crear.idCurso,
                         idCentro: crear.idCentro, academico: crear.anyo, asignaturas: crear.user}
                }).success(function(response){
                    console.log("Creado")
                    crear.todoOK = true;
                })
            }
            if(crear.rol == "padre"){
                $http({
                url: "http://localhost/prueba_api/alpha2/index.php/padre/padre", 
                method: "POST",
                data: {nombre: crear.nombreF, apellidos: crear.apellidosF, user: crear.usuario, password: crear.pass,
                         email: crear.email, telefono: crear.telefono, dni: crear.dni, alumnos: crear.listaID}
                }).success(function(response){
                    console.log("Creado")
                    crear.todoOK = true;
                })
            }
            if(crear.rol == "profesor"){
                $http({
                url: "http://localhost/prueba_api/alpha2/index.php/profesor/profesor", 
                method: "POST",
                data: {nombre: crear.nombreF, apellidos: crear.apellidosF, user: crear.usuario, password: crear.pass,
                         email: crear.email, telefono: crear.telefono, dni: crear.dni, idCentro: crear.idCentro}
                }).success(function(response){
                    console.log("Creado")
                    crear.todoOK = true;
                    //$window.location.reload();
                }) 
            }
            if(crear.rol == "gestor"){
                $http({
                url: "http://localhost/prueba_api/alpha2/index.php/gestor/gestor", 
                method: "POST",
                data: {nombre: crear.nombreF, apellidos: crear.apellidosF, usuario: crear.usuario, password: crear.pass,
                         email: crear.email, telefono: crear.telefono, idCentro: crear.gestor}
                }).success(function(response){
                    console.log("Creado")
                    crear.todoOK = true;
                    //$window.location.reload();
                }) 
            }
 
            

        }

        //LLAMADA HTTP
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/gestor/gestor/", 
            method: "GET",
            params: {usuario: crear.user1}
        })
         .then(function(response) {
            crear.compuesto = angular.fromJson(response.data);
            crear.nombre = crear.compuesto.nombre;
            crear.apellidos = crear.compuesto.apellidos;
            if(sesionLocal)
                localStorage.setItem('idAdministrador', crear.compuesto.idProfesor);
            if(sesionSesion)    
                sessionStorage.setItem('idAdministrador', crear.compuesto.idProfesor);
        }, function errorCallback(response) {
            //$window.location.href = '/prueba_api/SITIO/PagPrincipal/index.html';
        });
    };

    asignaturaController.$inject = ['$scope', '$http', '$window'];
    function asignaturaController($scope, $http, $window){        
        var asig = this;
        
        asig.user1 = "";
        if(sesionLocal){
            asig.user1 = localStorage.user;
            asig.idGestor = localStorage.idGestor;
            asig.idCentro = localStorage.idCentro;
        }
        if(sesionSesion){  
            asig.user1 = sessionStorage.getItem('user2');
            asig.idGestor = sessionStorage.getItem('idGestor');
            asig.idCentro = sessionStorage.getItem('idCentro');
        }

        //LLAMADA HTTP PARA CURsOS
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/curso/curso", 
            method: "GET",
            params: {idCentro: asig.idCentro}
        })
        .then(function(response) {
            asig.compuesto = angular.fromJson(response.data);
            asig.cursos = asig.compuesto;

                //LLAMADA HTTP PARA PROFESORES
                $http({
                    url: "http://localhost/prueba_api/alpha2/index.php/profesor/profesor", 
                    method: "GET",
                    params: {idCentro: asig.idCentro}
                })
                .then(function(response) {
                    asig.compuesto = angular.fromJson(response.data);
                    asig.profesores = asig.compuesto;
                }, function errorCallback(response) {
                    console.log("Error")
                }); 
        }, function errorCallback(response) {
            console.log("Error")
        }); 
        
        asig.clickCurso = function(){
            //LLAMADA HTTP PARA CURsOS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura", 
                method: "GET",
                params: {idCentro: asig.idCentro, idCurso: asig.idCurso}
            })
            .then(function(response) {
                asig.compuesto = angular.fromJson(response.data);
                asig.asignaturas = asig.compuesto;
            }, function errorCallback(response) {
                console.log("Error")
            }); 
        }
        
        asig.crearAsignatura = function(){
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura", 
                method: "POST",
                data: {nombre: asig.nombre, idCurso: asig.idCurso, idCentro: asig.idCentro}
            }).success(function(response){
                console.log("siiiiii")
                comunicado.publicado = true;
                //$window.location.reload();
            })
        }
        
        asig.asigAsignatura = function(){
            $http.put("http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura",
                    {idCurso: asig.idCurso, idCentro: asig.idCentro, idAsignatura: asig.idAsignatura,
                     idProfesor: asig.idProfesor}
            ).then(function(response){
                asig.todoOK = true;
            }); 
        }
    }

    comunicadoController.$inject = ['$scope', '$http', '$window'];
    function comunicadoController($scope, $http, $window){
        var comunicado = this;
        if(sesionLocal){
            comunicado.user1 = localStorage.user;
            comunicado.idGestor = localStorage.idGestor;
            comunicado.idCentro = localStorage.idCentro;
        }
        if(sesionSesion){  
            comunicado.user1 = sessionStorage.getItem('user2');
            comunicado.idGestor = sessionStorage.getItem('idGestor');
            comunicado.idCentro = sessionStorage.getItem('idCentro');
        } 
         
        comunicado.crearAnuncio = function(){
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado", 
                method: "POST",
                data: {titulo: comunicado.titulo, texto: comunicado.texto,
                        idGestor: comunicado.idGestor, idCentro: comunicado.idCentro}
            }).success(function(response){
                console.log("siiiiii")
                comunicado.publicado = true;
                //$window.location.reload();
            })
        }
        
        //LLAMADA HTTP PARA CURsOS
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado", 
            method: "GET",
            params: {idCentro: comunicado.idCentro, anunciosGestor: 1}
        })
        .then(function(response) {
            comunicado.compuesto = angular.fromJson(response.data);
            comunicado.total = comunicado.compuesto;
        }, function errorCallback(response) {
            console.log("Error")
        }); 
        
        comunicado.borrar = function(id){
            url = "idAnuncioGestor/"+id;
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado/"+url, 
                method: "DELETE",
                params: {idAnuncioGestor: id}
            })
            .then(function(response) {
                window.location.reload()
                comunicado.borrado = true;
                //LLAMADA HTTP PARA CURsOS
                $http({
                    url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado", 
                    method: "GET",
                    params: {idCentro: comunicado.idCentro, anunciosGestor: 1}
                })
                .then(function(response) {
                    comunicado.total = angular.fromJson(response.data);
                    
                }, function errorCallback(response) {
                    comunicado.borrado = false;
                }); 
            });
        }
    }

    crearCursoController.$inject = ['$scope', '$http', '$window'];
    function crearCursoController($scope, $http, $window){        
        var curso = this;
        
        curso.user1 = "";
        if(sesionLocal){
            curso.user1 = localStorage.user;
            curso.idGestor = localStorage.idGestor;
            curso.idCentro = localStorage.idCentro;
        }
        if(sesionSesion){  
            curso.user1 = sessionStorage.getItem('user2');
            curso.idGestor = sessionStorage.getItem('idGestor');
            curso.idCentro = sessionStorage.getItem('idCentro');
        }
        
        curso.crear = function(){
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/curso/curso", 
                method: "POST",
                data: {nombre: curso.nombre, grupo: curso.grupo, idCentro: curso.idCentro}
            }).success(function(response){
                console.log("siiiiii")
                curso.todoOK = true;
            })
        }
        
        
        //LLAMADA HTTP PARA PROFESORWES
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/profesor/profesor", 
            method: "GET",
            params: {idCentro: curso.idCentro}
        })
        .then(function(response) {
            curso.profesores = angular.fromJson(response.data);
        }, function errorCallback(response) {
            console.log("Error")
        }); 
                
        //LLAMADA HTTP PARA Cursos
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/curso/curso", 
            method: "GET",
            params: {idCentro: curso.idCentro}
        })
        .then(function(response) {
            curso.cursos = angular.fromJson(response.data);
        }, function errorCallback(response) {
            console.log("Error")
        }); 
        
        curso.asigCurso = function(){
            $http.put("http://localhost/prueba_api/alpha2/index.php/curso/curso",
                    {idCurso: curso.idCurso, idProfesor: curso.idProfesor, idCentro: curso.idCentro}
            ).then(function(response){
                curso.todoOK = true;
            }); 
        }
    }