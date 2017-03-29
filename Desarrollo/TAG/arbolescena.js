/**
 * @arbolescena
 * Fichero javascript que se encarga del manejo de jerarquias en el motor.
 *
 */

var pila = [];
var matrizActual = mat4.create();



/*************** NODE ***************/

function Node() {
	this.entity = null;
	this.children = new Array();
	this.parent = null;
    
	//this.localMatrix = m4.identity();
	//this.worldMatrix = m4.identity();
}

Node.prototype.getParent = function() {
    return this.parent;
}

Node.prototype.getEntity = function() {
    return this.entity;
}

/*
Node.prototype.setParent = function(parent) {
	//Separarnos del parent si tenemos uno
	alert('Hola');
	if (this.parent != "") {
		alert('Esto no deberia salir nunca');
		var nodox = this.parent.children.indexOf(this);
		if(nodox >= 0) {
			this.parent.children.splice(nodox, 1);
		}
	}
	
	//Si no tenemos parent, nos anyadimos el parent pasado por parametro
	if(parent) {
		//Hacemos el push al padre para que el padre tenga a este nodo como su hijo
		parent.children.push(this);
		alert('Esto si deberia salir');
	}
	//Setteamos este nodo para que tenga como padre al padre por parametro
	this.parent = parent;
	alert('Esto tambien');
}
*/

Node.prototype.addChildren = function(childToAdd) {
    
	if(childToAdd) {
        childToAdd.parent = this;
		this.children.push(childToAdd);
        return this.children.length;
	}
}

Node.prototype.removeChildren = function(childToRemove) {
	if(childToRemove) {
		var nodox = this.children.indexOf(childToRemove);
		if(nodox >= 0) {
			this.children.splice(nodox, 1);
		}
	}
}

Node.prototype.draw = function() {

	if(this.entity){
		this.entity.beginDraw();
	}
    
    for(var i=0; i<this.children.length; i++) {
        this.children[i].draw();
    }
    
    if(this.entity) {
        this.entity.endDraw();
    }
}

Node.prototype.setEntity = function(entity) {
	this.entity = entity;
}

/*************** NODE END ***************/



/*************** ENTITY ***************/

//"Clase" de la que derivan todas las entidades

function Entity() {}

Entity.prototype.beginDraw = function() {
	console.log('Beginning the draw process (Entity)');
};

Entity.prototype.endDraw = function() {
	console.log('Ending the draw process (Entity)');
};

/*************** ENTITY END ***************/



/*************** TRANSFORM ***************/

function Transform() {
	
    this.matriz = mat4.create();
}

Transform.prototype = new Entity;

Transform.prototype.identity = function() {
    
    mat4.identity(this.matriz); //Asignamos la matriz identidad a nuestra transformacion
}

Transform.prototype.cargar = function(matrix) {
    
    mat4.copy(this.matriz, matrix);
}

Transform.prototype.trasponer = function() {
    
    mat4.transpose(this.matriz, this.matriz);
}

Transform.prototype.translate = function(tx, ty, tz) {
    
    //Creamos un vector 1x3
    var vectorTranslate = vec3.create();
    
    //Introducimos en el vector las coordenadas de traslacion en los distintos ejes
    vec3.set(vectorTranslate, tx, ty, tz);
    //Multiplicamos la matriz por el vector de traslacion
    mat4.translate(this.matriz, this.matriz, vectorTranslate);
}

Transform.prototype.rotate = function(ang, rx, ry, rz) {
    
    //Creamos un vector que contendra los 3 ejes
    var axis = vec3.create();
    
    //Setteamos el vector a la cantidad de rotacion especificada por parametro
    vec3.set(axis, rx, ry, rz);
    
    //Como el angulo esta en radianes lo convertimos
    var rad = ang * Math.PI /180;
    
    //Ahora aplicamos la transformacion (rotacion)
    mat4.rotate(this.matriz, this.matriz, rad, axis);
}

Transform.prototype.scale = function(sx, sy, sz) {
    
    //Creamos un vector 1x3
    var vectorScale = vec3.create();
    
    //Introducimos en el vector las coordenadas de escalado en los distintos ejes
    vec3.set(vectorScale, sx, sy, sz);
    //Multiplicamos la matriz por el vector de escalado
    mat4.scale(this.matriz, this.matriz, vectorScale);
}

Transform.prototype.beginDraw = function() {
    
    console.log("Beginning the draw process (Transform)");
    
    //Necesitamos una variable auxiliar para almacenar la matriz actual
    var aux = mat4.create();
    //Copiamos la matriz actual en el auxiliar
    mat4.copy(aux, matrizActual);
    
    //Apilamos la que era hasta ahora la matriz actual
    pila.push(aux);
    //Multiplicamos la matriz actual por la matriz de transformacion y ponemos el resultado
    //como nueva matriz actual
    mat4.multiply(matrizActual, this.matriz, matrizActual);
}

Transform.prototype.endDraw = function() {
    
    matrizActual = pila.pop();
    
    /*
    if(this.matriz.length < 1) {
		this.matriz[0] = LIBS.get_I4();
	}
    */
}

/*************** TRANSFORM END ***************/



/*************** LUZ ***************/

function Luz() {
	
    this.intensidad = vec3.create();
    this.ambient = vec3.create();
    this.diffuse = vec3.create();
    this.specular = vec3.create();

}

Luz.prototype = new Entity;

Luz.prototype.setIntensidad = function(parameterIntensidad) {

	this.intensidad = parameterIntensidad;
}

Luz.prototype.setValues = function(vAmbient, vDiffuse, vSpecular) {
    
    if(v1 != 0) {
        this.ambient = v1;
    }
    if(v2 != 0) {
        this.diffuse = v2;
    }
    if(v3 != 0) {
        this.specular = v3;
    }
}

Luz.prototype.getIntensidad = function() {

	return this.intensidad;
	console.log('La intensidad es: ' + this.intensidad);
}

Luz.prototype.beginDraw = function() {};
Luz.prototype.endDraw = function() {};

/*************** LUZ END ***************/



/*************** CAMARA ***************/

function Camara() {
	
    this.esPerspectiva = true;
    
    this.fovy = 0;
    this.near = 0;
    this.far = 0;
    
    this.aspect = 0;
    this.bottom = 0;
    this.top = 0;
    this.left = 0;
    this.right = 0;
}

Camara.prototype = new Entity;

Camara.prototype.setEsPerspectiva = function(angle, aspect, parameterNear, parameterFar) {

	this.esPerspectiva = true;
    
    this.fovy = angle;
    this.aspect = aspect;
    this.near = parameterNear;
    this.far = parameterFar;
}

Camara.prototype.setEsParalela = function(left, right, bottom, top, near, far) {
    
    this.esPerspectiva = false;
    
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    this.near = near;
    this.far = far;
}

Camara.prototype.beginDraw = function() {};
Camara.prototype.endDraw = function() {};

/*************** CAMARA END ***************/



/*************** MALLA ***************/

function Malla(m) {
	
    this.malla = m;
}

Malla.prototype = new Entity;

Malla.prototype.cargarMalla = function(fichero) {
    
    var malla = gestor.getRecurso(fichero, "malla");
    this.malla = malla;
}

Malla.prototype.cargarTextura = function(fichero) {
    
    var textura = gestor.getRecurso(fichero, "textura");
    //Creamos un sub-atributo de malla para guardar dentro de este la textura de dicha malla
    this.malla.textura = textura;
}

Malla.prototype.cargarMaterial = function(fichero) {
    
    var material = gestor.getRecurso(fichero, "material");
    //Creamos un sub-atributo de malla para guardar dentro de este el material de dicha malla
    //(No se si esto hace falta)
    this.malla.material = material;
}

Malla.prototype.beginDraw() = function() {

    console.log("Beginning the draw process(Malla)")
    
	this.malla.draw();
};

Malla.prototype.endDraw() = function() {};

/*************** MALLA END ***************/

/*************** FILE END ***************/