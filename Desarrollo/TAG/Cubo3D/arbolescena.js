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

/*
	@constructor
	@abstract
*/

var Entity = function() {
	if (this.constructor === Entity) {
		throw new Error("Clase abstracta instanciada");	
	}
};

/*
	@abstract methods
*/
Entity.prototype.beginDraw = function() {
	throw new Error("Metodo abstracto");
}

Entity.prototype.endDraw = function() {
	throw new Error("Metodo abstracto");
}

//Entidad Transform - "Hereda" de Entity

var Transform = function() {
	Entity.apply(this, "Transformacion");
};

Transform.prototype = Object.create(Entity.prototype);
Transform.prototype.constructor = Entity;

Transform.prototype.beginDraw = function() {
	console.log('Transform - Begin Draw');
}

Transform.prototype.endDraw = function() {
	console.log('Transform - End Draw');
}

//Entidad Luz - "Hereda" de Entity

var Luz = function() {
	Entity.apply(this, "Luz");
};

Luz.prototype = Object.create(Entity.prototype);
Luz.prototype.constructor = Entity;

Luz.prototype.beginDraw = function() {
	console.log('Luz - Begin Draw');
}

Luz.prototype.endDraw = function() {
	console.log('Luz - End Draw');
}

//Entidad Camara - "Hereda" de Entity

var Camara = function() {
	Entity.apply(this, "Camara");
};

Camara.prototype = Object.create(Entity.prototype);
Camara.prototype.constructor = Entity;

Camara.prototype.beginDraw = function() {
	console.log('Camara - Begin Draw');
}

Camara.prototype.endDraw = function() {
	console.log('Camara - End Draw');
}

//Entidad Malla - "Hereda" de Entity

var Malla = function() {
	Entity.apply(this, []);
};

Malla.prototype = Object.create(Entity.prototype);
Malla.prototype.constructor = Entity;

Malla.prototype.beginDraw = function() {
	console.log('Malla - Begin Draw');
}

Malla.prototype.endDraw = function() {
	console.log('Malla - End Draw');
}

