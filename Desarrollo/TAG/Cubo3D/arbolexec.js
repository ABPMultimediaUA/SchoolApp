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

malla1.beginDraw();
malla1.endDraw();
