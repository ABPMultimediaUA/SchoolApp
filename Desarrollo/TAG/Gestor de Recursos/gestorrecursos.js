
  /*========================= GET WEBGL CONTEXT ========================= */
  
  var main = function() {

  var CANVAS=document.getElementById("your_canvas");
  var GL;
  try {
    GL = CANVAS.getContext("experimental-webgl", {antialias: true});
    var EXT = GL.getExtension("OES_element_index_uint") ||
      GL.getExtension("MOZ_OES_element_index_uint") ||
        GL.getExtension("WEBKIT_OES_element_index_uint");
        alert(GL);
  } catch (e) {
    alert("You are not webgl compatible :(") ;
    return false;
  }

}

function TGestorRecursos() {
    
    this.recursos = [];
}

TGestorRecursos.prototype.getRecurso = function(resourceToGet) {
    
    var control = false;
    var retorno = false;
    //OJO COMPROBAR EL CHECK DE NOMBRE AQUI
    for(var i=0; i<this.recursos.length; i++) {
        if(this.recursos[i].getNombre().localeCompare(resourceToGet.getNombre()) == 0) {
            control = true;
            //return this.recursos[i]; //Ojo con los return por enmedio
            retorno = this.recursos[i];
        }
    }
    if(control != true) {
      var rec = new TRecurso();
      rec.setNombre(resourceToGet.getNombre());
      this.recursos.push(rec);
      retorno = rec;
    }

    return retorno;
};




function TRecurso() {
	
    var nombre = "Nombre_Por_Defecto";
}

TRecurso.prototype.getNombre = function() {
    
    alert("El nombre de esta entidad es: " + this.nombre);
};

TRecurso.prototype.setNombre = function(nuevoNombre) {
    
    this.nombre = nuevoNombre;
};

function TRecursoMalla() {

    TRecurso.call(this);

    var CUBE_VERTEX = false, CUBE_FACES = false, CUBE_NPOINTS = 0;
}

TRecursoMalla.prototype.cargarFichero = function(ruta) {

    LIBS.get_json(ruta, function(malla) {
        //vertices
        CUBE_VERTEX= GL.createBuffer ();
        GL.bindBuffer(GL.ARRAY_BUFFER, CUBE_VERTEX);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(malla.vertices),
        GL.STATIC_DRAW);

        //faces
        CUBE_FACES=GL.createBuffer ();
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CUBE_FACES);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,
                      new Uint32Array(malla.indices),
          GL.STATIC_DRAW);

        CUBE_NPOINTS=malla.indices.length;

        animate(0);
    });
};

function TRecursoTextura() {

    TRecurso.call(this);

    var image = false;
}

TRecursoTextura.prototype.get_texture = function(imageURL) {

    this.image = new Image();

    image.src = imageURL;
    image.webglTexture = false;

    image.onload = function(e) {
      var texture=GL.createTexture();
      GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
      GL.bindTexture(GL.TEXTURE_2D, texture);
      GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);
      GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
      GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST_MIPMAP_LINEAR);
      GL.generateMipmap(GL.TEXTURE_2D);
      GL.bindTexture(GL.TEXTURE_2D, null);
      image.webglTexture=texture;
    };

    return image;
};

//En WebGL no hay material



//TESTING

var recursillo = new TRecurso(); //TRecurso seria virtual, por lo que esto no se deberia hacer, pero... this is JavaScript :_)
recursillo.getNombre();
recursillo.setNombre("Nuevo nombre");
recursillo.getNombre();

var gestor = new TGestorRecursos();

alert(gestor.recursos.length);


//gestor.createRecurso("resources/dragon.json", "malla", "pong");
//alert(gestor.getRecurso("pong"));

//var nuevaMalla = new TRecursoMalla();

//nuevaMalla.cargarFichero("resources/dragon.json");
//var nuevaTextura = new TRecursoTextura();
//nuevaTextura.get_texture("resources/dragon.png");
//END TESTING

