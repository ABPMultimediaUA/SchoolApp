
var LIBS={
  degToRad: function(angulo){
    return(angulo*Math.PI/180);
  },
  
  get_projection: function(angulo, a, zMin, zMax) {
    var tan=Math.tan(LIBS.degToRad(0.5*angulo)),
        A=-(zMax+zMin)/(zMax-zMin),
          B=(-2*zMax*zMin)/(zMax-zMin);
    
    return [
      0.5/tan, 0 ,   0, 0,
      0, 0.5*a/tan,  0, 0,
      0, 0,         A, -1,
      0, 0,         B, 0
    ];
  },
  //Matriz de identidad
  get_I4: function() {
    return [1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1];
  },
  //Movimiento de la matriz de rotación m con angulo angulo alrededor eje X
  rotateX: function(m, angulo) {
    var c=Math.cos(angulo);
    var s=Math.sin(angulo);
    var mv1=m[1], mv5=m[5], mv9=m[9];
    m[1]=m[1]*c-m[2]*s;
    m[5]=m[5]*c-m[6]*s;
    m[9]=m[9]*c-m[10]*s;
    
    m[2]=m[2]*c+mv1*s;
    m[6]=m[6]*c+mv5*s;
    m[10]=m[10]*c+mv9*s;
  },
  //Movimiento de la matriz de rotación m con angulo angulo alrededor eje Y
  rotateY: function(m, angulo) {
    var c=Math.cos(angulo);
    var s=Math.sin(angulo);
    var mv0=m[0], mv4=m[4], mv8=m[8];
    m[0]=c*m[0]+s*m[2];
    m[4]=c*m[4]+s*m[6];
    m[8]=c*m[8]+s*m[10];
    
    m[2]=c*m[2]-s*mv0;
    m[6]=c*m[6]-s*mv4;
    m[10]=c*m[10]-s*mv8;
  },
  //Movimiento de la matriz de rotación m con angulo angulo alrededor eje Z
  rotateZ: function(m, angulo) {
    var c=Math.cos(angulo);
    var s=Math.sin(angulo);
    var mv0=m[0], mv4=m[4], mv8=m[8];
    m[0]=c*m[0]-s*m[1];
    m[4]=c*m[4]-s*m[5];
    m[8]=c*m[8]-s*m[9];
    
    m[1]=c*m[1]+s*mv0;
    m[5]=c*m[5]+s*mv4;
    m[9]=c*m[9]+s*mv8;
  },
  //Matriz de movimento de traslación m en tiempo t a lo largo del eje Z
  translateZ: function(m, t){
    m[14]+=t;
  }
};