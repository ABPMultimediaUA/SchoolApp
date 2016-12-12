
var main=function() {
  var CANVAS=document.getElementById("canvas");
  CANVAS.width=window.innerWidth;
  CANVAS.height=window.innerHeight;

  /*========================= GET WEBGL CONTEXT ========================= */
  var GL;
  try {
    //Activamos el antialasing para un dibujado más suave
    GL = CANVAS.getContext("experimental-webgl", {antialias: true});
  } catch (e) {
    alert("You are not webgl compatible :(") ;
    return false;
  }

  /*========================= SHADERS ========================= */
  /*El shader de ejecuta para cada vértice del cubo  */

  var shader_vertex_source="\n\
attribute vec3 posicion; //Posición del punto\n\
uniform mat4 Pmatrix; //variable uniforme, su valor es constante mientras se renderiza el objeto\n\
uniform mat4 Vmatrix;\n\
uniform mat4 Mmatrix;\n\
attribute vec3 color; //El color del punto\n\
varying vec3 vColor; //Da color al fragment shader\n\
void main(void) { //pre-built function\n\
gl_Position  = Pmatrix*Vmatrix*Mmatrix*vec4(posicion, 1.);\n\
vColor=color;\n\
}";

  var shader_fragment_source="\n\
precision mediump float;\n\
varying vec3 vColor;\n\
void main(void) {\n\
gl_FragColor = vec4(vColor, 1.); //Asignamos el color a vColor a valor 1, lo vuelve opaco\n\
}";

//Función para ejecutar el shader
  var get_shader=function(source, type, typeString) {
    var shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);
    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
      alert("ERROR EN "+typeString+ " SHADER : " + GL.getShaderInfoLog(shader));
      return false;
    }
    return shader;
  };

  var shader_vertex=get_shader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
  var shader_fragment=get_shader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");

  //Creación del programa del shader
  var SHADER_PROGRAM=GL.createProgram();
  GL.attachShader(SHADER_PROGRAM, shader_vertex);
  GL.attachShader(SHADER_PROGRAM, shader_fragment);
  //Link con el programa del shader
  GL.linkProgram(SHADER_PROGRAM);
  //Asignamos las variables GLSL a las variables js 
  var _Pmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Pmatrix");
  var _Vmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Vmatrix");
  var _Mmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Mmatrix");
  //Asignar la variable color GLSL a variable color js 
  var _color = GL.getAttribLocation(SHADER_PROGRAM, "color");
  var _posicion = GL.getAttribLocation(SHADER_PROGRAM, "posicion");
  //Activar atributos GLSL
  GL.enableVertexAttribArray(_color);
  GL.enableVertexAttribArray(_posicion);

  GL.useProgram(SHADER_PROGRAM);

  /*========================= THE CUBE ========================= */
  //PUNTOS :
  var cubo_vertices=[
  //Primera columna son los vértices del cubo en X, Y, Z y la segunda el color de cada vértice
    //Cara trasera en color amarillo
    -1,-1,-1,     1,1,0,
    1,-1,-1,      1,1,0,
    1, 1,-1,      1,1,0,
    -1, 1,-1,     1,1,0,
    //Cara delantera en azul 
    -1,-1, 1,     0,0,1,
    1,-1, 1,      0,0,1,
    1, 1, 1,      0,0,1,
    -1, 1, 1,     0,0,1,
    //Cara izquierda en cyan
    -1,-1,-1,     0,1,1,
    -1, 1,-1,     0,1,1,
    -1, 1, 1,     0,1,1,
    -1,-1, 1,     0,1,1,
    //Cara derecha en rojo
    1,-1,-1,      1,0,0,
    1, 1,-1,      1,0,0,
    1, 1, 1,      1,0,0,
    1,-1, 1,      1,0,0,
    //Cara de abajo en rosa
    -1,-1,-1,     1,0,1,
    -1,-1, 1,     1,0,1,
    1,-1, 1,      1,0,1,
    1,-1,-1,      1,0,1,
    //Cara de arriba en verde
    -1, 1,-1,     0,1,0,
    -1, 1, 1,     0,1,0,
    1, 1, 1,      0,1,0,
    1, 1,-1,      0,1,0

  ];

  //Vertex Buffer Object
  var CUBO_VERTICES= GL.createBuffer ();
  GL.bindBuffer(GL.ARRAY_BUFFER, CUBO_VERTICES);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(cubo_vertices), GL.STATIC_DRAW);

  //Caras del cubo :
  var cubo_caras = [
    //2 triángulos para hacer la cara posterior   
    0,1,2,
    0,2,3,
    //Cara frontal
    4,5,6,
    4,6,7,
    //Cara izquierda
    8,9,10,
    8,10,11,
    //Cara derecha 
    12,13,14,
    12,14,15,
    //Cara de arriba 
    16,17,18,
    16,18,19,
    //Cara de abajo
    20,21,22,
    20,22,23

  ];
  var CUBO_CARAS= GL.createBuffer ();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CUBO_CARAS);
  GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubo_caras), GL.STATIC_DRAW);

  /*========================= MATRIZ ========================= */
  //Variables de libs.js
  //Matriz de proyección
  var PROJMATRIX=LIBS.get_projection(40, CANVAS.width/CANVAS.height, 1, 100);
  //Matriz de movimiento
  var MOVEMATRIX=LIBS.get_I4();
  var VIEWMATRIX=LIBS.get_I4();



  LIBS.translateZ(VIEWMATRIX, -6);

  /*========================= DIBUJADO ========================= */
  //Activamos el Depth Buffer Test (Buffer que tiene el tamaño de la pantalla)
  GL.enable(GL.DEPTH_TEST);
  GL.depthFunc(GL.LEQUAL);
  GL.clearColor(0.0, 0.0, 0.0, 0.0);dibujar
  //Valor del Depth buffer a 1
  GL.clearDepth(1.0);

  var time_old=0;
  //Funcion que dibuja la escena
  var dibujar=function(time) {
    //Tiempo 
    var dt=time-time_old;
    //Rotación del cubo en todas direcciones y velocidad
    LIBS.rotateZ(MOVEMATRIX, dt*0.001);
    LIBS.rotateY(MOVEMATRIX, dt*0.002);
    LIBS.rotateX(MOVEMATRIX, dt*0.003);
    time_old=time;
    //Establecer la zona de dubujado en el canvas 
    GL.viewport(0.0, 0.0, CANVAS.width, CANVAS.height);
    //Limpiamos el depth buffer
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
    //Empieza el dibujado del cubo
    GL.uniformMatrix4fv(_Pmatrix, false, PROJMATRIX);
    GL.uniformMatrix4fv(_Vmatrix, false, VIEWMATRIX);
    GL.uniformMatrix4fv(_Mmatrix, false, MOVEMATRIX);
    GL.bindBuffer(GL.ARRAY_BUFFER, CUBO_VERTICES);

    GL.vertexAttribPointer(_posicion, 3, GL.FLOAT, false,4*(3+3),0);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false,4*(3+3),3*4);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CUBO_CARAS);
    //Dibujamos los 12 triángulos del cubo (6 caras * 2 triángulos por cara * 3 vértices cada triángulo)
    GL.drawElements(GL.TRIANGLES, 6*2*3, GL.UNSIGNED_SHORT, 0);
    //Aquí termina el dibujado 
    GL.flush();
    //Redibuja la escena 
    window.requestAnimationFrame(dibujar);
  };
  //Ejecuta el dibujado. Es 0 para evitar un error en time_old
  dibujar(0);
};