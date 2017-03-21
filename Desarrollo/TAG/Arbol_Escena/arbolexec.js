/*
Ejecutable principal del entregable 4 de la asignatura TAG.

Creamos tres nodos del arbol de la escena, asignamos al nodo hijo una nueva entidad de tipo
Transform, por ejemplo, y al nodo nieto una entidad Luz. Creamos tambien otro hijo del primer nodo
para demostrar el recorrido del arbol en preorden.
*/

var nuevoNodo = new Node();
var nuevoNodoHijo = new Node();
var nuevoNodoNieto = new Node();
var nuevoNodoHijo2 = new Node();

nuevoNodoHijo.setParent(nuevoNodo);
nuevoNodoHijo2.setParent(nuevoNodo);
nuevoNodoNieto.setParent(nuevoNodoHijo);

var nuevaEntidadTransform = new Transform();
var nuevaEntidadLuz = new Luz();
var nuevaEntidadCamara = new Camara();

nuevoNodoHijo.setEntity(nuevaEntidadTransform);
nuevoNodoNieto.setEntity(nuevaEntidadLuz);
nuevoNodoHijo2.setEntity(nuevaEntidadCamara);

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

nuevaEntidadLuz.setIntensidad(0.8);
nuevaEntidadLuz.setTipo("ambiental");
console.log(nuevaEntidadLuz.getIntensidad());
console.log(nuevaEntidadLuz.getTipo());

nuevaEntidadCamara.setEsPerspectiva(true);
console.log(nuevaEntidadCamara.getPerspectiva());