<!-- WebGL utils originally from here: https://cvs.khronos.org/svn/repos/registry/trunk/public/webgl/sdk/demos/common/webgl-utils.js -->
<script type="text/javascript" src="webgl-utils.js"></script>
<!-- glMatrix utils originally from here: http://code.google.com/p/glmatrix/source/browse/glMatrix.js -->
<script type="text/javascript" src="glMatrix.js"></script>
<!-- lib to ease model and material managment -->
<script type="text/javascript" src="l3dmodels.js"></script>

<!-- Shader programs -->

<!-- simple shader displaying a constant color -->
<script id="color_vs" type="x-shader/x-vertex">

uniform mat4 uMat4PVM;  

attribute vec4 aVec4Position;  
        
void main()                 
{
	gl_Position = uMat4PVM * aVec4Position;
}

</script>

<script id="color_fs" type="x-shader/x-fragment">
precision mediump float;      
							   
uniform vec4 uVec4Diffuse;         
		  					  
void main()                   
{
    gl_FragColor = uVec4Diffuse;
}
</script>


<!-- Phong shader -->
<script id="phong_vs" type="x-shader/x-vertex">

uniform mat4 uMat4PVM;   
uniform mat3 uMat3Normal;
uniform mat4 uMat4ViewModel;

attribute vec4 aVec4Position;  
attribute vec3 aVec3Normal;
        
varying vec3 normal;
varying vec3 eyeCoord;

void main()                 
{

    normal = normalize(uMat3Normal * aVec3Normal);
    eyeCoord = -vec3(uMat4ViewModel * aVec4Position);

	gl_Position = uMat4PVM * aVec4Position;
}

</script>

<script id="phong_fs" type="x-shader/x-fragment">
precision mediump float;      
							  
uniform vec3 uVec3LightDir; 
uniform vec4 uVec4Diffuse;         
uniform vec4 uVec4Specular;
uniform float uFloatShininess;
uniform float uFloatAmbient;
		  					  
varying vec3 normal;
varying vec3 eyeCoord;
            
void main()                   
{
    vec4 spec = vec4(0.0);

    vec3 n = normalize(normal);
    vec3 e = normalize(eyeCoord);
    

    float intensity = max(dot(n,uVec3LightDir), 0.0);

    if (intensity > 0.0) {
    
        vec3 h = normalize(uVec3LightDir + e);
        float intSpec = max(dot(h,n), 0.0);
        spec = uVec4Specular * pow(intSpec, uFloatShininess);
    }
 // gl_FragColor = vec4(1.0,1.0,0.0,1.0);
//  gl_FragColor = vec4(uVec3LightDir,1.0);
    gl_FragColor = max(vec4(intensity, intensity, intensity, 1.0) * uVec4Diffuse + spec , uVec4Diffuse * vec4(uFloatAmbient, uFloatAmbient, uFloatAmbient, 1.0));  
}
</script>


<!-- Phong shader with texturing -->
<script id="phong_texture_vs" type="x-shader/x-vertex">

uniform mat4 uMat4PVM;   
uniform mat3 uMat3Normal;
uniform mat4 uMat4ViewModel;

attribute vec4 aVec4Position;  
attribute vec3 aVec3Normal;
attribute vec2 aVec2TexCoord;

        
varying vec3 normal;
varying vec3 eyeCoord;
varying vec2 tc;

void main()                 
{
    tc = aVec2TexCoord;
    normal = normalize(uMat3Normal * aVec3Normal);
    eyeCoord = -vec3(uMat4ViewModel * aVec4Position);

	gl_Position = uMat4PVM * aVec4Position;
}

</script>

<script id="phong_texture_fs" type="x-shader/x-fragment">
precision mediump float;      
							  
uniform vec3 uVec3LightDir; 
uniform vec4 uVec4Diffuse;         
uniform vec4 uVec4Specular;
uniform float uFloatShininess;
uniform float uFloatAmbient;
		  				
uniform sampler2D uSamp2DTexID;
        	  
varying vec3 normal;
varying vec3 eyeCoord;
varying vec2 tc;
            
void main()                   
{
    vec4 spec = vec4(0.0);

    vec3 n = normalize(normal);
    vec3 e = normalize(eyeCoord);
    

    float intensity = max(dot(n,uVec3LightDir), 0.0);

    if (intensity > 0.0) {
    
        vec3 h = normalize(uVec3LightDir + e);
        float intSpec = max(dot(h,n), 0.0);
        spec = uVec4Specular * pow(intSpec, uFloatShininess);
    }
    vec4 dif = uVec4Diffuse * texture2D(uSamp2DTexID, tc);
    gl_FragColor = max(vec4(intensity, intensity, intensity, 1.0) * dif + spec , uVec4Diffuse * vec4(uFloatAmbient, uFloatAmbient, uFloatAmbient, 1.0));  
}
</script>


<script type="text/javascript">

/* Reference to the WebGLContext */
var gl = null;		   

/* Reference to the canvas DOM object. */
var canvas = null;	 

/* References to the shader programs */
var phongProgram, colorProgram, phongTexProgram;

// --------------------------------------------------------------------------
//  Camera variables and helper function
// --------------------------------------------------------------------------
var deltaAlpha = 0;
var deltaBeta = 0;
var alpha = 0.44, prevAlpha;
var beta = 0.44, prevBeta;
var radius = 5, prevRadius;
var camX, camY, camZ;

function spherical2Cartesian() {

    camX = radius * Math.cos(beta) * Math.sin(alpha);
    camZ = radius * Math.cos(beta) * Math.cos(alpha);
    camY = radius * Math.sin(beta)
}


// --------------------------------------------------------------------------
//  Storage for the loaded model
// Models is defined in l3dmodels.js
// --------------------------------------------------------------------------

var myModel = new Models(), myGrid = new Model(), myAxis = new Models();


// --------------------------------------------------------------------------
//  Shader stuff
// --------------------------------------------------------------------------

function createProgram(docVS, docFS, attributes, uniforms) {

    // create the shader handles
    var vs = gl.createShader(gl.VERTEX_SHADER);
    var fs = gl.createShader(gl.FRAGMENT_SHADER);

    // get the source code
    vsSource = document.getElementById(docVS);
    fsSource = document.getElementById(docFS);

    // set the source
    gl.shaderSource(vs, vsSource.text);
    gl.shaderSource(fs, fsSource.text);

    // compile shaders
    gl.compileShader(vs);
    gl.compileShader(fs);

    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) 
        throw ("Shader Error: " + docVS + ": " + gl.getShaderInfoLog(vs));
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS))
        throw ("Shader Error: " + docFS + ": " + gl.getShaderInfoLog(fs));

    var program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
   
    for (var i = 0; i < attributes.length; ++i) {
        gl.bindAttribLocation(program, i, attributes[i]);
    }

    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw ("Program Error: " + gl.getProgramInfoLog(program));

    program.uniforms = {};
    for (var i = 0; i < uniforms.length; ++i) {
        program.uniforms[uniforms[i]] = gl.getUniformLocation(program, uniforms[i]);
    }

    return(program);
}






// Callback called each time the browser wants us to draw another frame
function render(time)
{           	
    // Clear color and depth buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
    // Place Camera
    mat4.identity(Matrices.view);
    mat4.lookAt(vec3.create([camX, camY, camZ]), vec3.create([0, 0, 0]), vec3.create([0, 1, 0]), Matrices.view);

    // Clear model matrix 
    mat4.identity(Matrices.model);

    // set phong to be the active program
    gl.useProgram(phongProgram);

    // compute all derived matrices (normal, viewModel, PVM)
    Matrices.compDerived();
    
    // set matrices
    gl.uniformMatrix4fv(phongProgram.uniforms["uMat4ViewModel"], false, Matrices.getVM());
    gl.uniformMatrix3fv(phongProgram.uniforms["uMat3Normal"], false, Matrices.getN());
    gl.uniformMatrix4fv(phongProgram.uniforms["uMat4PVM"], false, Matrices.getPVM());


    // set the light direction uniform
    var uVec3LightDir = [1.0, 0.5, 1.0,0.0];
    var res2 = vec3.create();
    mat4.multiplyVec4(Matrices.getVM(), uVec3LightDir, res2);
    vec3.normalize(res2);
    gl.uniform3fv(phongProgram.uniforms["uVec3LightDir"], res2);

    myAxis.render();

    // set the textured phong program as active
    gl.useProgram(phongTexProgram);

    // set the matrices
    gl.uniformMatrix4fv(phongTexProgram.uniforms["uMat4PVM"], false, Matrices.getPVM());
    gl.uniformMatrix4fv(phongTexProgram.uniforms["uMat4ViewModel"], false, Matrices.getVM());
    gl.uniformMatrix3fv(phongTexProgram.uniforms["uMat3Normal"], false, Matrices.getN());
    // set the light dir
    gl.uniform3fv(phongTexProgram.uniforms["uVec3LightDir"], res2);

    // render the loaded model
    // note: if the model has no texture use phongProgram instead
    myModel.render();

    // set the color program as active
    gl.useProgram(colorProgram);

    // set the matrix
    gl.uniformMatrix4fv(colorProgram.uniforms["uMat4PVM"], false, Matrices.getPVM());

    // render the grid
    myGrid.render();

    // just checking
    checkError();
    
    // Send the commands to WebGL
    gl.flush();
	
    // Request another frame
    window.requestAnimFrame(render, canvas);
}

function checkError()
{
    var error = gl.getError();
	
    if (error) 
        console.log("error: " + error);
}

 

// --------------------------------------------------------------------------
//  Mouse and Keyboard handlers
// --------------------------------------------------------------------------

var mouseTracking = -1, startX, startY;

function handleKeyDown(event) {

    switch (String.fromCharCode(event.keyCode)) {
        case "A": alpha -= 0.05; break;
        case "D": alpha += 0.05; break;
        case "W": beta += 0.05; if (beta > 1.5) beta = 1.5; break;
        case "S": beta -= 0.05; if (beta < -1.5) beta = -1.5; break;
        case "R": radius += 0.05; break;
        case "F": radius -= 0.05; if (radius < 0.5) radius = 0.5; break;
    }
    spherical2Cartesian();
}


function handleMouseDown(event) {
    if (event.button == 0) // left button
        mouseTracking = 0;
    else if (event.button == 1)
        mouseTracking = 1;
    startX = event.clientX;
    startY = event.clientY;
    prevAlpha = alpha;
    prevBeta = beta;
    prevRadius = radius;
}


function handleMouseUp(event) {
    mouseTracking = -1;
}

function handleMouseMove(event) {

    if (mouseTracking == -1) {
        return;
    }
    var xx = event.clientX;
    var yy = event.clientY;
    var deltaX = -xx + startX;
    var deltaY = yy - startY;
    if (mouseTracking == 0) {
        alpha = prevAlpha + deltaX * 0.01;
        beta = prevBeta + deltaY * 0.01;
        if (beta > 1.5)
            beta = 1.5;
        if (beta < -1.5)
            beta = -1.5;
    }
    else if (mouseTracking == 1) {
        radius = prevRadius - deltaY*0.01;
    }
    spherical2Cartesian();

}


// --------------------------------------------------------------------------
//  Init GL settings, programs and models
// --------------------------------------------------------------------------

//Called when we have the context
function init() {

    // init cam variables;
    spherical2Cartesian();

    // set the viewport to be the whole canvas
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);

    // projection matrix. 
    var ratio = canvas.clientWidth / canvas.clientHeight;
    mat4.perspective(60, ratio, 0.1, 50, Matrices.proj);


    // Set the background clear color to gray.
    gl.clearColor(0.8, 0.8, 0.8, 1.0);
    // general gl settings
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    // create the shader programs
    phongProgram = createProgram("phong_vs", "phong_fs",
        ["aVec4Position", "aVec3Normal"],
        ["uMat4PVM", "uMat3Normal", "uMat4ViewModel", "uVec3LightDir", "uVec4Diffuse", "uVec4Specular", "uFloatShininess"]);

    colorProgram = createProgram("color_vs", "color_fs",
        ["aVec4Position"],
        ["uMat4PVM", "uVec4Diffuse"]);

    phongTexProgram = createProgram("phong_texture_vs", "phong_texture_fs",
         ["aVec4Position", "aVec3Normal", "aVec2TexCoord"],
        ["uMat4PVM", "uMat3Normal", "uMat4ViewModel", "uSamp2DTexID", "uVec3LightDir", "uVec4Diffuse", "uVec4Specular", "uFloatShininess"]);

    // init the matrices
    Matrices.init();

    // init the models for rendering
    var myGridMat = new Material();
    myGridMat.diffuse = new Float32Array([1.0, 1.0, 1.0, 1.0]);
    myGrid = createGrid(1, 3, 12);
    myGrid.setMaterial(myGridMat);
    myAxis = createAxis(3);
    myModel = Models.loadModel("cube2.json");
    // just in case
    checkError();
}


// --------------------------------------------------------------------------
//  Main function
// --------------------------------------------------------------------------


function main()
{		
    // Try to get a WebGL context    
    canvas = document.getElementById("canvas");    
    
    gl = WebGLUtils.setupWebGL(canvas, { depth: true });
            
    if (gl != null)
    {
        // init gl stuff
        init();

        // handlers for keyboard and mouse
        document.onkeydown = handleKeyDown;
        canvas.onmousedown = handleMouseDown;
        document.onmouseup = handleMouseUp;
        document.onmousemove = handleMouseMove;

        // rendering callback
        window.requestAnimFrame(render, canvas);
    }
}

// call the main entry point
main();
</script>