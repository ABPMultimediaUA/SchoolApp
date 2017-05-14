    var sesionLocal = false;
    var sesionSesion = false;
    if(localStorage.user == "null"){
        if(sessionStorage.getItem('user2') == "null"){
            window.location.replace("/prueba_api/SITIO/PagPrincipal/index.html");
        }else{
            sesionSesion = true;
        }     
    }else{
        sesionLocal = true; 
    }


    angular.module('profesorApp', ['htmlToPdfSave'])
    .controller('navController', navController)
    .controller('tareaController', tareaController)
    .controller('comunicadoController', comunicadoController)
    .controller('mensajeController', mensajeController)
    .controller('examenController', examenController)
    .controller('asistenciaController', asistenciaController)
    .controller('mensajeNuevoController', mensajeNuevoController)
    .controller('mensajeController', mensajeController)
    .controller('mencionController', mencionController)
    .controller('msgHechosController', msgHechosController);

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
            url: "http://localhost/prueba_api/alpha2/index.php/profesor/profesor/", 
            method: "GET",
            params: {usuario: nav.user1}
        })
         .then(function(response) {
            nav.compuesto = angular.fromJson(response.data);
            nav.nombre = nav.compuesto.nombre;
            nav.apellidos = nav.compuesto.apellidos;
            if(sesionLocal)
                localStorage.setItem('idProfesor', nav.compuesto.idProfesor);
            if(sesionSesion)    
                sessionStorage.setItem('idProfesor', nav.compuesto.idProfesor);
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

    tareaController.$inject = ['$scope', '$http', '$window'];
    function tareaController($scope, $http, $window){
        if(sesionLocal){
            user1 = localStorage.user;
            idProfesor = localStorage.idProfesor;
        }
        if(sesionSesion){
            user1 = sessionStorage.getItem('user2');
            idProfesor = sessionStorage.getItem('idProfesor');
        }  
         var tarea = this;
        
        tarea.checked = true;
        //LLAMADA PARA RECOGER LOS CURSOS DEL PROFESOR
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/curso/curso/", 
            method: "GET",
            params: {idProfesor: idProfesor}
        }).then(function(response){
            tarea.compuesto = angular.fromJson(response.data);
            tarea.lista = tarea.compuesto;
        })
        
        //LLAMADA PARA RECOGER LOS ASIGNATURAS DEL PROFESOR
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/", 
            method: "GET",
            params: {idProfesor: idProfesor}
        }).then(function(response){
            tarea.compuesto = angular.fromJson(response.data);
            tarea.asignaturas = tarea.compuesto;
        })
        
        //LLAMADA PARA RECOGER LOS TAREAS DEL PROFESOR
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/tarea/tarea/", 
            method: "GET",
            params: {idProfesor: idProfesor}
        }).then(function(response){
            tarea.compuesto = angular.fromJson(response.data);
            tarea.tareas = tarea.compuesto;
        })
        
        tarea.clickCurso = function(){
            tarea.idCurso = tarea.selectedCurso;
            tarea.listAsignaturas = {}
            var cont = 0;
            for(var i=0;i<tarea.asignaturas.length;i++){
                if(tarea.asignaturas[i].idCurso == tarea.idCurso){
                    tarea.listAsignaturas[cont] = tarea.asignaturas[i];
                    cont++;
                }
            }
        }
        
        tarea.clickAsignatura = function(){
            tarea.idAsignatura = tarea.selectedAsig;
            tarea.listTareas = {}
            var aux = 0;
            for(var i=0;i<tarea.tareas.length;i++){
                if(tarea.tareas[i].idAsignatura == tarea.selectedAsig){
                    tarea.listTareas[aux] = tarea.tareas[i];
                    aux++;
                }
            }
            console.log(tarea.idAsignatura)
//            LLAMADA PARA RECOGER LA LISTA DE TAREAS DE CURSO Y ASIGNATURA
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/tarea/tarea/", 
                method: "GET",
                params: {idCurso: tarea.idCurso, idAsignatura: tarea.idAsignatura}
            }).then(function(response){
                tarea.compuesto = angular.fromJson(response.data);
                tarea.alumnos = tarea.compuesto;
            })
        }
        
        tarea.clickTarea = function(){
            tarea.idTarea = tarea.selectedTarea;
            tarea.nombreT = "";
            tarea.descrip = "";
            for(var i=0;i<tarea.tareas.length;i++){
                if(tarea.tareas[i].idTarea == tarea.selectedTarea){
                    tarea.nombreT = tarea.tareas[i].titulo;
                    tarea.descrip = tarea.tareas[i].descripcion;
                }
            }
            
//            LLAMADA PARA RECOGER LOS ALUMNOS CON ESA TAREA
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/tarea/tarea/", 
                method: "GET",
                params: {id: tarea.selectedTarea, alumnos: 1}
            }).then(function(response){
                tarea.compuesto = angular.fromJson(response.data);
                tarea.alumnos = tarea.compuesto;
                tarea.ver = true;
            })  
        }
        
        tarea.marcarTarea = function(marca, idAlumno){
            tarea.idAlumno = idAlumno;
            //Marcar como completada
            if(marca == 0){
                $http.put("http://localhost/prueba_api/alpha2/index.php/tarea/tarea",
                        {idTarea: tarea.selectedTarea, completada: 1, idAlumno: tarea.idAlumno}
                ).then(function(response){
                });  
            }else{//MARCAR COMO NO COMPLETADA
                $http.put("http://localhost/prueba_api/alpha2/index.php/tarea/tarea",
                        {idTarea: tarea.selectedTarea, noCompletada: 1, idAlumno: tarea.idAlumno}
                ).then(function(response){
                });
            }

        }

        
        //LLAMADA PARA CREAR TAREA
        tarea.crearTarea = function(){
            var stringFecha2 = new Date(tarea.fecha);
            stringFecha = stringFecha2.toString()
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
                
            tarea.fechaParam = anyo+"-"+mes+"-"+dia;
            tarea.fecha = dia+"-"+mes+"-"+anyo;
            $http.post("http://localhost/prueba_api/alpha2/index.php/tarea/tarea",
                       {descripcion: tarea.desc, fecha_limite: tarea.fechaParam, idCurso: tarea.idCurso,
                        idProfesor: idProfesor, idAsignatura: tarea.idAsignatura, titulo: tarea.titulo}
            ).then(function(response){
                console.log("enviado")
                tarea.checked = false;
            })
        }
    }

    comunicadoController.$inject = ['$scope', '$http', '$window'];
    function comunicadoController($scope, $http, $window){
        if(sesionLocal){
            user1 = localStorage.user;
            idProfesor = localStorage.idProfesor;
        }
        if(sesionSesion){
            user1 = sessionStorage.getItem('user2');
            idProfesor = sessionStorage.getItem('idProfesor');
        }  
         var comunicado = this;
        
        //LLAMADA PARA RECOGER LOS CURSOS DEL PROFESOR
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/curso/curso/", 
            method: "GET",
            params: {idProfesor: idProfesor}
        }).then(function(response){
            comunicado.compuesto = angular.fromJson(response.data);
            comunicado.lista = comunicado.compuesto;
        })
        
        //LLAMADA PARA RECOGER LOS ASIGNATURAS DEL PROFESOR
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/", 
            method: "GET",
            params: {idProfesor: idProfesor}
        }).then(function(response){
            comunicado.compuesto = angular.fromJson(response.data);
            comunicado.asignaturas = comunicado.compuesto;
        })
        
        //LLAMADA PARA RECOGER LOAS AUTORIZACIONES DEL PROFESOR
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado/", 
            method: "GET",
            params: {idProfesor: idProfesor, autorizacion: 1}
        }).then(function(response){
            comunicado.compuesto = angular.fromJson(response.data);
            comunicado.autorizacion = comunicado.compuesto;
        })
        
        comunicado.clickCurso = function(){
            comunicado.idCurso = comunicado.selectedCurso;
            comunicado.nombreCurso = "";
            comunicado.grupoCurso = "";
            for(var i=0;i<comunicado.lista.length;i++){
                if(comunicado.lista[i].idCurso == comunicado.idCurso){
                    comunicado.nombreCurso = comunicado.lista[i].nombre;
                    comunicado.grupoCurso = comunicado.lista[i].grupo;
                }
            }
            comunicado.listAsignaturas = {}
            var cont = 0;
            for(var i=0;i<comunicado.asignaturas.length;i++){
                if(comunicado.asignaturas[i].idCurso == comunicado.idCurso){
                    comunicado.listAsignaturas[cont] = comunicado.asignaturas[i];
                    cont++;
                }
            }
            
            comunicado.listAutoriza = {};
            var aux = 0;
            for(var i=0;i<comunicado.autorizacion.length;i++){
                if(comunicado.autorizacion[i].idCurso == comunicado.idCurso){
                    comunicado.listAutoriza[aux] = comunicado.autorizacion[i];
                    aux++;
                }
            }
        }
        
        comunicado.clickAutoriz = function(){
            comunicado.click = true;
            comunicado.idComunicado = comunicado.selectedAutorizacion;
            //LLAMADA PARA RECOGER LOS ALUMNOS DE LAS AUTORIZACIONES DEL PROFESOR
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado/", 
                method: "GET",
                params: {id: comunicado.idComunicado, alumnosaut: 1}
            }).then(function(response){
                comunicado.compuesto = angular.fromJson(response.data);
                comunicado.alumnos = comunicado.compuesto;
                comunicado.alum = true;
            }, function errorCallback(response) {
                comunicado.alum = false;
            });
        }
        
        comunicado.clickAsignatura = function(){
            comunicado.idAsignatura = comunicado.selectedAsig;
        }
        
        comunicado.arreglarFecha = function(){
            stringFecha2 = comunicado.fecha;
            stringFecha = stringFecha2.toString()
            fechaSeparada = stringFecha.split(' ');
            var dia = fechaSeparada[2];
            mesLetras = fechaSeparada[1];
            var anyo = fechaSeparada[3];
            var mes = "";
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
                
            comunicado.fechaParam = anyo+"-"+mes+"-"+dia;
            comunicado.fecha = dia+"-"+mes+"-"+anyo;
        }
        comunicado.crearAnuncio = function(){
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado", 
                method: "POST",
                data: {titulo: comunicado.titulo, texto: comunicado.texto, idCurso: comunicado.idCurso,
                       idAsignatura: comunicado.idAsignatura, tipo: 1, idProfesor: idProfesor}
            }).success(function(response){
                console.log("siiiiii")
                comunicado.publicado = true;
                //$window.location.reload();
            })
        }
        
        comunicado.crearAutorizacion = function(){
            comunicado.arreglarFecha();
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/comunicado/comunicado", 
                method: "POST",
                data: {titulo: comunicado.nomActividad, texto: comunicado.descActividad, idCurso: comunicado.idCurso,
                       idAsignatura: comunicado.idAsignatura, tipo: 2, idProfesor: idProfesor,
                       precio: comunicado.precio, fecha: comunicado.fechaParam}
            }).success(function(response){
                console.log("siiiiii")
                comunicado.publicado = true;
                //$window.location.reload();
            })
        }
    }

    examenController.$inject = ['$scope', '$http', '$window'];
    function examenController($scope, $http, $window){
        if(sesionLocal){
            user1 = localStorage.user;
            idProfesor = localStorage.idProfesor;
        }
        if(sesionSesion){
            user1 = sessionStorage.getItem('user2');
            idProfesor = sessionStorage.getItem('idProfesor');
        }  
        var examen = this;
        
        //LLAMADA PARA RECOGER LOS CURSOS DEL PROFESOR
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/curso/curso/", 
            method: "GET",
            params: {idProfesor: idProfesor}
        }).then(function(response){
            examen.compuesto = angular.fromJson(response.data);
            examen.lista = examen.compuesto;
        })
        
        //LLAMADA PARA RECOGER LOS ASIGNATURAS DEL PROFESOR
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/", 
            method: "GET",
            params: {idProfesor: idProfesor}
        }).then(function(response){
            examen.compuesto = angular.fromJson(response.data);
            examen.asignaturas = examen.compuesto;
        })
        
        //LLAMADA PARA RECOGER LOS EXAMENES DEL PROFESOR
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/examen/examen/", 
            method: "GET",
            params: {idProfesor: idProfesor}
        }).then(function(response){
            examen.compuesto = angular.fromJson(response.data);
            examen.examenes = examen.compuesto;
            examen.listExamenes = examen.examenes;
        })
        
        examen.clickCurso = function(){
            examen.idCurso = examen.selectedCurso2;
            examen.nombreCurso = "";
            examen.grupoCurso = "";
            for(var i=0;i<examen.lista.length;i++){
                if(examen.lista[i].idCurso == examen.idCurso){
                    examen.nombreCurso = examen.lista[i].nombre;
                    examen.grupoCurso = examen.lista[i].grupo;
                }
            }
        }
        
        examen.clickAsignatura = function(){
            examen.idAsignatura = examen.selectedAsig;
            
            var aux = 0;
            examen.listExamenes = [];
            for(var i=0; i<examen.examenes.length;i++){
                if(examen.examenes[i].idAsignatura == examen.idAsignatura && examen.examenes[i].idCurso == examen.idCurso && examen.examenes[i].grupoCurso == examen.grupoCurso){
                    examen.listExamenes[aux] = examen.examenes[i];
                    aux++;
                }
            }
            
        }
        
        examen.clickExamen = function(){
            examen.ver = true;
            examen.idExamen = examen.selectedExamen;
            examen.nombreExamen = " ";
            for(var i=0; i<examen.listExamenes.length;i++){
                if(examen.listExamenes[i].idExamen == examen.idExamen){
                    examen.nombreExamen = examen.listExamenes[i].titulo;
                }
            }
            
            //LLAMADA PARA RECOGER LOS LUMNOS DEL EXAMEN DEL PROFESOR
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/examen/examen/", 
                method: "GET",
                params: {idExamen: examen.idExamen, alumnos: 1}
            }).then(function(response){
                examen.compuesto = angular.fromJson(response.data);
                examen.alumnos = examen.compuesto;
               //examen.listExamenes = examen.examenes;
            }, function errorCallback(response) {
                examen.alumnos = [];
                examen.ver = false;
            });
        }
        
        examen.filtrarCurso = function(){
            if(examen.selectedCurso == null){
               
            }else{
                examen.idCurso = examen.selectedCurso;
                examen.verAsi = true;
                examen.nombreCurso = "";
                examen.grupoCurso = "";
                for(var i=0;i<examen.lista.length;i++){
                    if(examen.lista[i].idCurso == examen.idCurso){
                        examen.nombreCurso = examen.lista[i].nombre;
                        examen.grupoCurso = examen.lista[i].grupo;
                    }
                }
                var aux = 0;
                examen.listExamenes = [];
                for(i=0; i<examen.examenes.length;i++){
                    if(examen.examenes[i].idCurso == examen.idCurso
                        && examen.examenes[i].grupoCurso == examen.grupoCurso){
                        examen.listExamenes[aux] = examen.examenes[i];
                        aux++;
                    }
                }                
            }

        }
        
        examen.filtrarAsignatura = function(){
            examen.idAsignatura = examen.selectedAsig;
        }
        
        examen.refrescarDatos = function(titulo, nombreCurso, grupoCurso, fecha, evaluacion, descripcion, asignatura, idAsignatura, idCurso, idExamen){
            examen.titulo = titulo;
            examen.curso = nombreCurso +" "+grupoCurso;
            //examen.grupo = grupoCurso;
            examen.fechaB = fecha;
            examen.evaluacion = evaluacion;
            examen.texto = descripcion;
            examen.asig = asignatura;
            examen.idAsignatura = idAsignatura;
            examen.idCurso = idCurso;
            examen.idExamen = idExamen;
        }
        
        examen.datosAlumno = function(idAlumno, nota){
            examen.nota = nota;
            examen.idAlumno = idAlumno;
        }
        
        examen.arreglarFecha = function(){
            stringFecha2 = examen.fecha;
            stringFecha = stringFecha2.toString();
            fechaSeparada = stringFecha.split(' ');
            var dia = fechaSeparada[2];
            mesLetras = fechaSeparada[1];
            var anyo = fechaSeparada[3];
            var mes = "";
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
                
            examen.fechaParam = anyo+"-"+mes+"-"+dia;
            examen.fechaB = dia+"-"+mes+"-"+anyo;
        }
        
        examen.crearExamen = function(){
            examen.arreglarFecha();
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/examen/examen", 
                method: "POST",
                data: {idProfesor: idProfesor, fecha: examen.fechaParam, idAsignatura: examen.idAsignatura,
                       idCurso: examen.idCurso, descripcion: examen.texto, titulo: examen.titulo, 
                       evaluacion: examen.evaluacion}
            }).success(function(response){
                examen.compuesto = angular.fromJson(response);
                examen.idExamen = examen.compuesto.idExamen;
                examen.publicado = true;
            })
        }
        
        examen.editarExamen = function(){
            fechaSeparada = examen.fechaB.split('-');
            console.log(fechaSeparada)
            var dia = fechaSeparada[0];
            var mes = fechaSeparada[1];
            var anyo = fechaSeparada[2];
            examen.fechaParam = anyo+"-"+mes+"-"+dia;
            
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/examen/examen", 
                method: "PUT",
                data: {fecha: examen.fechaParam, idAsignatura: examen.idAsignatura,
                       idCurso: examen.idCurso, descripcion: examen.texto, titulo: examen.titulo, 
                       evaluacion: examen.evaluacion, idExamen: examen.idExamen}
            }).success(function(response){
                console.log("Editado")
                examen.publicado = true;
            })
        }
        
        examen.editarExamen2 = function(){
            fechaSeparada = examen.fechaB.split('/');
            var dia = fechaSeparada[0];
            var mes = fechaSeparada[1];
            var anyo = fechaSeparada[2];
            examen.fechaParam = anyo+"-"+mes+"-"+dia;
            
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/examen/examen", 
                method: "PUT",
                data: {fecha: examen.fechaParam, idAsignatura: examen.idAsignatura,
                       idCurso: examen.idCurso, descripcion: examen.texto, titulo: examen.titulo, 
                       evaluacion: examen.evaluacion, idExamen: examen.idExamen}
            }).success(function(response){
                console.log("Editado")
                examen.publicado = true;
                //LLAMADA PARA RECOGER LOS EXAMENES DEL PROFESOR
                $http({
                    url: "http://localhost/prueba_api/alpha2/index.php/examen/examen/", 
                    method: "GET",
                    params: {idProfesor: idProfesor}
                }).then(function(response){
                    examen.compuesto = angular.fromJson(response.data);
                    examen.examenes = examen.compuesto;
                    examen.listExamenes = examen.examenes;
                    examen.filtrarCurso();
                })
            })
        }
        
        examen.guardado = false;
        examen.ponerNota = function(){
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/examen/examen", 
                method: "PUT",
                data: {nota: examen.nota, idAlumno: examen.idAlumno, idExamen: examen.idExamen}
            }).success(function(response){
                console.log("Editado")
                examen.guardado = true;
            })
        }
    }

    asistenciaController.$inject = ['$scope', '$http', '$window'];
    function asistenciaController($scope, $http, $window){
        if(sesionLocal){
            user1 = localStorage.user;
            idProfesor = localStorage.idProfesor;
        }
        if(sesionSesion){
            user1 = sessionStorage.getItem('user2');
            idProfesor = sessionStorage.getItem('idProfesor');
        }  
        var asistencia = this;
        asistencia.date = new Date();
        
        
        asistencia.arreglarFecha = function(){
            fecha1 = asistencia.date.toString();
            fechaSeparada = fecha1.split(' ');
            var dia = fechaSeparada[2];
            mesLetras = fechaSeparada[1];
            var anyo = fechaSeparada[3];
            var mes = "";
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
                
            asistencia.fechaB = dia+mes+anyo;
        }
        
        //LLAMADA PARA RECOGER LOS CURSOS DEL PROFESOR
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/curso/curso/", 
            method: "GET",
            params: {idProfesor: idProfesor}
        }).then(function(response){
            asistencia.compuesto = angular.fromJson(response.data);
            asistencia.lista = asistencia.compuesto;
        })
        
        //LLAMADA PARA RECOGER LOS ASIGNATURAS DEL PROFESOR
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/", 
            method: "GET",
            params: {idProfesor: idProfesor}
        }).then(function(response){
            asistencia.compuesto = angular.fromJson(response.data);
            asistencia.asignaturas = asistencia.compuesto;
        })
        
        //LLAMADA PARA RECOGER LOS JUSTIFICANTES DEL PROFESOR
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/asistencia/asistencia/", 
            method: "GET",
            params: {idProfesor: idProfesor, justificantes: 1}
        }).then(function(response){
            asistencia.compuesto = angular.fromJson(response.data);
            asistencia.justificantes = asistencia.compuesto;
            var con = 0;
            asistencia.justi = [];
            for(i=0;i<asistencia.justificantes.length;i++){
                if(asistencia.justificantes[i].justificada == 0){
                    asistencia.justi[con] = asistencia.justificantes[i];
                    con++;
                }
            }
        })
        
        asistencia.clickCurso = function(){
            asistencia.idCurso = asistencia.selectedCurso;
            asistencia.selectedAsig = "";
            asistencia.nombreCurso = "";
            asistencia.grupoCurso = "";
            asistencia.ver = false;
            for(var i=0;i<asistencia.lista.length;i++){
                if(asistencia.lista[i].idCurso == asistencia.idCurso){
                    asistencia.nombreCurso = asistencia.lista[i].nombre;
                    asistencia.grupoCurso = asistencia.lista[i].grupo;
                }
            }
            
            asistencia.listAsignaturas = {}
            var cont = 0;
            for(var i=0;i<asistencia.asignaturas.length;i++){
                if(asistencia.asignaturas[i].idCurso == asistencia.idCurso){
                    asistencia.listAsignaturas[cont] = asistencia.asignaturas[i];
                    cont++;
                }
            }
        }
        
        asistencia.clickAsignatura = function(){
            asistencia.idAsignatura = asistencia.selectedAsig;
            asistencia.arreglarFecha();
            //LLAMADA PARA RECOGER LOS ALUMNOS Y FALTAS DEL PROFESOR
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asistencia/asistencia", 
                method: "GET",
                params: {idAsignatura: asistencia.idAsignatura, idCurso: asistencia.idCurso, fecha: asistencia.fechaB}
            }).then(function(response){
                asistencia.compuesto = angular.fromJson(response.data);
                asistencia.alumnos = asistencia.compuesto;
                asistencia.ver = true;
            }, function errorCallback(response) {
                asistencia.ver = false;
            });
        }
        
        asistencia.ponerFalta = function(idAlumno, accion, id){
            if(accion == 0){
                $http({
                    url: "http://localhost/prueba_api/alpha2/index.php/asistencia/asistencia", 
                    method: "POST",
                    data: {idProfesor: idProfesor, fecha: asistencia.fechaB, idAsignatura: asistencia.idAsignatura,
                           idCurso: asistencia.idCurso, idAlumno: idAlumno}
                }).success(function(response){
                    asistencia.falta = false;   
                }).error(function(error) {
                    param = "idProfesor/"+idProfesor+"/fecha/"+asistencia.fechaB+"/idAsignatura/"+asistencia.idAsignatura
                            +"/idCurso/"+asistencia.idCurso+"/idAlumno/"+idAlumno;
                    $http({
                        url: "http://localhost/prueba_api/alpha2/index.php/asistencia/asistencia", 
                        method: "PUT",
                        data: {idProfesor: idProfesor, fecha: asistencia.fechaB, idAsignatura: asistencia.idAsignatura,
                               idCurso: asistencia.idCurso, idAlumno: idAlumno, justificada: 1}
                    }).success(function(response){
                    })
                });
            }else{
                $http({
                    url: "http://localhost/prueba_api/alpha2/index.php/asistencia/asistencia", 
                    method: "POST",
                    data: {idProfesor: idProfesor, fecha: asistencia.fechaB, idAsignatura: asistencia.idAsignatura,
                           idCurso: asistencia.idCurso, idAlumno: idAlumno}
                }).success(function(response){
                    asistencia.falta = false;   
                }).error(function(error) {
                    //PUT SI FUNCIONA
                    $http({
                        url: "http://localhost/prueba_api/alpha2/index.php/asistencia/asistencia", 
                        method: "PUT",
                        data: {idAsistencia: id, justificada: 1}
                    }).success(function(response){
                    })
                });
            }
        }
        
        asistencia.justifica = false
        asistencia.justificar = function(fecha2, idAsignatura, idCurso, idAlumno, idAsistencia, index){
            console.log(idAsistencia)
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asistencia/asistencia", 
                method: "PUT",
                data: {idAsistencia: idAsistencia, justificada: 1}
            }).success(function(response){
                asistencia.justifica = true;
            })
            
        }
    }

    mensajeController.$inject = ['$scope', '$http', '$window'];
    function mensajeController($scope, $http, $window){
        if(sesionLocal){
            user1 = localStorage.user;
            idProfesor = localStorage.idProfesor;
        }
        if(sesionSesion){
            user1 = sessionStorage.getItem('user2');
            idProfesor = sessionStorage.getItem('idProfesor');
        }
            var mensaje = this;
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                method: "GET",
                params: {idProfesor: idProfesor,
                         noleidos: 1}
            })
             .then(function(response) {
                mensaje.noLeidos = angular.fromJson(response.data); 
                mensaje.deAlumnos = mensaje.noLeidos.Alumno;
                mensaje.dePadres = mensaje.noLeidos.Padre;
                }, function errorCallback(response) {
                 mensaje.vacio = true;
            });
        
            mensaje.selectDatos = function(idProfesor, idAsignatura, persona, asignatura, rol){
                if(sesionLocal){
                    localStorage.setItem('persona', persona);
                    localStorage.setItem('asignatura', asignatura);
                    localStorage.setItem('idProfesor2', idProfesor);
                    localStorage.setItem('idAsignatura', idAsignatura);
                    localStorage.setItem('rol', rol);
                }
                if(sesionSesion){
                    sessionStorage.setItem('persona', persona);
                    sessionStorage.setItem('asignatura', asignatura);
                    sessionStorage.setItem('idProfesor2', idProfesor);
                    sessionStorage.setItem('idAsignatura', idAsignatura);
                    sessionStorage.setItem('rol', rol);
                }
            }
            
            mensaje.crearMensaje = function(idProfe, asunt, idMens){
                //LLAMADA PARA CREAR MENSAJE
                $http.post("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                              {emisor: "pro", idProfesor: idProfesor, receptor: "al", 
                               idProfesor: idProfe, asunto: asunt, texto: mensaje.formMensaje}
                ).then(function(response){
                    $http.put("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                                  {idMensaje: idMens, idProfesor: idProfesor, leido: 1}
                    ).then(function(response){
                        //$route.reload();
                        $window.location.reload();
                    })
                })
            }
            
            mensaje.marcarLeido = function(id){
                $http.put("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                              {idMensaje: id, idProfesor: idProfesor, leido: 1}
                ).then(function(response){
                    
                })
            }
        
    }

    mensajeNuevoController.$inject = ['$scope', '$http', '$window'];
    function mensajeNuevoController($scope, $http, $window){
        if(sesionLocal){
            user1 = localStorage.user;
            idProfesor = localStorage.idProfesor;
        }
        if(sesionSesion){
            user1 = sessionStorage.getItem('user2');
            idProfesor = sessionStorage.getItem('idProfesor');
        }
            noLei="idAlumno/"+idAlumno+"/noleidos/1";
            var nuevo = this;
            
//            //LLAMADA PARA RECOGER ASIGNATURAS DEL ALUMNO
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura", 
                method: "GET",
                params: {idAlumno: idAlumno}
            })
             .then(function(response) {
                nuevo.listAsignaturas = angular.fromJson(response.data);
            }, function errorCallback(response) {
                alert()
            });
        
            nuevo.selectAsig = function(){
                nuevo.arr = nuevo.selectedItem.split(',');
                             
                nuevo.profesor = nuevo.arr[0];
                nuevo.idAsignatura = nuevo.arr[1];
                nuevo.idProfesor = nuevo.arr[2];
                nuevo.nombreAsignatura = nuevo.arr[3];
                nuevo.mostrar=false;
            }
            
            nuevo.crearMensaje = function(){
                //LLAMADA PARA CREAR MENSAJE
                $http.post("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                              {emisor: "pro", idProfesor: idProfesor, receptor: "al", 
                               idProfesor: nuevo.idProfesor, asunto: nuevo.asunto, texto: nuevo.texto}
                ).then(function(response){
                    console.log("enviado")
                })
            }
    }

    msgHechosController.$inject = ['$scope', '$http', '$window'];
    function msgHechosController($scope, $http, $window){
        if(sesionLocal){
            user1 = localStorage.user;
            idProfesor = localStorage.idProfesor;
        }
        if(sesionSesion){
            user1 = sessionStorage.getItem('user2');
            idProfesor = sessionStorage.getItem('idProfesor');
        } 
            var msghechos = this;
            
//            //LLAMADA PARA RECOGER ASIGNATURAS DEL PROFESOR
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura", 
                method: "GET",
                params: {idProfesor: idProfesor}
            })
             .then(function(response) {
                msghechos.listAsignaturas = angular.fromJson(response.data);
            }, function errorCallback(response) {
                console.log("No hay")
            });
           
            //LLAMADA PARA RECOGER MENSAJES LEIDOS
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                method: "GET",
                params: {idProfesor: idProfesor}
            })
             .then(function(response) {
                msghechos.leidos = angular.fromJson(response.data);  
                msghechos.deAlumnos = msghechos.leidos.Alumno;
                msghechos.dePadres = msghechos.leidos.Padre;
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
            
            msghechos.selectDatos = function(idProfesor, idAsignatura, persona, asignatura, rol, idPerson){
                if(sesionLocal){
                    localStorage.setItem('persona', persona);
                    localStorage.setItem('asignatura', asignatura);
                    localStorage.setItem('idProfesor2', idProfesor);
                    localStorage.setItem('idAsignatura', idAsignatura);
                    localStorage.setItem('rol', rol);
                    localStorage.setItem('idPerson', idPerson);
                }
                if(sesionSesion){
                    sessionStorage.setItem('persona', persona);
                    sessionStorage.setItem('asignatura', asignatura);
                    sessionStorage.setItem('idProfesor2', idProfesor);
                    sessionStorage.setItem('idAsignatura', idAsignatura);
                    sessionStorage.setItem('rol', rol);
                    sessionStorage.setItem('idPerson', idPerson);
                }
                
                      
            }
            
            msghechos.init = function(){
                if(sesionLocal){
                    msghechos.nPersona = localStorage.persona;
                    msghechos.nAsignatura = localStorage.asignatura;
                    msghechos.idAsignatura = localStorage.idAsignatura;
                    msghechos.rol = localStorage.rol;
                    msghechos.idPerson = localStorage.idPerson;
                    var idAsignatura = localStorage.idAsignatura;
                }
                if(sesionSesion){    
                    msghechos.nPersona = sessionStorage.getItem('persona');
                    msghechos.nAsignatura = sessionStorage.getItem('asignatura');
                    msghechos.idAsignatura = sessionStorage.getItem('idAsignatura');
                    msghechos.rol = sessionStorage.getItem('rol');
                    msghechos.idPerson = sessionStorage.getItem('idPerson');
                    var idAsignatura = sessionStorage.getItem('idAsignatura');
                }
                msghechos.idPro = idProfesor;
                //LLAMADA PARA RECOGER MENSAJES LEIDOS
                $http({
                    url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                    method: "GET",
                    params: {idProfesor: msghechos.idPro}
                })
                 .then(function(response) {
                    msghechos.mensajes = angular.fromJson(response.data);
//                    msghechos.deAlumnos = msghechos.mensajes.Alumno;
//                    msghechos.dePadres = msghechos.mensajes.Padre;
                    
                    if(msghechos.rol == "alumno"){
                        msghechos.mensajesLol = msghechos.mensajes.Alumno;
                        msghechos.padreCrea = true;
                        //msghechos.conver = [];
                        var con = 0;
                        for(var i=0;i<msghechos.mensajesLol.length;i++){
                            if(msghechos.mensajesLol[i].idAsignatura == msghechos.idAsignatura){
                                msghechos.conver = msghechos.mensajesLol[i];
                                con++;
                            }
                        }
                        
                        
                        if(msghechos.rol == "alumno"){
                            msghechos.menPerson = msghechos.conver.MensajesAlumno;
                            msghechos.idAlum = msghechos.menPerson[0].idAlumno;
                        }
                        msghechos.menProf = msghechos.conver.MensajesProfesor;

                        var par = 0;
                        var impar = 1;
                        msghechos.todos = [];
                        for(var i=0;i<msghechos.menProf.length;i++){
                            msghechos.todos[impar] = msghechos.menProf[i];
                            impar = impar+2;
                        }
                        for(var j=0;j<msghechos.menPerson.length;j++){
                            msghechos.todos[par] = msghechos.menPerson[j];
                            par = par+2;
                        }
                        if(msghechos.todos.length % 2 != 0){
                            //
                            msghechos.llegit = msghechos.todos[msghechos.todos.length-1].leido;
                        }else{
                            msghechos.llegit = 1;
                            msghechos.dis = 1;
                        }
                        console.log(msghechos.todos)
                        msghechos.idM = msghechos.todos[msghechos.todos.length-1].idMensaje;
                    }
                    if(msghechos.rol == "padre"){
                        msghechos.mensajesLol = msghechos.mensajes.Padre;
                        
                        //msghechos.conver = [];
                        var con = 0;
                        for(var i=0;i<msghechos.mensajesLol.length;i++){
                            if(msghechos.mensajesLol[i].idPadre == msghechos.idPerson){
                                msghechos.conver = msghechos.mensajesLol[i];
                                con++;
                            }
                        }
                        msghechos.idPadre = msghechos.idPerson;
                        msghechos.menProf = msghechos.conver.MensajesProfesor;    
                        if(msghechos.conver.MensajesPadre != null){ 
                                //Existen mensajes de padre
                            msghechos.menPerson = msghechos.conver.MensajesPadre;
                                
                            if(msghechos.menProf == null){
                                console.log("sies null")
                                msghechos.padreCrea = true;
                                var par = 0;
                                var impar = 1;
                                msghechos.todos = [];
                                for(var j=0;j<msghechos.menPerson.length;j++){
                                    msghechos.todos[par] = msghechos.menPerson[j];
                                    par = par+2;
                                }
                                msghechos.dis = 0;
                                msghechos.llegit = msghechos.todos[0].leido;
                                msghechos.idM = msghechos.todos[msghechos.todos.length-1].idMensaje; 
                            }else{
                                console.log("soy miii")
                                 msghechos.fechaProf = msghechos.menProf[0].fecha;
                                msghechos.fechapadr = msghechos.menPerson[0].fecha;
                     
                            var fechaProfesor = new Date(msghechos.fechaProf)
                            var fechaPadre = new Date(msghechos.fechapadr)
                            if(fechaProfesor < fechaPadre){//Profesor lo hizo primero
                                console.log("soy guao")
                                msghechos.profesorCrea = true;
                                var par = 0;
                                var impar = 1;
                                msghechos.todos = [];
                            
                                for(var i=0;i<msghechos.menProf.length;i++){
                                    msghechos.todos[par] = msghechos.menProf[i];
                                    par = par+2;
                                }
                                for(var j=0;j<msghechos.menPerson.length;j++){
                                    msghechos.todos[impar] = msghechos.menPerson[j];
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
                            }else{ //Lo crea el padre primero
                                msghechos.padreCrea = true;
                                var par = 0;
                                var impar = 1;
                                msghechos.todos = [];
                            
                                for(var i=0;i<msghechos.menProf.length;i++){
                                    msghechos.todos[impar] = msghechos.menProf[i];
                                    impar = impar+2;
                                }
                                for(var j=0;j<msghechos.menPerson.length;j++){
                                    msghechos.todos[par] = msghechos.menPerson[j];
                                    par = par+2;
                                }
                                if(msghechos.todos.length % 2 != 0){
                                    //
                                    msghechos.llegit = msghechos.todos[msghechos.todos.length-1].leido;
                                }else{
                                    msghechos.llegit = 1;
                                    msghechos.dis = 1;
                                }
                                msghechos.idM = msghechos.todos[msghechos.todos.length-1].idMensaje;  
                            }                               
                            }
                        }else{ //El profesor lo crea y el padre aun no ha respndido
                            msghechos.menPerson = [];
                            msghechos.profesorCrea = true;
                            var par = 0;
                            var impar = 1;
                            msghechos.todos = [];
                            for(var i=0;i<msghechos.menProf.length;i++){
                                msghechos.todos[par] = msghechos.menProf[i];
                                impar = impar+2;
                            }
                            if(msghechos.todos.length % 2 != 0){
                                //msghechos.llegit = msghechos.todos[msghechos.todos.length-1].leido;
                                
                            }else{
                                msghechos.llegit = 1;
                                msghechos.dis = 1;
                            }
                            msghechos.idM = msghechos.todos[msghechos.todos.length-1].idMensaje;
                        }
                            

                    }

                    
                    }, function errorCallback(response) {
                    console.log("No hay mensajes")
                });


            }
            
            
            msghechos.marcarLeido = function(id){
                if(msghechos.rol == "alumno"){
                    $http({
                        url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje", 
                        method: "PUT",
                        data: {idMensaje: msghechos.idM, idAlumno: msghechos.idAlum, leido: 1},
                        headers : { 'Content-Type': 'application/json' }
                    }).success(function(response){
                        msghechos.llegit = 1;
                    })   
                }
                if(msghechos.rol == "padre"){
                    $http({
                        url: "http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje", 
                        method: "PUT",
                        data: {idMensaje: msghechos.idM, idPadre: msghechos.idPadre, leido: 1},
                        headers : { 'Content-Type': 'application/json' }
                    }).success(function(response){
                        msghechos.llegit = 1;
                    })   
                }

            }
            
            msghechos.responderMensaje = function(){
                if(msghechos.rol == "alumno"){
                    //LLAMADA PARA CREAR MENSAJE
                    $http.post("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                                  {emisor: "pro", idProfesor: msghechos.idPro, receptor: "al", 
                                   idProfesor: msghechos.idPro, texto: msghechos.formMensaje,
                                   idAsignatura: msghechos.idAsignatura, idAlumno: msghechos.idAlum}
                    ).then(function(response){
                        console.log("anana")
                        msghechos.responder = false;
                        msghechos.respon = true;
                    })                    
                }
                if(msghechos.rol == "padre"){
                    //LLAMADA PARA CREAR MENSAJE
                    $http.post("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                                  {emisor: "pro", idProfesor: msghechos.idPro, receptor: "pa", 
                                   idProfesor: msghechos.idPro, texto: msghechos.formMensaje,
                                   idAsignatura: msghechos.idAsignatura, idPadre: msghechos.idPadre}
                    ).then(function(response){
                        console.log("anana")
                        msghechos.responder = false;
                        msghechos.respon = true;
                    })        
                }
                

            }
            
            msghechos.crearMensaje = function(idProfe, asunt, idMens){
                if(msghechos.rol == "alumno"){
                    //LLAMADA PARA CREAR MENSAJE
                    $http.post("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                                  {emisor: "pro", idProfesor: msghechos.idPro, receptor: "al", 
                                   idProfesor: idProfe, asunto: asunt, texto: msghechos.formMensaje,
                                   idAsignatura: msghechos.idAsignatura, idAlumno: msghechos.idAlum}
                    ).then(function(response){
                        console.log("anana")
                        $window.location.reload();
                    })  
                }
                if(msghechos.rol == "padre"){
                    //LLAMADA PARA CREAR MENSAJE
                    $http.post("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                                  {emisor: "pro", idProfesor: msghechos.idPro, receptor: "al", 
                                   idProfesor: idProfe, asunto: asunt, texto: msghechos.formMensaje,
                                   idAsignatura: msghechos.idAsignatura, idPadre: msghechos.idPadre}
                    ).then(function(response){
                        console.log("anana")
                        $window.location.reload();
                    })  
                }

            }
    }

    mensajeNuevoController.$inject = ['$scope', '$http', '$window'];
    function mensajeNuevoController($scope, $http, $window){
        if(sesionLocal){
            user1 = localStorage.user;
            idProfesor = localStorage.idProfesor;
        }
        if(sesionSesion){
            user1 = sessionStorage.getItem('user2');
            idProfesor = sessionStorage.getItem('idProfesor');
        } 
            var nuevo = this;
        
        //LLAMADA PARA RECOGER LOS CURSOS DEL PROFESOR
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/curso/curso/", 
            method: "GET",
            params: {idProfesor: idProfesor}
        }).then(function(response){
            nuevo.compuesto = angular.fromJson(response.data);
            nuevo.lista = nuevo.compuesto;
        })
        
        nuevo.selectCurso = function(){
            //LLAMADA PARA RECOGER LOS ASIGNATURAS DEL PROFESOR
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/", 
                method: "GET",
                params: {idProfesor: idProfesor, idCurso: nuevo.curso}
            }).then(function(response){
                nuevo.compuesto = angular.fromJson(response.data);
                nuevo.asignaturas = nuevo.compuesto;
            })
        }            
            
        nuevo.selectAsig = function(){
            nuevo.alumnos = [];
            nuevo.alumnos3 = [];
            var cont = 0;
            for(var i=0;i<nuevo.asignaturas.length;i++){
                if(nuevo.asignaturas[i].idAsignatura == nuevo.idAsignatura){
                    nuevo.alumnos = nuevo.asignaturas[i].alumnos;
                    nuevo.alumnos2 = true;
                }
            }

        }
                
        nuevo.selectAlum = function(){
            //LLAMADA PARA RECOGER LOS ALUMNOS DEL PROFESOR
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/padre/padre/", 
                method: "GET",
                params: {idAlumno: nuevo.idAlumno, padres: 1}
            }).then(function(response){
                nuevo.padres = angular.fromJson(response.data);
                
                
            })
        }
        
        nuevo.padre = function(){
            nuevo.mostrar = true;
            nuevo.padre = {};
            for(var i=0;i<nuevo.padres.length;i++){
                if(nuevo.padres[i].idPadre == nuevo.idPadre){
                    nuevo.padre = nuevo.padres[i].nombre
                }
            }
        }
        
            nuevo.crearMensaje = function(){
                //LLAMADA PARA CREAR MENSAJE
                $http.post("http://localhost/prueba_api/alpha2/index.php/mensaje/mensaje",
                              {emisor: "pro", idPadre: nuevo.idPadre, receptor: "pa", 
                               idProfesor: idProfesor, asunto: nuevo.asunto, texto: nuevo.texto,
                               idAsignatura: nuevo.idAsignatura}
                ).then(function(response){
                    console.log("enviado")
                })
            }
    }

    mencionController.$inject = ['$scope', '$http', '$window'];
    function mencionController($scope, $http, $window){
        if(sesionLocal){
            user1 = localStorage.user;
            idProfesor = localStorage.idProfesor;
        }
        if(sesionSesion){
            user1 = sessionStorage.getItem('user2');
            idProfesor = sessionStorage.getItem('idProfesor');
        }  
         var mencion = this;
        
        //LLAMADA PARA RECOGER LOS CURSOS DEL PROFESOR
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/curso/curso/", 
            method: "GET",
            params: {idProfesor: idProfesor}
        }).then(function(response){
            mencion.compuesto = angular.fromJson(response.data);
            mencion.lista = mencion.compuesto;
        })
        
        //LLAMADA PARA RECOGER LOS ASIGNATURAS DEL PROFESOR
        $http({
            url: "http://localhost/prueba_api/alpha2/index.php/asignatura/asignatura/", 
            method: "GET",
            params: {idProfesor: idProfesor}
        }).then(function(response){
            mencion.compuesto = angular.fromJson(response.data);
            mencion.asignaturas = mencion.compuesto;
        })
        
        mencion.clickCurso = function(){
            mencion.idCurso = mencion.selectedCurso;
            mencion.nombreCurso = "";
            mencion.grupoCurso = "";
            for(var i=0;i<mencion.lista.length;i++){
                if(mencion.lista[i].idCurso == mencion.idCurso){
                    mencion.nombreCurso = mencion.lista[i].nombre;
                    mencion.grupoCurso = mencion.lista[i].grupo;
                }
            }
            mencion.listAsignaturas = {}
            var cont = 0;
            for(var i=0;i<mencion.asignaturas.length;i++){
                if(mencion.asignaturas[i].idCurso == mencion.idCurso){
                    mencion.listAsignaturas[cont] = mencion.asignaturas[i];
                    cont++;
                }
            }

        }
        
        mencion.clickAsignatura = function(){
            mencion.idAsignatura = mencion.selectedAsig;
        
            //LLAMADA PARA RECOGER LOS ALUMNOS DEL PROFESOR
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/alumno/alumno/", 
                method: "GET",
                params: {idAsignatura: mencion.idAsignatura, 
                         idCurso: mencion.idCurso}
            }).then(function(response){
                mencion.compuesto = angular.fromJson(response.data);
                mencion.alumnos = mencion.compuesto;
            })
        }
        
        mencion.clickAlumno = function(){
            mencion.idAlumno = mencion.selectedAlum;
        }

        mencion.crearAnuncio = function(){
            $http({
                url: "http://localhost/prueba_api/alpha2/index.php/mencion/mencion/", 
                method: "POST",
                data: {titulo: mencion.titulo, descripcion: mencion.texto, 
                       idCurso: mencion.idCurso, idAsignatura: mencion.idAsignatura, 
                       idAlumno: mencion.idAlumno}
            }).success(function(response){
                console.log("siiiiii")
                mencion.publicado = true;
                //$window.location.reload();
            })
        }

    }