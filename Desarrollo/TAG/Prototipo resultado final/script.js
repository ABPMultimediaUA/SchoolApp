
var main=function() {
  var CANVAS=document.getElementById("your_canvas");
  CANVAS.width=window.innerWidth;
  CANVAS.height=window.innerHeight;

  /*========================= CAPTURE MOUSE EVENTS ========================= */

  var AMORTIZATION=0.9;
  var drag=false;
  var old_x, old_y;
  var dX=0, dY=0;

  var mouseDown=function(e) {
    drag=true;
    old_x=e.pageX, old_y=e.pageY;
    e.preventDefault();
    return false;
  };

  var mouseUp=function(e){
    drag=false;
  };

  var VIEWINGVIDEO=false;
  var VIEWINGVIDEOINDEX=0;
  var VIEWINGVIDEO_T=0;

  var RAYVECTOR=[0,0,0];
  var RAYINTERSECT=false;
  var SPHEREINTERSECTED=-1;

  var mouseMove=function(e) {
    if (!drag) { //launch ray

      // Xn,Yn : normalized coordinates ( between -1 and 1 )
      var Xn = 2*(e.pageX/CANVAS.width) -1;
      var Yn = 2*(e.pageY/CANVAS.height)-1;

      //if we invert the projection matrix, we can retrieve these relations :
      RAYVECTOR[0]=-(1/PROJMATRIX[0])*Xn;
      RAYVECTOR[1]= (1/PROJMATRIX[5])*Yn;
      RAYVECTOR[2]=  1;

      LIBS.normalize(RAYVECTOR);

      RAYINTERSECT=false;
      var k2Intersect=1e12; //intersection distance.

      //compute the intersection of (cameraPosition, RAYVECTOR) with the 5 spheres
      SPHERES.map(function(sphere, sphereIndex){
        //compute the position of the center of the sphere in the view frame of reference
        var centerScene = LIBS.getTranslation(sphere.matrix);
        var centerView = LIBS.multVecMat4(VIEWMATRIX, centerScene);

        //compute the distance between the ray and the center of the sphere
        var APcrossRay=LIBS.cross(centerView, RAYVECTOR);
        var d2=LIBS.squareNorm(APcrossRay);

        if (d2<1) {
          var k2=LIBS.squareNorm(centerView);
          if (k2<k2Intersect) {
            //this is the nearest intersection
            k2intersect=k2;
            RAYINTERSECT=true;
            SPHEREINTERSECTED=sphereIndex;
          }
        }

      });

      return false;
    } //end ray launch
    dX=-(e.pageX-old_x)*Math.PI/CANVAS.width,
      dY= (e.pageY-old_y)*Math.PI/CANVAS.height;
    THETA+=dX;
    PHI+=  dY;
    old_x=e.pageX, old_y=e.pageY;
    e.preventDefault();
  };

  var ROTATEAUTO=false;
  var CONSIGNANGLE=0;

  var mouseClick=function(e) {
    if (VIEWINGVIDEO) {
      VIEWINGVIDEO=false;
    } else {
      if (!RAYINTERSECT) return false;
      ROTATEAUTO=true;
      CONSIGNANGLE=Math.PI/2-(SPHEREINTERSECTED+0.25)*2*Math.PI/5;

      //clamp CONSIGNANGLE between -PI and +PI
      while(CONSIGNANGLE-THETA<-Math.PI) CONSIGNANGLE+=2*Math.PI;
      while(CONSIGNANGLE-THETA> Math.PI) CONSIGNANGLE-=2*Math.PI;
      VIEWINGVIDEOINDEX=SPHEREINTERSECTED;
      VIEWINGVIDEO=true;
    }
  };

  CANVAS.addEventListener("mousedown", mouseDown, false);
  CANVAS.addEventListener("mouseup", mouseUp, false);
  CANVAS.addEventListener("mouseout", mouseUp, false);
  CANVAS.addEventListener("mousemove", mouseMove, false);
  CANVAS.addEventListener("click", mouseClick, false);

  /*========================= GET WEBGL CONTEXT ========================= */
  var GL;
  try {
    GL = CANVAS.getContext("experimental-webgl", {antialias: true});
  } catch (e) {
    alert("You are not webgl compatible :(") ;
    return false;
  }

  /*========================= SHADERS ========================= */
  /*jshint multistr: true */

  var shader_vertex_source="\n\
attribute vec3 position;\n\
attribute vec2 uv;\n\
uniform mat4 Pmatrix,Vmatrix,Mmatrix;\n\
uniform vec3 camera;\n\
uniform float viewingCoeffVS;\n\
uniform float aspectRatio;\n\
varying vec3 vNormal;\n\
varying float vFog;\n\
varying vec2 vUV;\n\
\n\
\n\
void main(void) {\n\
vec4 scenePosition=Mmatrix*vec4(position, 1.);\n\
vec4 sceneNormal=Mmatrix*vec4(position, 0.);\n\
\n\
vec3 incident=normalize(scenePosition.xyz+camera); //incident unit vector\n\
vec3 refracted=refract(incident, sceneNormal.xyz, 1./2.4);   //refracted unit vector\n\
\n\
\n\
float k=-sceneNormal.z/refracted.z; //k so that (scenePosition-center+k.refracted).y=0\n\
vec2 I=sceneNormal.xy+k*refracted.xy;\n\
\n\
vec4 viewPosition = Vmatrix*scenePosition;\n\
vec4 screenPosition=vec4(uv-vec2(0.5,0.5), 0., 1.);\n\
screenPosition.y*=aspectRatio;\n\
gl_Position =  mix(Pmatrix*viewPosition, screenPosition, viewingCoeffVS);\n\
vUV=mix(I+vec2(.5,.5), uv, viewingCoeffVS);\n\
vNormal=vec3(Vmatrix*sceneNormal);\n\
vFog=1.-smoothstep(2., 18., -viewPosition.z);\n\
}";

  var shader_fragment_source="\n\
precision mediump float;\n\
uniform sampler2D samplerVideo;\n\
uniform float highlight;\n\
uniform float viewingCoeffFS;\n\
uniform vec3 cameraFrag;\n\
varying vec3 vNormal;\n\
const vec3 LIGHT=vec3(0.,1.,0.); //directionnal light direction\n\
varying float vFog;\n\
varying vec2 vUV;\n\
\n\
\n\
void main(void) {\n\
vec4 videoColor = texture2D(samplerVideo, vUV);\n\
\n\
float I=1.; //ambient light\n\
vec3 R=normalize(reflect(LIGHT, vNormal)); //reflected ray \n\
I+=max(0.001,pow(dot(R, 1.2*normalize(cameraFrag)), 16.)); //specular lighting\n\
I*=1.-pow(1.-vNormal.z,2.);\n\
\n\
I*=vFog;\n\
I*=highlight;\n\
\n\
gl_FragColor=vec4(videoColor.xyz*mix(I,1.,viewingCoeffFS), 1.);\n\
}";

  var get_shader=function(source, type, typeString) {
    var shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);
    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
      alert("ERROR IN "+typeString+ " SHADER : " + GL.getShaderInfoLog(shader));
      return false;
    }
    return shader;
  };

  var shader_vertex=get_shader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
  var shader_fragment=get_shader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");

  var SHADER_PROGRAM=GL.createProgram();
  GL.attachShader(SHADER_PROGRAM, shader_vertex);
  GL.attachShader(SHADER_PROGRAM, shader_fragment);

  GL.linkProgram(SHADER_PROGRAM);

  var _Pmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Pmatrix");
  var _Vmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Vmatrix");
  var _Mmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Mmatrix");
  var _samplerVideo = GL.getUniformLocation(SHADER_PROGRAM, "samplerVideo");

  var _camera = GL.getUniformLocation(SHADER_PROGRAM, "camera");
  var _cameraFrag = GL.getUniformLocation(SHADER_PROGRAM, "cameraFrag");

  var _highLight = GL.getUniformLocation(SHADER_PROGRAM, "highlight");

  var _viewingCoeffVS=GL.getUniformLocation(SHADER_PROGRAM, "viewingCoeffVS");
  var _viewingCoeffFS=GL.getUniformLocation(SHADER_PROGRAM, "viewingCoeffFS");
  var _aspectRatio=GL.getUniformLocation(SHADER_PROGRAM, "aspectRatio");
  var _uv = GL.getAttribLocation(SHADER_PROGRAM, "uv");
  var _position = GL.getAttribLocation(SHADER_PROGRAM, "position");

  GL.enableVertexAttribArray(_uv);
  GL.enableVertexAttribArray(_position);

  GL.useProgram(SHADER_PROGRAM);
  GL.uniform1i(_samplerVideo, 0);

  /*========================= THE SPHERE ========================= */

  //the radius of this sphere is 1
  var nCrowns=64; //number of crowns for the sphere mesh
  var nBands=32;  //number of bands for the sphere mesh
  var nVertices=0;

  var sphere_vertices=[];
  var sphere_indices=[];
  var c,b,theta,phi;


  for (c=0; c<=nCrowns; c++) {   //loop on crowns
    phi=Math.PI*c/nCrowns;         //compute lattitude

    for (b=0; b<=nBands; b++) { //loop on bands
      theta=2*Math.PI*b/nBands;   //compute longitude

      sphere_vertices.push(Math.cos(theta)*Math.sin(phi), //X
                           Math.cos(phi),                 //Y,
                           Math.sin(theta)*Math.sin(phi), //Z
                           theta/(2*Math.PI),             //U
                           phi/Math.PI);                  //V
      if (c!==0) { //add a triangle face
        sphere_indices.push(c*(nBands+1)+b, c*(nBands+1)+b-1, (c-1)*(nBands+1)+b);
        nVertices+=3;
      }
      if (c!==0 && c!==1) { //add an other triangle face
        sphere_indices.push(c*(nBands+1)+b-1, (c-1)*(nBands+1)+b, (c-1)*(nBands+1)+b-1);
        nVertices+=3;
      }


    }                         //end loop on bands
  }                           //end loop on crowns

  //VERTICES
  var SPHERE_VERTICES= GL.createBuffer ();
  GL.bindBuffer(GL.ARRAY_BUFFER, SPHERE_VERTICES);
  GL.bufferData(GL.ARRAY_BUFFER,
                new Float32Array(sphere_vertices),
    GL.STATIC_DRAW);

  //FACES :
  var SPHERE_INDICES= GL.createBuffer ();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, SPHERE_INDICES);
  GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,
                new Uint16Array(sphere_indices),
    GL.STATIC_DRAW);

  /*========================= MATRIX ========================= */

  var PROJMATRIX=LIBS.get_projection(40, CANVAS.width/CANVAS.height, 0.1, 20);
  var VIEWMATRIX=LIBS.get_I4();
  var cameraPosition=[0,0.5,-8];
  GL.uniform3fv(_camera, cameraPosition);
  GL.uniform3fv(_cameraFrag, cameraPosition);
  var THETA=0,
      PHI=0;

  /*========================= INIT SPHERES ========================= */
  var SPHERES=[]; //sphere objects array
  var radius=3;   //radius of the spheres circle

  for (var i=0; i<5; i++) { //for each sphere

    var angle=(i+0.25)*(2*Math.PI/5);
    var matrix=LIBS.get_I4();
    LIBS.translateX(matrix, radius*Math.cos(angle));
    LIBS.translateZ(matrix, radius*Math.sin(angle));

    var videoElement=document.createElement("video");
    videoElement.setAttribute("autoplay", "true");
    videoElement.setAttribute("loop", "true");
    videoElement.src='ressources/'+['black', 'black', 'black', 'black', 'black'][i]+'.mp4';

    var videoTexture=GL.createTexture();
    GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
    GL.bindTexture(GL.TEXTURE_2D, videoTexture);
    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
    GL.texParameteri( GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE );
    GL.texParameteri( GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE );

    SPHERES.push({
      angle: angle,
      matrix: matrix,
      video: videoElement,
      videoTexture: videoTexture,
      oldTime: 0
    });

  }                            //end for each sphere


  /*========================= DRAWING ========================= */
  //set WebGL states
  GL.enable(GL.DEPTH_TEST);
  GL.clearDepth(1.0);
  GL.clearColor(15/255, 50/255, 83/255, 1.0);

  GL.bindBuffer(GL.ARRAY_BUFFER, SPHERE_VERTICES);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false,4*(3+2),0) ;
  GL.vertexAttribPointer(_uv, 2, GL.FLOAT, false,4*(3+2),3*4) ;

  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, SPHERE_INDICES);
  var time_old=0;

  //the render loop :
  var animate=function(time) {
    var dt=(time-time_old)/1000;
    time_old=time;

    if (!drag) {
      dX*=AMORTIZATION, dY*=AMORTIZATION;
      THETA+=dX, PHI+=dY;
      PHI*=0.95;
    }

    if (ROTATEAUTO) {
      if (Math.abs(CONSIGNANGLE-THETA)<0.05) {
        ROTATEAUTO=false;
      } else {
        THETA+=0.1*(CONSIGNANGLE-THETA);
      }
    }


    GL.viewport(0.0, 0.0, CANVAS.width, CANVAS.height);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
    GL.uniformMatrix4fv(_Pmatrix, false, PROJMATRIX);

    LIBS.set_I4(VIEWMATRIX);
    LIBS.translateZ(VIEWMATRIX, cameraPosition[2]);
    LIBS.translateY(VIEWMATRIX, cameraPosition[1]);
    LIBS.rotateX(VIEWMATRIX, Math.PI/6+PHI);
    GL.uniformMatrix4fv(_Vmatrix, false, VIEWMATRIX);

    SPHERES.map(function(sphere, sphereIndex) {
      if (sphereIndex===VIEWINGVIDEOINDEX) {
        GL.uniform1f(_viewingCoeffVS, VIEWINGVIDEO_T);
        GL.uniform1f(_viewingCoeffFS, VIEWINGVIDEO_T);

        if ( VIEWINGVIDEO && VIEWINGVIDEO_T<1) VIEWINGVIDEO_T+=0.05;
        if (!VIEWINGVIDEO && VIEWINGVIDEO_T>0) VIEWINGVIDEO_T-=0.05;

        GL.uniform1f(_aspectRatio, (sphere.video.videoHeight*CANVAS.width)/(CANVAS.height*sphere.video.videoWidth));
      }

      GL.uniform1f(_highLight, (RAYINTERSECT && SPHEREINTERSECTED===sphereIndex)?1.5:1);
      LIBS.set_I4(sphere.matrix);
      LIBS.translateX(sphere.matrix, radius*Math.cos(sphere.angle+THETA));
      LIBS.translateZ(sphere.matrix, radius*Math.sin(sphere.angle+THETA));

      GL.uniformMatrix4fv(_Mmatrix, false, sphere.matrix); //update sphere movement matrix
      GL.bindTexture(GL.TEXTURE_2D, sphere.videoTexture);  //bind video texture

      if (sphere.video.currentTime>0 && sphere.video.currentTime!==sphere.oldTime) {
        //update video texture
        sphere.oldTime=sphere.video.currentTime;
        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, sphere.video);
      }
      GL.drawElements(GL.TRIANGLES, nVertices, GL.UNSIGNED_SHORT, 0);
      if (sphereIndex===VIEWINGVIDEOINDEX) {
        GL.uniform1f(_viewingCoeffVS, 0);
        GL.uniform1f(_viewingCoeffFS, 0);
      }

    }); //end SPHERES.map

    GL.flush();
    window.requestAnimationFrame(animate);
  };
  animate(0);
};