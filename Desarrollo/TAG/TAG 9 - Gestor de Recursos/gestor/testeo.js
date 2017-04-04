var recursillo = new TRecurso(); //TRecurso seria virtual, por lo que esto no se deberia hacer, pero... this is JavaScript :_)
recursillo.getNombre();
recursillo.setNombre("Nuevo nombre");
recursillo.getNombre();

var gestor = new TGestorRecursos();

alert(gestor.recursos.length);


gestor.getRecurso("cabeza.obj", "malla");
////alert(gestor.getRecurso("pong"));
//
////var nuevaMalla = new TRecursoMalla();
//
////nuevaMalla.cargarFichero("resources/dragon.json");
////var nuevaTextura = new TRecursoTextura();
////nuevaTextura.get_texture("resources/dragon.png");
////END TESTING
//