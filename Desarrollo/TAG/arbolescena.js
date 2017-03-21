//http://stackoverflow.com/questions/1595611/how-to-properly-create-a-custom-object-in-javascript

function Node() {
	this.entity = ""; //No estoy del todo seguro de como deberia definir aqui entity
	this.children = [];
	this.parent = ""; //Lo mismo aqui
	//this.localMatrix = m4.identity();
	//this.worldMatrix = m4.identity();
}

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

Node.prototype.addChildren = function(childToAdd) {
	if(childToAdd) {
		this.children.push(childToAdd)
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
	//Habria que hacer que las alertas de las entidades asociadas al nodo saltaran aqui
	//y no en el constructor de las susodichas entidades, no?
	if(this.entity != ""){
		this.entity.beginDraw();
		this.entity.endDraw();
	}
}

Node.prototype.setEntity = function(entity) {
	this.entity = entity;
}


//"Clase" de la que derivan todas las entidades

function Entity() {
	//Tengo dudas sobre como crearia una clase virtual de C++ en Javascript
	//Creo que no es necesario declarar aqui ninguna funcion, que con lo que hay abajo:
	//Entity.call(this), ya hace la llamada a los alert desde las implementaciones de la clase virtual.
}

Entity.prototype.beginDraw = function() {
	alert('Beginning the draw process (Entity)');
};

Entity.prototype.endDraw = function() {
	alert('Ending the draw process (Entity)');
};


//Estas serian las entidades que derivan de Entity

function Transform() {
	Entity.call(this);

	this.matriz = [];
	this.matriz[0] = LIBS.get_I4();

	alert('I am the alert from the transform entity type');
}

Transform.prototype.cargar = function(matrix) {

	return this.matriz[this.matriz.length - 1] = matrix;
};

Transform.prototype.topStack = function() {

	return this.matriz[this.matriz.length -1].slice();
};

Transform.prototype.apilar = function() {

	this.matriz.push(this.topStack());
};

Transform.prototype.rotateX = function(angulo) {

	LIBS.rotateX(this.topStack(), angulo);
};

Transform.prototype.rotateY = function(angulo) {

	LIBS.rotateY(this.topStack(), angulo);
};

Transform.prototype.rotateZ = function(angulo) {

	LIBS.rotateZ(this.topStack(), angulo);
};

Transform.prototype.translateX = function(distancia) {

	LIBS.translateX(this.topStack(), distancia);
};

Transform.prototype.translateY = function(distancia) {

	LIBS.translateY(this.topStack(), distancia);
};

Transform.prototype.translateZ = function(distancia) {

	LIBS.translateZ(this.topStack(), distancia);
};

Transform.prototype.beginDraw = function() {

	this.apilar();

};

Transform.prototype.endDraw = function() {

	this.matriz.pop();

	if(this.matriz.length < 1) {
		this.matriz[0] = LIBS.get_I4();
	}
};


function Luz() {
	Entity.call(this);

	this.intensidad = "";
	this.tipo = "";

	alert('I am the alert from the luz entity type');
}

Luz.prototype.setIntensidad = function(parameterIntensidad) {

	this.intensidad = parameterIntensidad;
};

Luz.prototype.getIntensidad = function() {

	return this.intensidad;
	alert('La intensidad es: ' + this.intensidad);
};

Luz.prototype.setTipo = function(parameterTipo) {

	this.tipo = parameterTipo;
};

Luz.prototype.getTipo = function() {

	return this.tipo;
};

Luz.prototype.beginDraw = function() {};
Luz.prototype.endDraw = function() {};

function Camara() {
	Entity.call(this);

	var esPerspectiva = false;
	var cercano;
	var lejano;
	
	alert('I am the alert from the camara entity type');
}

Camara.prototype.setEsPerspectiva = function(parameterPerspectiva) {

	this.esPerspectiva = parameterPerspectiva;
};

Camara.prototype.getPerspectiva = function() {

	return this.esPerspectiva;
};

Camara.prototype.beginDraw = function() {};
Camara.prototype.endDraw = function() {};

function Malla() {
	Entity.call(this);

	var malla = "";

	alert('I am the alert from the malla entity type');
}
/*
Malla.prototype.cargarMalla() = function(fichero) {

	//this.malla.cargarFichero(fichero); *Funcion hecha en el gestor de recursos*
	alert('Cargar malla');
};
*/
Malla.prototype.beginDraw() = function() {

	//this.malla.draw();
	alert('Begin draw de malla');
};

Malla.prototype.endDraw() = function() {};