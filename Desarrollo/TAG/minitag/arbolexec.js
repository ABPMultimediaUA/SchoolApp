/*
Ejecutable principal del entregable 4 de la asignatura TAG.
Creamos tres nodos del arbol de la escena, asignamos al nodo hijo una nueva entidad de tipo
Transform, por ejemplo, y al nodo nieto una entidad Luz. Creamos tambien otro hijo del primer nodo
para demostrar el recorrido del arbol en preorden.
*/


var malla1 = new Malla();
var luz1 = new Luz();
var transform1 = new Transform();
var malla2 = new Malla();
var camara1 = new Camara();

var chachiNodo = new Node(luz1);
var chachiNodoHijo = new Node(malla1);
var chachiNodoNieto = new Node(transform1);
var chachiNodoNieto2 = new Node(camara1);

chachiNodoHijo.setParent(chachiNodo);
chachiNodoNieto.setParent(chachiNodoHijo);
chachiNodoNieto2.setParent(chachiNodoHijo);

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