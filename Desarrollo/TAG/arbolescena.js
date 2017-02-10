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
	alert('I am the alert from the transform entity type');
}
function Luz() {
	Entity.call(this);
	alert('I am the alert from the luz entity type');
}
function Camara() {
	Entity.call(this);
	alert('I am the alert from the camara entity type');
}
function Malla() {
	Entity.call(this);
	alert('I am the alert from the malla entity type');
}