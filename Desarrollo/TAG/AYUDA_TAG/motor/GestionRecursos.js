/*** GESTOR DE RECURSOS ***/
function TGestorRecursos(){
    this.recursos = [];

    this.getRecurso = function(nombre,tipo){
        var recurso;
        //buscar recurso en el vector
        var n = -1;
    for(var i in this.recursos){
      console.log(this.recursos[i].nombre);
      if(this.recursos[i].getNombre() == nombre)
        n = i;
    }

        if(n==-1){
            if(tipo=="malla")
                recurso = new TRecursoMalla(nombre);
            else if(tipo=="textura")
                recurso = new TRecursoTextura(nombre);
            else
                recurso = new TRecursoMaterial(nombre);

      //cargar fichero
            recurso.cargarFichero(nombre,this.termina);

        }else recurso = this.recursos[n];

   
        return recurso;
    };

}

TGestorRecursos.prototype.termina = function(rec){
  //this.gestor.recursos.push(rec);
  motor.gestorRecursos.recursos.push(rec);
}

/*** RECURSO ***/
function TRecurso(){
	this.nombre = null;
}

TRecurso.prototype.getNombre = function(){ return this.nombre; }

TRecurso.prototype.setNombre = function(nombre){ this.nombre = nombre; }

/*** RECURSO MALLA ***/
function TRecursoMalla(nombre){
  //Atributo del padre TRecurso
  this.setNombre(nombre);

  //mallas de las que está compuesto
  this.mallas = new Array();

  //texturas y materiales
  this.textura = null; //es TRecursoTextura, la textura webgl está en this.textura.textura
  this.material = null; //TRecursoMaterial
}

TRecursoMalla.prototype = new TRecurso();


TRecursoMalla.prototype.cargarFichero = function(nombre,termina){
  //metodo para obtener el fichero
  var recurso = this;

  var objLoader = new THREE.OBJLoader();
  objLoader.setPath( 'app/graphics_engine/Modelos/' );
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

      //crear buffers
      var vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      vertexBuffer.itemSize = 3; //coordenadas de los vertices de 3 en 3
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

/** Es la última función que se ejecuta en el dibujado de la escena **/
TRecursoMalla.prototype.draw = function(){
    
    mat4.identity(mvMatrix);
    mat4.multiply(mvMatrix, mvMatrix, matrizActual); //multiplicar por las transformaciones
    mat4.multiply(mvMatrix, mvMatrix, motor.getCamaraActiva().matriz);


    //Rotación de los objetos, no de la cámara
    var radY = yRot * Math.PI / 180;
    var radX = xRot * Math.PI / 180;
    mat4.rotate(mvMatrix, mvMatrix, radX, [1, 0, 0]);
    mat4.rotate(mvMatrix, mvMatrix, radY, [0, 1, 0]);

    var dibujado = false;
    
    if(document.getElementById("tierraCheck").checked && this.nombre=="mundo_divided.obj")
        dibujado = true;
    else if(document.getElementById("espanyaCheck").checked && this.nombre=="comunidades.obj")
        dibujado = true;
    else if(document.getElementById("capsuleCheck").checked && this.nombre=="capsule.obj")
        dibujado = true;
    
    if(dibujado){
        
        for(var i in this.mallas){

        gl.bindBuffer(gl.ARRAY_BUFFER, this.mallas[i].vertexBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.mallas[i].vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

        // si tiene texturas
        if(this.textura && document.getElementById("useTexture").checked){
            // uniform booleano que permite saber en el fragment cómo calcular el gl_FragColor
            gl.uniform1i(shaderProgram.uUseTextures, true);

            gl.enableVertexAttribArray(shaderProgram.vertexTextureCoords);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.mallas[i].textureBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexTextureCoords, 2, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.textura.textura);
            gl.uniform1i(shaderProgram.uSampler, 0);
        }else{ //si no tiene texturas
            gl.uniform1i(shaderProgram.uUseTextures, false);
        }


        if(this.material){
        //Ambient uniform
			//gl.uniform3fv(shaderProgram.uKa, [0.06,0.06,0.06]);
            gl.uniform3fv(shaderProgram.uKa, [ukambient,ukambient,ukambient]);

			//Mapa de calor
			if(document.getElementById("mapCalor").checked){
				if(i>26 && i<33){ //Europa
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalor[0]>=0 && motor.datosMapaCalor[0]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalor[0]; c++){
							a = a-0.2;
						}
							
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]);  
					}
					if(motor.datosMapaCalor[0]>=5 && motor.datosMapaCalor[0]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalor[0]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]);  
					}
					if(motor.datosMapaCalor[0]>=10 && motor.datosMapaCalor[0]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalor[0]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]);
					}
					if(motor.datosMapaCalor[0]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo   
					}      
				}else if(i>1 && i<15){ //America del norte
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalor[1]>=0 && motor.datosMapaCalor[1]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalor[1]; c++){
							a = a-0.2;
						}
							
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalor[1]>=5 && motor.datosMapaCalor[1]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalor[1]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalor[1]>=10 && motor.datosMapaCalor[1]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalor[1]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]);
					}
					if(motor.datosMapaCalor[1]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}     
				}else if(i==15){ //America del sur
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalor[2]>=0 && motor.datosMapaCalor[2]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalor[2]; c++){
							a = a-0.2;
						}
							
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]);  
					}
					if(motor.datosMapaCalor[2]>=5 && motor.datosMapaCalor[2]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalor[2]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]);  
					}
					if(motor.datosMapaCalor[2]>=10 && motor.datosMapaCalor[2]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalor[2]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]);
					}
					if(motor.datosMapaCalor[2]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i>15 && i<25){ //Oceanía
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalor[3]>=0 && motor.datosMapaCalor[3]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalor[3]; c++){
							a = a-0.2;
						}
							
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalor[3]>=5 && motor.datosMapaCalor[3]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalor[3]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]);  
					}
					if(motor.datosMapaCalor[3]>=10 && motor.datosMapaCalor[3]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalor[3]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]);
					}
					if(motor.datosMapaCalor[3]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i==25 || i==26){ //Africa
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalor[4]>=0 && motor.datosMapaCalor[4]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalor[4]; c++){
							a = a-0.2;
						}
							
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalor[4]>=5 && motor.datosMapaCalor[4]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalor[4]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]);
					}
					if(motor.datosMapaCalor[4]>=10 && motor.datosMapaCalor[4]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalor[4]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]);
					}
					if(motor.datosMapaCalor[4]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i>32 && i<51){ //Asia
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalor[5]>=0 && motor.datosMapaCalor[5]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalor[5]; c++){
							a = a-0.2;
						}
							
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]);  
					}
					if(motor.datosMapaCalor[5]>=5 && motor.datosMapaCalor[5]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalor[5]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]);
					}
					if(motor.datosMapaCalor[5]>=10 && motor.datosMapaCalor[5]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalor[5]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]);
					}
					if(motor.datosMapaCalor[5]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i==1){
					gl.uniform3fv(shaderProgram.uKd, this.material.materiales[0].kd); //azul
					gl.uniform3fv(shaderProgram.uKs, this.material.materiales[0].ks);    
				}
			}else{
				if(i>1){ //Hay solo dos materiales
					gl.uniform3fv(shaderProgram.uKd, this.material.materiales[1].kd); //verde
					gl.uniform3fv(shaderProgram.uKs, this.material.materiales[1].ks);     
				}else{
					gl.uniform3fv(shaderProgram.uKd, this.material.materiales[0].kd); //azul
					gl.uniform3fv(shaderProgram.uKs, this.material.materiales[0].ks);  
				}
			}
        
        //malla[0] --> La Antártida
        //malla[1] --> Mar
        //malla[2-10] --> America del norte
        //malla[11-14] --> America central
        //malla[15]--> America del sur (solo esa malla)
        //malla[16-24] --> Oceanía
        //malla[25-26] --> África
        //malla[27-32] --> Europa
        //malla[33-50] --> Asia
            

        }else{

            gl.uniform3fv(shaderProgram.uKd, [1.0,0.5,0.8]); //rosa
            gl.uniform3fv(shaderProgram.uKa, [ukambient,ukambient,ukambient]);
            gl.uniform3fv(shaderProgram.uKs, [ukspecular,ukspecular,ukspecular]);
			
			//malla[0] --> Navarra
			//malla[1] --> Asturias
			//malla[2] --> C. Mancha
			//malla[3] --> Aragón
			//malla[4] --> Andalucia
			//malla[5] --> Extremadura
			//malla[6] --> Melilla
			//malla[7] --> Cantabria
			//malla[8] --> P. Vasco
			//malla[9] --> La Rioja
			//malla[10] --> C. León
			//malla[13] --> La Rioja
			//malla[14] --> Madrid
			//malla[16] --> Murcia
			//malla[20] --> C. Valenciana
			//malla[21] --> C. Valenciana
			//malla[22] --> Cataluña
			//malla[24] --> Ceuta
			//malla[25] --> Ceuta
			//malla[26 - 34] --> Canarias
			//malla[35 - 44] --> I. Baleares
			//malla[45] --> Galicia
			
			//Mapa de calor
			if(document.getElementById("mapCalor").checked){
				if(i==0){ //Navarra
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[6]>=0 && motor.datosMapaCalorCom[6]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[6]; c++){
							a = a-0.2;
						}
							
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[6]>=5 && motor.datosMapaCalorCom[6]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[6]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[6]>=10 && motor.datosMapaCalorCom[6]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[6]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[6]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo   
					}   
				}else if(i==1){ //Asturias
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[9]>=0 && motor.datosMapaCalorCom[9]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[9]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[9]>=5 && motor.datosMapaCalorCom[9]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[9]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[9]>=10 && motor.datosMapaCalorCom[9]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[9]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[9]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}     
				}else if(i==2){ //C. Mancha
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[13]>=0 && motor.datosMapaCalorCom[13]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[13]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[13]>=5 && motor.datosMapaCalorCom[13]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[13]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[13]>=10 && motor.datosMapaCalorCom[13]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[13]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[13]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i==3){ //Aragón
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[4]>=0 && motor.datosMapaCalorCom[4]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[4]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[4]>=5 && motor.datosMapaCalorCom[4]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[4]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[4]>=10 && motor.datosMapaCalorCom[4]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[4]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[4]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i==4){ //Andalucía
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[0]>=0 && motor.datosMapaCalorCom[0]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[0]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[0]>=5 && motor.datosMapaCalorCom[0]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[0]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[0]>=10 && motor.datosMapaCalorCom[0]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[0]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[0]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i==5){ //Extremadura
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[12]>=0 && motor.datosMapaCalorCom[12]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[12]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[12]>=5 && motor.datosMapaCalorCom[12]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[12]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[12]>=10 && motor.datosMapaCalorCom[12]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[12]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[12]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i==6){ //Melilla
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[17]>=0 && motor.datosMapaCalorCom[17]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[17]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[17]>=5 && motor.datosMapaCalorCom[17]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[17]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[17]>=10 && motor.datosMapaCalorCom[17]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[17]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[17]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i==7){ //Cantabria
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[8]>=0 && motor.datosMapaCalorCom[8]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[8]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[8]>=5 && motor.datosMapaCalorCom[8]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[8]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[8]>=10 && motor.datosMapaCalorCom[8]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[8]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[8]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i==8){ //P. Vasco
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[7]>=0 && motor.datosMapaCalorCom[7]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[7]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[7]>=5 && motor.datosMapaCalorCom[7]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[7]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[7]>=10 && motor.datosMapaCalorCom[7]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[7]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[7]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i==9 || i==13){ //La Rioja
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[5]>=0 && motor.datosMapaCalorCom[5]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[5]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[5]>=5 && motor.datosMapaCalorCom[5]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[5]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[5]>=10 && motor.datosMapaCalorCom[5]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[5]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[5]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i==10){ //C. León
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[11]>=0 && motor.datosMapaCalorCom[11]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[11]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[11]>=5 && motor.datosMapaCalorCom[11]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[11]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[11]>=10 && motor.datosMapaCalorCom[11]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[11]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[11]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i==14){ //Madrid
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[14]>=0 && motor.datosMapaCalorCom[14]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[14]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[14]>=5 && motor.datosMapaCalorCom[14]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[14]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[14]>=10 && motor.datosMapaCalorCom[14]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[14]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[14]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i==16){ //Murcia
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[1]>=0 && motor.datosMapaCalorCom[1]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[1]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[1]>=5 && motor.datosMapaCalorCom[1]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[1]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[1]>=10 && motor.datosMapaCalorCom[1]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[1]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[1]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i==20 || i==21){ //C. Valenciana
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[2]>=0 && motor.datosMapaCalorCom[2]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[2]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[2]>=5 && motor.datosMapaCalorCom[2]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[2]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[2]>=10 && motor.datosMapaCalorCom[2]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[2]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[2]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i==22){ //Cataluña
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[3]>=0 && motor.datosMapaCalorCom[3]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[3]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[3]>=5 && motor.datosMapaCalorCom[3]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[3]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[3]>=10 && motor.datosMapaCalorCom[3]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[3]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]);  
					}
					if(motor.datosMapaCalorCom[3]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i==24 || i==25){ //Ceuta
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[18]>=0 && motor.datosMapaCalorCom[18]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[18]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[18]>=5 && motor.datosMapaCalorCom[18]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[18]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[18]>=10 && motor.datosMapaCalorCom[18]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[18]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[18]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i>=26 && i<=34){ //Canarias
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[16]>=0 && motor.datosMapaCalorCom[16]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[16]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[16]>=5 && motor.datosMapaCalorCom[16]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[16]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[16]>=10 && motor.datosMapaCalorCom[16]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[16]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[16]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i>=35 && i<=44){ //I. Baleares
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[15]>=0 && motor.datosMapaCalorCom[15]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[15]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[15]>=5 && motor.datosMapaCalorCom[15]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[15]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[15]>=10 && motor.datosMapaCalorCom[15]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[15]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]);  
					}
					if(motor.datosMapaCalorCom[15]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else if(i==45){ //Galicia
					gl.uniform3fv(shaderProgram.uKs, [0.0, 0.0, 0.0]);
					var a=1.2;
					if(motor.datosMapaCalorCom[10]>=0 && motor.datosMapaCalorCom[10]<5){ //blanco
						for(var c=0; c<=motor.datosMapaCalorCom[10]; c++){
								a = a-0.2;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, 1.0, a]); 
					}
					if(motor.datosMapaCalorCom[10]>=5 && motor.datosMapaCalorCom[10]<10){ //amarillo
						a = a-0.2;
						for(var c=5; c<=motor.datosMapaCalorCom[10]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[10]>=10 && motor.datosMapaCalorCom[10]<15){ //naranja
						a = a-0.6;
						for(var c=10; c<=motor.datosMapaCalorCom[10]; c++){
								a = a-0.1;
						}
						gl.uniform3fv(shaderProgram.uKd, [1.0, a, 0.0]); 
					}
					if(motor.datosMapaCalorCom[10]>=15){
						gl.uniform3fv(shaderProgram.uKd, [1.0, 0.0, 0.0]); //rojo    
					}   
				}else{
					gl.uniform3fv(shaderProgram.uKd, [0.2, 0.25, 0.0]); //verde     
				}
			}else{
				
				gl.uniform3fv(shaderProgram.uKd, [0.2, 0.25, 0.0]); //verde 
				
				
			}

        }

        // Con las normales, el buffer (ARRAY_BUFFER) que tiene que estar enlazado es el de las normales
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mallas[i].normBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.mallas[i].normBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mallas[i].indexBuffer);

        mat4.identity(nMatrix);
        mat4.copy(nMatrix, mvMatrix);
        mat4.invert(nMatrix, nMatrix);
        mat4.transpose(nMatrix, nMatrix);

        setMatrixUniforms();

        gl.drawElements(gl.TRIANGLES, this.mallas[i].indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

        //desvincular una vez acabado el dibujado
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        gl.disableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    }
    
    }

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
  mtlLoader.setBaseUrl( 'app/graphics_engine/' );
  mtlLoader.setPath( 'app/graphics_engine/' );
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


