
function Node() {
	this.entity = []; //No estoy del todo seguro de como deberia definir aqui entity
	this.children = [];
	this.father = []; //Lo mismo aqui
	this.localMatrix = m4.identity();
	this.worldMatrix = m4.identity();
}

Node.prototype.setParent = function(parent) {
	//Separarnos del parent si tenemos uno
	if (this.parent) {
		var nodox = this.parent.children.indexOf(this);
		if(nodox >= 0) {
			this.parent.children.splice(nodox, 1);
		}
	}
	
	//Si no tenemos parent, nos anyadimos el parent pasado por parametro
	if(parent) {
		//Hacemos el append al padre para que el padre tenga a este nodo como su hijo
		parent.children.append(this);
	}
	//Setteamos este nodo para que tenga como padre al padre por parametro
	this.parent = parent;
}

Node.prototype.addChildren = function(childToAdd) {
	if(childToAdd) {
		this.children.append(childToAdd)
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
	this.Entity.beginDraw();
	this.Entity.endDraw();
}

Node.prototype.setEntity = function(entity) {
	this.Entity = entity;
}

//Aqui falta un getter/setter de la propia entidad, un draw a la entidad asociada
//y



//"Clase" de la que derivan todas las entidades

function Entity() {
	this.beginDraw();
	this.endDraw();
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
