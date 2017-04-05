/**
 * @arbolexec
 * Fichero javascript que se encarga de demostrar el funcionamiento del arbol de la escena.
 * 
 * Esta dividido en apartados individuales para demostrar por separado el funcionamiento de cada
 * uno de los entregables.
 *
 */


/**
 * Ejecutable principal del entregable 4 de la asignatura TAG.
 *
 * Creamos cuatro nodos del arbol de la escena. Un nodo padre, dos nodos hijos, y un nodo nieto, 
 * hijo de uno de los hijos del padre. De esta forma, podemos demostrar el recorrido del arbol
 * en preorden y la asignacion de distintas entidades a cada uno de los nodos.
 *
 */

var nuevoNodo = new Node();
var nuevoNodoHijo = new Node();
var nuevoNodoNieto = new Node();
var nuevoNodoHijo2 = new Node();

nuevoNodo.addChildren(nuevoNodoHijo);
nuevoNodo.addChildren(nuevoNodoHijo2);
nuevoNodoHijo.addChildren(nuevoNodoNieto);

/*
nuevoNodoHijo.setParent(nuevoNodo);
nuevoNodoHijo2.setParent(nuevoNodo);
nuevoNodoNieto.setParent(nuevoNodoHijo);
*/

var nuevaEntidadTransform = new Transform();
var nuevaEntidadTransform2 = new Transform();
var nuevaEntidadLuz = new Luz();
var nuevaEntidadCamara = new Camara();

nuevoNodo.setEntity(nuevaEntidadTransform);
nuevoNodoHijo.setEntity(nuevaEntidadTransform2);
nuevoNodoNieto.setEntity(nuevaEntidadLuz);
nuevoNodoHijo2.setEntity(nuevaEntidadCamara);

//Ahora realizamos las llamada al draw del nodo principal.
nuevoNodo.draw();

/*
Ahora realizamos las llamadas al draw de ambas entidades
*/
/*
alert(nuevaEntidadTransform.matriz);

var prueba = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];

nuevaEntidadTransform.cargar(prueba);
alert(nuevaEntidadTransform.matriz);
nuevaEntidadTransform.rotateX(0.5);
alert(nuevaEntidadTransform.matriz);
*/
/*
nuevoNodoHijo.draw();
nuevoNodoNieto.draw();

alert(nuevaEntidadTransform.matriz);*/
/*
nuevaEntidadLuz.setIntensidad(0.8);
nuevaEntidadLuz.setTipo("ambiental");
console.log(nuevaEntidadLuz.getIntensidad());
console.log(nuevaEntidadLuz.getTipo());

nuevaEntidadCamara.setEsPerspectiva(true);
console.log(nuevaEntidadCamara.getPerspectiva());
*/