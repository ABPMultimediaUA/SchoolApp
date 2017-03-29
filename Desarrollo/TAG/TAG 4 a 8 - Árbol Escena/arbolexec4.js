/**
 * @arbolexec4.js
 * Fichero javascript que se encarga de demostrar el funcionamiento del arbol de la escena.
 *
 * Ejecutable principal del entregable 4 de la asignatura TAG.
 *
 * Creamos cuatro nodos del arbol de la escena. Un nodo padre, dos nodos hijos, y un nodo nieto, 
 * hijo de uno de los hijos del padre. De esta forma, podemos demostrar el recorrido del arbol
 * en preorden y la asignacion de distintas entidades a cada uno de los nodos.
 */



/*************** ENTREGABLE 4 ***************/

var nuevoNodo = new Node();
var nuevoNodoHijo = new Node();
var nuevoNodoNieto = new Node();
var nuevoNodoHijo2 = new Node();

nuevoNodo.addChildren(nuevoNodoHijo);
nuevoNodo.addChildren(nuevoNodoHijo2);
nuevoNodoHijo.addChildren(nuevoNodoNieto);

var nuevaEntidadTransform = new Transform();
var nuevaEntidadTransform2 = new Transform();
var nuevaEntidadLuz = new Luz();
var nuevaEntidadCamara = new Camara();

nuevoNodo.setEntity(nuevaEntidadTransform);
nuevoNodoHijo.setEntity(nuevaEntidadTransform2);
nuevoNodoNieto.setEntity(nuevaEntidadLuz);
nuevoNodoHijo2.setEntity(nuevaEntidadCamara);

//Ahora realizamos las llamada al draw del nodo principal.

console.log("Iniciando prueba del Ejecutable 4: ");
nuevoNodo.draw();

/*************** ENTREGABLE 4 END ***************/
