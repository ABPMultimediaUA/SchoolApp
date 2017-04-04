/**
 * @gestorrecursos
 * Fichero javascript que maneja la carga y el dibujado de recursos.
 *
 */

function TGestorRecursos() {

    this.recursos = [];

    /**
     * Maneja los recursos almacenados en el gestor. En el caso de que se pida un recurso
     * ya almacenado, lo devuelve. Si es un nuevo recurso, crea las estructuras de datos
     * necesarias para proceder a su almacenamiento.
     *
     * @custom
     * @param{string} Ruta del fichero a anyadir.
     * @param{string} Define si el recurso es una malla, una textura o un material.
     */

    this.getRecurso = function (nombre, tipo) {

        var recurso;
        //Busqueda del recurso en el array de recursos
        var control = false;
        var posicion = -1;
        console.log("Recorriendo el array de recursos...");

        for (var i in this.recursos) {

            console.log(this.recursos[i].nombre);

            if (this.recursos[i].getNombre() == nombre) {
                control = true;
                posicion = i;
            }
        }

        if (control == false) {
            if (tipo == "malla") {
                recurso = new TRecursoMalla(nombre);
            } else if (tipo == "textura") {
                recurso = new TRecursoTextura(nombre);
            } else if (tipo == "material") {
                recurso = new TRecursoMaterial(nombre);
            }

            /*
             * Carga de fichero. No se si para el entregable 8 habria que hacer aqui un dummy
             * para testear solo lo sencillo. (Jueves 31 Marzo)
             */

            recurso.cargarFichero(nombre, this.pushToMatrix);

        } else {
            recurso = this.recursos[posicion];
        }

        return recurso;
    };
}

TGestorRecursos.prototype.pushToMatrix = function (recurso) {
    /*
     * Carga de fichero. No se si para el entregable 8 habria que hacer aqui un dummy
     * para testear solo lo sencillo. (Jueves 31 Marzo)
     */

    //this.gestor.recursos.push(recurso);

    //ESTE DE ABAJO ES EL QUE NO ESTARIA COMENTADO
    //motor.gestorRecursos.recursos.push(recurso);
}

/**
 * TRecurso, como Entity en el arbol de la escena, es una "clase" de la que heredaran
 * TRecursoMalla, TRecursoTextura y TRecursoMaterial. Tendra como atributo para sus hijos
 * un nombre.
 *
 * @super
 * @param{string} Nombre. String que define el nombre del recurso.
 */

function TRecurso() {
    
    this.nombre = null;
}

TRecurso.prototype.getNombre = function() { 
    return this.nombre; 
}

TRecurso.prototype.setNombre = function(nombre) {
    this.nombre = nombre;
}

/**
 * TRecursoMalla hereda de TRecurso, e incluye las funciones necesarias para la carga de ficheros
 * de este tipo, y las variables necesarias para soportarlas.
 *
 * @super
 * @param{string} Nombre. String que define el nombre del recurso.
 */

function TRecursoMalla(nombre){
  //Atributo del padre TRecurso
  this.setNombre(nombre);

  //Mallas de las que esta compuesto
  this.mallas = new Array();

  //Textura y material
  this.textura = null; //TRecursoTextura
  this.material = null; //TRecursoMaterial
}

TRecursoMalla.prototype = new TRecurso();

TRecursoMalla.prototype.cargarFichero = function(nombre,termina){
  //Funcion para obtener el fichero
  var recurso = this;

  var objLoader = new THREE.OBJLoader();
  objLoader.setPath( 'resources/' );
  objLoader.load(nombre, function ( geometries ) {
    for (var i = 0; i < geometries.children.length; i++) {
      var geometry = new THREE.Geometry().fromBufferGeometry(geometries.children[i].geometry);

      console.log(geometry);

      var normals = new Array();
      var vertices = new Array();
      var indices = new Array();
      var textures = new Array();

      for(var j=0; j< geometry.faces.length; j++){
        indices.push(geometry.faces[j].a);
        indices.push(geometry.faces[j].b);
        indices.push(geometry.faces[j].c);

        for(var k in geometry.faces[j].vertexNormals){
          normals.push(geometry.faces[j].vertexNormals[k].getComponent(0));
          normals.push(geometry.faces[j].vertexNormals[k].getComponent(1));
          normals.push(geometry.faces[j].vertexNormals[k].getComponent(2));
        }
      }

      for(var x in geometry.vertices){
        vertices.push(geometry.vertices[x].getComponent(0));
        vertices.push(geometry.vertices[x].getComponent(1));
        vertices.push(geometry.vertices[x].getComponent(2));
      }
        
      for(var z in geometry.faceVertexUvs){
          for(var a in geometry.faceVertexUvs[z]){
              for(var b in geometry.faceVertexUvs[z][a]){
                    textures.push(geometry.faceVertexUvs[z][a][b].x);
                    textures.push(geometry.faceVertexUvs[z][a][b].y);
                    //console.log(geometry.faceVertexUvs[z][a][b]);     
              }
          }  
      }

      //Crear buffers
      var vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      vertexBuffer.itemSize = 3; //Coordenadas de los vertices de 3 en 3
      vertexBuffer.numItems = vertices.length;
      gl.bindBuffer(gl.ARRAY_BUFFER,null);

      //Rellena el buffer de normales
      var normBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
      normBuffer.itemSize = 3;
      normBuffer.numItems = normals.length;
      gl.bindBuffer(gl.ARRAY_BUFFER,null);

      //Rellena el buffer de índices
      var indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
      indexBuffer.itemSize = 1;
      indexBuffer.numItems = indices.length;
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);

      var textureBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textures), gl.STATIC_DRAW);
      textureBuffer.itemSize = 2;
      textureBuffer.numItems = textures.length;
      gl.bindBuffer(gl.ARRAY_BUFFER,null);

      var child = {
        vertices: vertices,
        indices: indices,
        textures: textures,
        normals: normals,
        vertexBuffer: vertexBuffer,
        normBuffer: normBuffer,
        indexBuffer: indexBuffer,
        textureBuffer: textureBuffer
        //falta el indice del material
      };

      recurso.mallas.push(child);
    }
    console.log(geometries);

    termina(recurso);

  }, onProgress, onError );
  var onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };
  var onError = function ( xhr ) {
    console.log("Error cargando objeto");
    console.log(xhr);
  };

}

/*** RECURSO TEXTURA ***/
function TRecursoTextura(nombre){
  this.setNombre(nombre);
	this.textura = 0;
}

TRecursoTextura.prototype = new TRecurso;

TRecursoTextura.prototype.cargarFichero = function(nombre,termina){
  var recurso = this;
	recurso.textura = gl.createTexture();


	recurso.textura.imagen = new Image();
	recurso.textura.imagen.onload = function(){
		//se llama cuando la imagen se carga del todo
    console.log("Se ha terminado de cargar la imagen");

    gl.bindTexture(gl.TEXTURE_2D, recurso.textura);

    /** Voltea la imagen de la textura en la Y porque las coordenadas de textura
        no funcionan igual que las de malla, la Y aumenta al ir hacia abajo **/
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    /** Sube la imagen cargada al trozo de memoria de texturas de la tarjeta gráfica **/
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, recurso.textura.imagen);

    /** Escalado especial de la textura: MAG_FILTER es para cuando ampliamos el objeto
        qué hacer con la textura. El otro es para lo contrario **/
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, null);

    termina(recurso); //manda la textura al array del gestor de recursos

	}

  recurso.textura.imagen.src = nombre; //tendria que pasarle la ruta

}

/*** RECURSO MATERIAL ***/
function TRecursoMaterial(nombre){
	this.setNombre(nombre);
  this.materiales = new Array();
}

TRecursoMaterial.prototype = new TRecurso;

TRecursoMaterial.prototype.cargarFichero = function(nombre,termina){
  var recurso = this;
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setBaseUrl( 'resources/' );
  mtlLoader.setPath( 'resources/' );
  mtlLoader.load( nombre, function( materials ) {
    materials.preload();
    console.log("Materiales cargado");


    for(var x in Object(materials.materialsInfo)){

      var ka = Object(materials.materialsInfo[x].ka);
      var kd = Object(materials.materialsInfo[x].kd);
      var ks = Object(materials.materialsInfo[x].ks);

      var mat = {
        ka: ka,
        kd: kd,
        ks: ks
      };

      recurso.materiales.push(mat);
    }
    console.log(recurso);
    termina(recurso);

  });
  var onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };
  var onError = function ( xhr ) {
    console.log("Error cargando objeto");
    console.log(xhr);
  };

}


/* OLD GESTOR DE RECURSOS */
//
//  /*========================= GET WEBGL CONTEXT ========================= */
//  
//  var main = function() {
//
//  var CANVAS=document.getElementById("your_canvas");
//  var GL;
//  try {
//    GL = CANVAS.getContext("experimental-webgl", {antialias: true});
//    var EXT = GL.getExtension("OES_element_index_uint") ||
//      GL.getExtension("MOZ_OES_element_index_uint") ||
//        GL.getExtension("WEBKIT_OES_element_index_uint");
//        alert(GL);
//  } catch (e) {
//    alert("You are not webgl compatible :(") ;
//    return false;
//  }
//
//}
//
//function TGestorRecursos() {
//    
//    this.recursos = [];
//}
//
//TGestorRecursos.prototype.getRecurso = function(resourceToGet) {
//    
//    var control = false;
//    var retorno = false;
//    //OJO COMPROBAR EL CHECK DE NOMBRE AQUI
//    for(var i=0; i<this.recursos.length; i++) {
//        if(this.recursos[i].getNombre().localeCompare(resourceToGet.getNombre()) == 0) {
//            control = true;
//            //return this.recursos[i]; //Ojo con los return por enmedio
//            retorno = this.recursos[i];
//        }
//    }
//    if(control != true) {
//      var rec = new TRecurso();
//      rec.setNombre(resourceToGet.getNombre());
//      this.recursos.push(rec);
//      retorno = rec;
//    }
//
//    return retorno;
//};
//
//
//
//
//function TRecurso() {
//	
//    var nombre = "Nombre_Por_Defecto";
//}
//
//TRecurso.prototype.getNombre = function() {
//    
//    alert("El nombre de esta entidad es: " + this.nombre);
//};
//
//TRecurso.prototype.setNombre = function(nuevoNombre) {
//    
//    this.nombre = nuevoNombre;
//};
//
//function TRecursoMalla() {
//
//    TRecurso.call(this);
//
//    var CUBE_VERTEX = false, CUBE_FACES = false, CUBE_NPOINTS = 0;
//}
//
//TRecursoMalla.prototype.cargarFichero = function(ruta) {
//
//    LIBS.get_json(ruta, function(malla) {
//        //vertices
//        CUBE_VERTEX= GL.createBuffer ();
//        GL.bindBuffer(GL.ARRAY_BUFFER, CUBE_VERTEX);
//        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(malla.vertices),
//        GL.STATIC_DRAW);
//
//        //faces
//        CUBE_FACES=GL.createBuffer ();
//        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CUBE_FACES);
//        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,
//                      new Uint32Array(malla.indices),
//          GL.STATIC_DRAW);
//
//        CUBE_NPOINTS=malla.indices.length;
//
//        animate(0);
//    });
//};
//
//function TRecursoTextura() {
//
//    TRecurso.call(this);
//
//    var image = false;
//}
//
//TRecursoTextura.prototype.get_texture = function(imageURL) {
//
//    this.image = new Image();
//
//    image.src = imageURL;
//    image.webglTexture = false;
//
//    image.onload = function(e) {
//      var texture=GL.createTexture();
//      GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
//      GL.bindTexture(GL.TEXTURE_2D, texture);
//      GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);
//      GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
//      GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST_MIPMAP_LINEAR);
//      GL.generateMipmap(GL.TEXTURE_2D);
//      GL.bindTexture(GL.TEXTURE_2D, null);
//      image.webglTexture=texture;
//    };
//
//    return image;
//};
//
////En WebGL no hay material
//
//
//
////TESTING
//
//var recursillo = new TRecurso(); //TRecurso seria virtual, por lo que esto no se deberia hacer, pero... this is JavaScript :_)
//recursillo.getNombre();
//recursillo.setNombre("Nuevo nombre");
//recursillo.getNombre();
//
//var gestor = new TGestorRecursos();
//
//alert(gestor.recursos.length);
//
//
////gestor.createRecurso("resources/dragon.json", "malla", "pong");
////alert(gestor.getRecurso("pong"));
//
////var nuevaMalla = new TRecursoMalla();
//
////nuevaMalla.cargarFichero("resources/dragon.json");
////var nuevaTextura = new TRecursoTextura();
////nuevaTextura.get_texture("resources/dragon.png");
////END TESTING
//
