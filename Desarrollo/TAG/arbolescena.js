
function Node() {
	this.entity = ?;
	this.children = [];
	this.father = ?;
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

//Aqui falta un getter/setter de la propia entidad, un draw a la entidad asociada
//y



//"Clase" de la que derivan todas las entidades

function Entity() {
	this.beginDraw();
	this.endDraw();
}

Entity.prototype.beginDraw = function() {
	alert('Beginning the draw process');
};

Entity.prototype.endDraw = function() {
	alert('Ending the draw process');
};


//Estas serian las entidades que derivan de Entity

function Transform() {
	Entity.call(this);
}
function Luz() {
	Entity.call(this);
}
function Camara() {
	Entity.call(this);
}
function Malla() {
	Entity.call(this);
}
