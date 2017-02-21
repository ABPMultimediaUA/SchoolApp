function TGestorRecursos() {
    
    this.recursos = [];
}

TGestorRecursos.prototype.getRecurso = function(resourceToGet) {
    
    var control = false;
    
    for(var i=0; i<this.recursos.length; i++) {
        if(this.recursos[i].getNombre().localeCompare(resourceToGet.getNombre()) == 0) {
            control = true;
            return this.recursos[i]; //Ojo con los return por enmedio
        }
    }
    if(control == false) {
        //ELEMENTO NO ENCONTRADO. CREAR ELEMENTO.
        
    }
}




function TRecurso() {
	
    var nombre = "Nombre_Por_Defecto";
}

TRecurso.prototype.getNombre = function() {
    
    alert("El nombre de esta entidad es: " + this.nombre);
}

TRecurso.prototype.setNombre = function(nuevoNombre) {
    
    this.nombre = nuevoNombre;
}

//TESTING

var recursillo = new TRecurso();
recursillo.getNombre();
recursillo.setNombre("Nuevo nombre");
recursillo.getNombre();

//END TESTING

//Entity.prototype.beginDraw = function() {
//	alert('Beginning the draw process (Entity)');
//};
//
//Entity.prototype.endDraw = function() {
//	alert('Ending the draw process (Entity)');
//};
//
//
////Estas serian las entidades que derivan de Entity
//
//function Transform() {
//	Entity.call(this);
//	alert('I am the alert from the transform entity type');
//}
//function Luz() {
//	Entity.call(this);
//	alert('I am the alert from the luz entity type');
//}
//function Camara() {
//	Entity.call(this);
//	alert('I am the alert from the camara entity type');
//}
//function Malla() {
//	Entity.call(this);
//	alert('I am the alert from the malla entity type');
//}