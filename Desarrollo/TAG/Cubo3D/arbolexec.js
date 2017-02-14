/*
Ejecutable principal del entregable 4 de la asignatura TAG.
Creamos tres nodos del arbol de la escena, asignamos al nodo hijo una nueva entidad de tipo
Transform, por ejemplo, y al nodo nieto una entidad Luz. Creamos tambien otro hijo del primer nodo
para demostrar el recorrido del arbol en preorden.
*/
/*
var nuevoNodo = new Node();
var nuevoNodoHijo = new Node();
var nuevoNodoNieto = new Node();
var nuevoNodoHijo2 = new Node();

nuevoNodoHijo.setParent(nuevoNodo);
nuevoNodoHijo2.setParent(nuevoNodo);
nuevoNodoNieto.setParent(nuevoNodoHijo);

var nuevaEntidadTransform = new Transform();
var nuevaEntidadLuz = new Luz();

nuevoNodoHijo.setEntity(nuevaEntidadTransform);
nuevoNodoNieto.setEntity(nuevaEntidadLuz);
*/
/*
Ahora realizamos las llamadas al draw de ambas entidades
*/

var malla1 = new Malla();
var luz1 = new Luz();
var transform1 = new Transform();
var malla2 = new Malla();

var chachiNodo = new Node(luz1);
var chachiNodoHijo = new Node(malla1);

chachiNodoHijo.setParent(chachiNodo);

chachiNodo.draw();

//Preorder traversal

/*this.preorder = function(){
		this.visited();
		if(this.firstChild != null){
			this.firstChild.preorder();
		}
		if(this.nextSibling != null){
			this.nextSibling.preorder();
		}
	}*/