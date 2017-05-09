var gl;
var gestor;
var motor;
var shaderProgram;

function initGL(canvas) {

    try {
        gl = canvas.getContext("experimental-webgl") || canvas.getContext("webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

    } catch (e) {}
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }
    //Esto es muy para revisarlo
    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function initShaders() {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    /** Para las normales **/
    shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    //gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    /** Para las texturas **/
    shaderProgram.vertexTextureCoords = gl.getAttribLocation(shaderProgram, "aVertexTextureCoords");



    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");

    shaderProgram.uUseLights = gl.getUniformLocation(shaderProgram, "uUseLights");
    shaderProgram.uLightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");
    shaderProgram.uLightAmbient = gl.getUniformLocation(shaderProgram, "uLightAmbient");
    shaderProgram.uLightDiffuse = gl.getUniformLocation(shaderProgram, "uLightDiffuse");
    shaderProgram.uLightSpecular = gl.getUniformLocation(shaderProgram, "uLightSpecular");
    shaderProgram.uKd = gl.getUniformLocation(shaderProgram, "uKd"); //Componente difusa del material
    shaderProgram.uKa = gl.getUniformLocation(shaderProgram, "uKa"); //Componente ambiental del material
    shaderProgram.uKs = gl.getUniformLocation(shaderProgram, "uKs"); //Componente especular del material

    shaderProgram.uUseTextures = gl.getUniformLocation(shaderProgram, "uUseTextures");
    shaderProgram.uSampler = gl.getUniformLocation(shaderProgram, "uSampler");

}

var vMatrix = mat4.create();
var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var nMatrix = mat4.create();

function setMatrixUniforms() {
    //Actualizar projection, view y normal matrices
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    gl.uniformMatrix4fv(shaderProgram.nMatrixUniform, false, nMatrix);
}

/* MANEJO DE EVENTOS DE TECLADO */

var currentlyPressedKeys = {};

function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
}

function drawScene() {
    requestAnimFrame(drawScene); //ejecutamos 60 veces por segundo
    handleKeys();
    motor.draw();
    animate();
}






function webGLStart() {
    var canvas = document.getElementById("test-canvas");
    initGL(canvas);
    initShaders();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);


    //Creamos el gestor de recursos
    gestor = new TGestorRecursos();
    //Creamos el motor
    motor = new TMotorTAG();

    /* Creamos una serie de entidades de prueba*/

    var transLuz = motor.crearTransform();
    transLuz.trasladar(9, 1, 4);

    var transLuz2 = motor.crearTransform();
    transLuz2.trasladar(-9, 2, 4);

    var transCamara = motor.crearTransform();
    transCamara.trasladar(0, 0, 0);

    var transCamara2 = motor.crearTransform();
    transCamara2.trasladar(0, 0, 0);


    var scaleMallas = motor.crearTransform();
    scaleMallas.escalar(0.1, 0.1, 0.1);
    var transMallas = motor.crearTransform();
    transMallas.trasladar(-3, 0, -50);

    var trasMalla = motor.crearTransform();
    trasMalla.trasladar(-3, 0, -50);

    var trasMalla3 = motor.crearTransform();
    trasMalla3.trasladar(-3, 0, -10);

    var luz = motor.crearLuz();
    var a = [0.0, 0.1, 0.1, 1.0];
    var d = [1.0, 1.0, 1.0, 1.0];
    var s = [0, 0, 0, 1.0];
    luz.setValues(a, d, s);

    var luz2 = motor.crearLuz();
    var a2 = [0.1, 0.1, 0.1, 1.0];
    var d2 = [1.0, 1.0, 1.0, 1.0];
    var s2 = [0, 0, 0, 1.0];
    luz2.setValues(a2, d2, s2);

    var camara = motor.crearCamara();
    camara.setPerspectiva(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100);

    var camara2 = motor.crearCamara();
    camara2.setParalela(-20, 20, -20, 20, 0.1, 100);

    //var malla2 = motor.crearMallaConMat('*.obj','*.mtl');
    //var malla = motor.crearMalla('*.obj');
    //var malla3 = motor.crearMallaConText('*.obj','app/graphics_engine/Modelos/*.jpg');


    /** nodos **/
    /*
    var NTrLuz = motor.crearNodo(motor.escena, transLuz);
    var NTrLuz2 = motor.crearNodo(motor.escena, transLuz2);
    var NTrCamara = motor.crearNodo(motor.escena, transCamara);
    var NTrCamara2 = motor.crearNodo(motor.escena, transCamara2);
    var NRotMallas = motor.crearNodo(motor.escena, scaleMallas);
    var NTrMallas = motor.crearNodo(NRotMallas, transMallas);
    var NTrMalla2 = motor.crearNodo(motor.escena, trasMalla);
    var NTrMalla3 = motor.crearNodo(motor.escena, trasMalla3);

    var NLuz = motor.crearNodoLuz(NTrLuz,luz); //Nodo luz (nodo hoja)
    var NLuz2 = motor.crearNodoLuz(NTrLuz2, luz2);
    var NCamara = motor.crearNodoCamara(NTrCamara,camara); //Nodo camara (nodo hoja)
    var NCamara2 = motor.crearNodoCamara(NTrCamara2, camara2);
    var NObjeto = motor.crearNodo(NTrMallas,malla);
    var NTierra = motor.crearNodo(NTrMalla2,malla2);
    var NCapsula = motor.crearNodo(NTrMalla3, malla3);
    */

    /*** Registro de luces y camaras ***/
    motor.registrarCamara(NCamara);
    motor.registrarCamara(NCamara2);
    motor.setCamaraActiva(0); //la primera cámara
    var nl = motor.registrarLuz(NLuz);
    var nl2 = motor.registrarLuz(NLuz2);

    /*** set luces y camaras activas ***/
    motor.setLuzActiva(nl);

    /***gets***/
    motor.getCamaraActiva();

    /** Viewport **/
    var vp_position = vec2.create();
    vp_position[0] = 0;
    vp_position[1] = 0;
    var vp_tamano = vec2.create();
    vp_tamano[0] = gl.viewportWidth;
    vp_tamano[1] = gl.viewportHeight;
    var vp = motor.registrarViewport(vp_position, vp_tamano);
    motor.setViewportActivo(vp);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

}



var xRot = 0;
var xSpeed = 0;
var yRot = 0;
var ySpeed = 0;
var zZoom = 0;


function handleKeys() {
    if (currentlyPressedKeys[37]) {
        // Left cursor key
        ySpeed -= 1;
        console.log(ySpeed);
    }
    if (currentlyPressedKeys[39]) {
        // Right cursor key
        ySpeed += 1;
        console.log(ySpeed);
    }
    if (currentlyPressedKeys[38]) {
        // Up cursor key
        xSpeed -= 1;
    }
    if (currentlyPressedKeys[40]) {
        // Down cursor key
        xSpeed += 1;
    }
}


var lastTime = 0;

function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;

        xRot += (xSpeed * elapsed) / 1000.0;
        yRot += (ySpeed * elapsed) / 1000.0;
    }
    lastTime = timeNow;
}

//Posiciones actuales
var x0 = 9.0;
var y0 = 1.0;
var z0 = 4.0;

function updateLightDirection() {
    var x = document.getElementById("slider-x").value;
    var y = document.getElementById("slider-y").value;
    var z = document.getElementById("slider-z").value;

    var newx = -(x0 - x);
    var newy = -(y0 - y);
    var newz = -(z0 - z);

    if (x0 != x)
        motor.moverLuzActiva(newx, 0, 0);
    else if (y0 != y)
        motor.moverLuzActiva(0, newy, 0);
    else if (z0 != z)
        motor.moverLuzActiva(0, 0, newz);

    x0 = x;
    y0 = y;
    z0 = z;

    document.getElementById("slider-x-value").innerHTML = x;
    document.getElementById("slider-y-value").innerHTML = y;
    document.getElementById("slider-z-value").innerHTML = z;

}

//Posiciones actuales
var xC = 0;
var yC = 0;
var zC = 0;

function updateCameraPosition() {
    var x = document.getElementById("camera-x").value;
    var y = document.getElementById("camera-y").value;
    var z = document.getElementById("camera-z").value;

    var newx = -(xC - x);
    var newy = -(yC - y);
    var newz = -(zC - z);

    if (xC != x)
        motor.moverCamaraActiva(newx, 0, 0);
    else if (yC != y)
        motor.moverCamaraActiva(0, newy, 0);
    else if (zC != z)
        motor.moverCamaraActiva(0, 0, newz);

    xC = x;
    yC = y;
    zC = z;

    document.getElementById("camera-x-value").innerHTML = x;
    document.getElementById("camera-y-value").innerHTML = y;
    document.getElementById("camera-z-value").innerHTML = z;
}

function fovyCam(fovy) {
    var cam = motor.getCamaraActiva().nodo.getEntity();
    cam.fovy = fovy;
}

var ukambient = 0.06;
var ukspecular = 0.0;

function updateMaterial() {
    var ambient = document.getElementById("slider-ambient").value;
    var specular = document.getElementById("slider-specular").value;

    ukambient = ambient;
    ukspecular = specular;
}

function updateLight() {
    var ambient = document.getElementById("light-ambient").value;
    var specular = document.getElementById("light-specular").value;

    var luz = motor.getLuzActiva().nodo.getEntity();
    var a2 = [ambient, ambient, ambient, 1.0];
    var s2 = [specular, specular, specular, 1.0];
    luz.setValues(a2, 0, s2);
}
