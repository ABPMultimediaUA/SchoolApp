/**
 * @arbolexec6.js
 * Fichero javascript que se encarga de demostrar el funcionamiento del arbol de la escena.
 *
 * Ejecutable principal del entregable 6 de la asignatura TAG.
 *
 * Creamos una entidad de tipo luz y procedemos a comprobar el setteo de los valores de intensidad
 * y los distintos tipos de luz (ambiental, difusa y especular)para comprobar la entidad Luz.
 *
 * Para el testeo de la entidad Camara, creamos una entidad de tipo camara y sobre ella realizamos
 * las dos operaciones (setEsPerspectiva y setEsParalela) y comprobamos la correcta asignacion
 * de valores.
 */



/*************** ENTREGABLE 6 ***************/

// Creamos una luz
var nuevaLuz = new Luz();
// Creamos un vector3
var testVector = vec3.create();
testVector[0] = 1; testVector[1] = 0.5; testVector[2] = 0.5;
//Comprobamos la asignacion de una intensidad a dicha luz.
nuevaLuz.setIntensidad(testVector);
nuevaLuz.getIntensidad();

//Ahora comprobamos la asignacion de tipos de luz
nuevaLuz.setValues(1, 2, 3);
console.log("Los valores ambiental, difuso y especular son: ")
console.log(nuevaLuz.ambient);
console.log(nuevaLuz.diffuse);
console.log(nuevaLuz.specular);


// Creamos una camara
var nuevaCamara = new Camara();
// Asignamos valores como paralela
nuevaCamara.setEsParalela(1,2,3,4,5,6);
console.log(nuevaCamara);
// Ahora asignamos valores como perspectiva
nuevaCamara.setEsPerspectiva(7,8,9,10);
console.log(nuevaCamara);

/*************** ENTREGABLE 6 END ***************/