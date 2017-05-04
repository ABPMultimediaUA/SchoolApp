var pila = [];
var matrizActual = mat4.create();

/*** TEntidad ***/
function TEntidad(){}

TEntidad.prototype.beginDraw = function(){
  //console.log("Esto es beginDraw de TEntidad");
}
TEntidad.prototype.endDraw = function(){
  //console.log("Esto es endDraw de TEntidad");
}

/*** TNodo ***/
function TNodo(){
	this.entidad = null;
	this.padre = null;
	this.hijos = new Array();
}

TNodo.prototype.addHijo = function(nodo){
	nodo.padre = this;
	this.hijos.push(nodo);
	return this.hijos.length;
}

TNodo.prototype.remHijo = function(nodo){
	var index = this.hijos.indexOf(nodo);
	if (index > -1) {
    		this.hijos.splice(index, 1);
	}
	return index;
}

TNodo.prototype.getPadre = function(){ return this.padre; }
TNodo.prototype.getEntidad = function(){ return this.entidad; }
TNodo.prototype.setEntidad = function(entidad){ this.entidad = entidad; }
TNodo.prototype.draw = function(){
	if(this.entidad){
		this.entidad.beginDraw();
	}

	for(var i=0;i<this.hijos.length;i++){
		this.hijos[i].draw();
	}

	if(this.entidad){
		this.entidad.endDraw();
	}
}

/*** TTransform ***/
function TTransform(){
	this.matriz = mat4.create();
}
TTransform.prototype = new TEntidad;

TTransform.prototype.identidad = function(){
	mat4.identity(this.matriz); //crea una matriz identidad
}

TTransform.prototype.cargar = function(matr){
	mat4.copy(this.matriz,matr);
}

TTransform.prototype.trasponer = function(){
	// Se traspone la matriz de transformacion
	mat4.transpose(this.matriz, this.matriz);
}

TTransform.prototype.trasladar = function(tx, ty, tz){
	//se crea vector de traslacion vacio
	var vecTr = vec3.create();

	//se rellena con los valores pasados por parametro
	vec3.set(vecTr,tx,ty,tz);
	mat4.translate(this.matriz, this.matriz, vecTr);
}

TTransform.prototype.rotar = function(rx, ry, rz, ang){
	//ejes de rotacion
	var axis = vec3.create();
	vec3.set(axis,rx,ry,rz);
	//angulo de rotacion en radianes
	var rad = ang * Math.PI / 180;

	mat4.rotate(this.matriz, this.matriz, rad, axis);
}

TTransform.prototype.escalar = function(sx, sy, sz){
	var vecSca = vec3.create();
	vec3.set(vecSca,sx,sy,sz);

	mat4.scale(this.matriz, this.matriz, vecSca);
}

TTransform.prototype.beginDraw = function(){
	//console.log("Esto es beginDraw de TTransform");
  var copia = mat4.create();
  mat4.copy(copia,matrizActual);
	pila.push(copia);
	mat4.multiply(matrizActual,this.matriz,matrizActual);
}
TTransform.prototype.endDraw = function(){
	matrizActual = pila.pop();
}

/*** TCamara ***/
function TCamara(){
	this.esPerspectiva = true;
  this.fovy = 0;
	this.near = 0;
	this.far = 0;
  this.aspect = 0;
  this.bottom = 0;
  this.top = 0;
  this.left = 0;
  this.right = 0;
}

TCamara.prototype = new TEntidad;

TCamara.prototype.setPerspectiva = function(angle,aspect,n,f){
	this.esPerspectiva = true;
  this.fovy = angle;
	this.near = n;
	this.far = f;
  this.aspect = aspect;

}

TCamara.prototype.setParalela = function(l,r,b,t,n,f){
	this.esPerspectiva = false;
    this.left = l;
    this.right = r;
    this.top = t;
    this.bottom = b;
    this.near = n;
    this.far = f;
}

TCamara.prototype.beginDraw = function(){
}

TCamara.prototype.endDraw = function(){
  //console.log("Esto es endDraw de TCamara");
}

/*** TLuz ***/
function TLuz(){
	//TNodo.call();
	this.intensidad = vec3.create();
  this.ambient = vec3.create();
  this.diffuse = vec3.create();
  this.specular = vec3.create();
}

TLuz.prototype = new TEntidad;

TLuz.prototype.setIntensidad = function(i){
	this.intensidad = i;
}

TLuz.prototype.setValues = function(v1,v2,v3){
    if(v1!=0)
        this.ambient = v1;
    if(v2!=0)
        this.diffuse = v2;
    if(v3!=0)
        this.specular = v3;
}

TLuz.prototype.getIntensidad = function(){
	return this.intensidad;
}
TLuz.prototype.beginDraw = function(){
  //console.log("Esto es beginDraw de TLuz");

}
TLuz.prototype.endDraw = function(){
  //console.log("Esto es endDraw de TLuz");
}

/*** TMalla ***/
function TMalla(m){
	this.malla = m;

}

TMalla.prototype = new TEntidad;

TMalla.prototype.cargarMalla = function(f){
  var malla = gestor.getRecurso(f,"malla");
  this.malla = malla;
}

/*** métodos añadidos, no sé si sería así ***/
TMalla.prototype.cargarTextura = function(t){
  var textura = gestor.getRecurso(t,"textura");
  this.malla.textura = textura; //atributo dentro de textura para poder acceder en el draw de malla
}

TMalla.prototype.cargarMaterial = function(m){
  var material = gestor.getRecurso(m,"material");
  this.malla.material = material;
}

/***************************************/

TMalla.prototype.beginDraw = function(){
	//console.log("Esto es beginDraw de TMalla");

  this.malla.draw();
}

TMalla.prototype.endDraw = function(){}
