/**
 * @arbolexec5.js
 * Fichero javascript que se encarga de demostrar el funcionamiento del arbol de la escena.
 *
 * Ejecutable principal del entregable 5 de la asignatura TAG.
 *
 * En este entregable demostramos la aplicacion de funciones de transformacion de matrices
 * empleadas en la entidad Transform. Para ello, creamos una serie de nodos y les asignamos
 * como entidades diversas transformaciones. De esta forma demostramos el funcionamiento
 * aislado de varias funciones y el de la pila de matrices de transformacion.
 */



/*************** ENTREGABLE 5 ***************/

var nuevoNodo = new Node();
var nuevoNodo2 = new Node();
var nuevoNodo3 = new Node();

nuevoNodo.addChildren(nuevoNodo2);
nuevoNodo2.addChildren(nuevoNodo3);

var transformacion = new Transform();
var transformacion2 = new Transform();
var transformacion3 = new Transform();

nuevoNodo.setEntity(transformacion);
nuevoNodo2.setEntity(transformacion2);
nuevoNodo3.setEntity(transformacion3);

//Asignamos la matriz identidad a la transformacion actual.
nuevoNodo.entity.identity();
console.log("La matriz de transformacion deberia ser la identidad (I)");
console.log(nuevoNodo.entity.matriz);

//Cargamos una matriz arbitraria para probar la carga de matrices.
var nuevaMatriz = mat4.create();
nuevaMatriz[0] = 3; nuevaMatriz[1] = 2; nuevaMatriz[2] = 5;
nuevoNodo.entity.cargar(nuevaMatriz);
console.log("Los 3 primeros elementos de la matriz deberian ser (3,2,5)");
console.log(nuevoNodo.entity.matriz);

//Trasponemos la matriz que teniamos hasta ahora.
nuevoNodo.entity.trasponer();
console.log("Ahora los primeros elementos deberian ser (3,0,0,0,2,...)");
console.log(nuevoNodo.entity.matriz);

//Realizamos ahora la prueba de traslacion. Reiniciamos antes la matriz actual a la
//identidad para facilitar la comprobacion de la operacion.
nuevoNodo.entity.identity();
nuevoNodo.entity.translate(3, 3, 3);
console.log("Comprobamos la traslacion de la matriz identidad");
console.log(nuevoNodo.entity.matriz);

//Prueba de rotacion. Tambien sobre la matriz identidad.
nuevoNodo.entity.identity();
nuevoNodo.entity.rotate(60, 1, 0, 0);
console.log("Comprobamos la rotacion de la matriz identidad");
console.log(nuevoNodo.entity.matriz);

//Procedemos a comprobar el escalado. Lo haremos sobre la matriz identidad de nuevo.
nuevoNodo.entity.identity();
nuevoNodo.entity.scale(5, 5, 5);
console.log("Comprobamos el escalado de la matriz identidad");
console.log(nuevoNodo.entity.matriz);

//Por ultimo, comprobamos el apilado de distintas matrices.
nuevoNodo2.entity.scale(2, 2, 2);
nuevoNodo3.entity.scale(3, 3, 3);
nuevoNodo.draw();

/*************** ENTREGABLE 5 END ***************/