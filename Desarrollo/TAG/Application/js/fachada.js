function ElementoRegistro(nodo){
    this.activa = false;
    this.matriz = mat4.create();
    this.nodo = nodo;
}

function ElementoRegistroVP(posicion, tamano){
    this.posicion = posicion;
    this.tamano = tamano;
    this.activa = false;
}

function TMotorTAG(){
    this.escena = new Node();
    this.gestorRecursos = new TGestorRecursos();
    //atributos de luces, camaras y viewport
    this.matAuxLuces = new Array();
    this.matAuxCamara = mat4.create();
    this.viewports = new Array();
    this.luces = new Array();
    this.camaras = new Array();
}

TMotorTAG.prototype.crearNodo = function(padre,entidad){
    var nodo = new Node();
    padre.addChildren(nodo);
    nodo.setEntity(entidad);
    return nodo;
}

TMotorTAG.prototype.crearTransform = function(){
    var transform = new Transform();
    return transform;
}

TMotorTAG.prototype.crearCamara = function(){
    var cam = new Camara();
    return cam;
}

TMotorTAG.prototype.crearNodoCamara = function(padre, camara){
    var cam = new Node();
    cam.setEntity(camara);
    padre.addChildren(cam);
    return cam;
}

TMotorTAG.prototype.crearLuz = function(){
    var luz = new Luz();
    return luz;
}

TMotorTAG.prototype.crearNodoLuz = function(padre, luz){
    var lu = new Node();
    lu.setEntity(luz);
    padre.addChildren(lu);
    return lu;
}

TMotorTAG.prototype.crearMalla = function(fichero){
    var malla = new Malla();

    malla.cargarMalla(fichero);

    return malla;
}


TMotorTAG.prototype.crearMallaConText = function(fichero,textura){
    var malla = new TMalla();
    malla.cargarMalla(fichero);
    malla.cargarTextura(textura);
    return malla;
}

TMotorTAG.prototype.crearMallaConMat = function(fichero,material){
    var malla = new TMalla();
    malla.cargarMalla(fichero);
    malla.cargarMaterial(material);
    return malla;
}

TMotorTAG.prototype.registrarLuz = function(nodoLuz){
    this.luces.push(new ElementoRegistro(nodoLuz));
    return this.luces.length-1;
}

TMotorTAG.prototype.setLuzActiva = function(nLuz){
    
    if(this.luces[nLuz].activa) this.luces[nLuz].activa = false;
    else this.luces[nLuz].activa = true;
}

TMotorTAG.prototype.registrarCamara = function(nodoCam){
    this.camaras.push(new ElementoRegistro(nodoCam));
    return this.camaras.length-1;
}

TMotorTAG.prototype.setCamaraActiva = function(nCamara){
    for(var i in this.camaras){
        if(this.camaras[i].activa) this.camaras[i].activa = false;
    }
    this.camaras[nCamara].activa = true;
}

TMotorTAG.prototype.getCamaraActiva = function(){
    var cam = null;
    for(var i in this.camaras){
        if(this.camaras[i].activa) cam = this.camaras[i];
    }
    return cam;
}


TMotorTAG.prototype.getLuzActiva = function(){
    var luz = null;
    for(var i in this.luces){
      if(this.luces[i].activa) luz = this.luces[i];
    }
  return luz;
}

TMotorTAG.prototype.getValoresLuz = function(luz){
    var ent = luz.nodo.getEntity();
    var arrays = new Array();
    arrays.push(ent.ambient);
    arrays.push(ent.diffuse);
    arrays.push(ent.specular);
    
    return arrays;
}

TMotorTAG.prototype.moverLuzActiva = function(x,y,z){
  var luz = this.getLuzActiva().nodo;
  var transform = luz.getParent().getEntity();
  transform.translate(x,y,z);
}

TMotorTAG.prototype.moverCamaraActiva = function(x,y,z){
    var cam = this.getCamaraActiva().nodo;
    var transform = cam.getParent().getEntity();
    transform.translate(x,y,z);
}

TMotorTAG.prototype.registrarViewport = function(posicion, tamano){
    this.viewports.push(new ElementoRegistroVP(posicion, tamano));
    return this.viewports.length-1;
}

TMotorTAG.prototype.setViewportActivo = function(nViewport){
    for(var i in this.viewports){
        if(this.viewports[i].activa) this.viewports[i].activa = false;
    }
    this.viewports[nViewport].activa = true;
}

TMotorTAG.prototype.getViewportActivo = function(){
    var vp = null;
    for(var i in this.viewports){
        if(this.viewports[i].activa) vp = this.viewports[i];
    }
    return vp;
}


var gradToRad = function(grados){
  return (grados * Math.PI / 180);
}

TMotorTAG.prototype.draw = function(){
    //Limpiamos gl

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Para cada nodoLuz activo del registro de luces
    this.matAuxLuces = new Array();
    var useLights = false;
    gl.uniform1i(shaderProgram.uUseLights, false);
    for(var i in this.luces){
        
        this.matAuxLuces.push(mat4.create());
        if(this.luces[i].activa){
            useLights = true;
            gl.uniform1i(shaderProgram.uUseLights, true);
            //Recorremos el arbol a la inversa desde nodoLuz hasta la raiz
            var nodoActual = this.luces[i].nodo;
            var listaAux = new Array();
            while(nodoActual.parent!=null){
                nodoActual = nodoActual.getParent();
                //Guardar el recorrido en una lista auxiliar de nodos de transformacion
                if(nodoActual.getEntity()) //si no es el nodo escena
                  listaAux.push(nodoActual.getEntity().matriz);
            }
            //Invertir la lista auxiliar
            listaAux.reverse();
            //Recorrer la lista auxiliar multiplicando las matrices en una matriz auxiliar
            
            mat4.identity(this.matAuxLuces[i]);
            for(var j in listaAux){
                mat4.multiply(this.matAuxLuces[i],this.matAuxLuces[i],listaAux[j]);
            }
            //Posicionar y activar la luz en la libreria grafica
            var v = vec4.create();
            vec4.set(v, this.matAuxLuces[0][12],this.matAuxLuces[0][13],this.matAuxLuces[0][14],1.0)
     
            gl.uniform4fv(shaderProgram.uLightPosition, v);
            var values = this.getValoresLuz(this.luces[i]);
            
            gl.uniform4fv(shaderProgram.uLightAmbient, values[0] );
            gl.uniform4fv(shaderProgram.uLightDiffuse, values[1] );
            gl.uniform4fv(shaderProgram.uLightSpecular, values[2] );
            //
        }//fin del if
    }
    

    //Registro de camaras
    mat4.identity(this.matAuxCamara);
    var nodoCamara = this.getCamaraActiva().nodo;
    var nodoActual = nodoCamara;
    var listaAux = new Array();

    while(nodoActual.parent!=null){
        nodoActual = nodoActual.getParent();
        //Guardar el recorrido en una lista auxiliar de nodos de transformación
        if(nodoActual.getEntity())
          listaAux.push(nodoActual.getEntity().matriz);
    }

    // Invertir la lista auxiliar
    listaAux.reverse();

    // Recorrer la lista auxiliar multiplicando las matrices en una matriz auxiliar
    for(var j in listaAux){
        mat4.multiply(this.matAuxCamara,this.matAuxCamara,listaAux[j]);
    }

    // Invertir la matriz auxiliar
    mat4.invert(this.matAuxCamara,this.matAuxCamara);

    mat4.copy(this.getCamaraActiva().matriz,this.matAuxCamara);
    
    var tcam = nodoCamara.getEntity();
    if(tcam.esPerspectiva){
        mat4.perspective(pMatrix, gradToRad(tcam.fovy), tcam.aspect, tcam.near, tcam.far);
        document.getElementById("fovy").disabled = false;
    }else{
         mat4.ortho(pMatrix,tcam.left,tcam.right,tcam.bottom,tcam.top,tcam.near,tcam.far);
         document.getElementById("fovy").disabled = true;
    }

    setMatrixUniforms();
    
    // Registro de viewports
    var viewport = this.getViewportActivo();
    // Inicializar el viewport activo con la libreria grafica
    if(viewport){
      //gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
      gl.viewport(viewport.posicion[0], viewport.posicion[1], viewport.tamano[0], viewport.tamano[1]);
    }else{
      console.log("No hay viewport activo.");
    }


    this.escena.draw();

}
