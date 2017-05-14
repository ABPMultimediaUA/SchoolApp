<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

/*
| -------------------------------------------------------------------------
| Sample REST API Routes
| -------------------------------------------------------------------------
*/
$route['alumno/(:num)'] = 'alumno/id/$1'; // Example 4
//$route['alumno/([a-zA-Z0-9_-]+)(.*)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'alumno/nombre/$1/apellidos/$3$4'; // Example 4
$route['alumno/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'alumno/id/$1/format/$3$4'; 
$route['alumno']['post'] = 'alumno'; 
// Example 8
$route['padre/(:num)']['get'] = 'padre/id/$1'; // Example 4
$route['padre/(:num)(\.)([a-zA-Z0-9_-]+)(.*)']['get'] = 'padre/id/$1/format/$3$4'; 
$route['padre']['post'] = 'padre'; // Example 4 // 

$route['user']= 'user'; // Example 4
$route['user/(:num)(\.)([a-zA-Z0-9_-]+)(.*)']['get'] = 'padre/id/$1/format/$3$4'; 

$route['profesor/(:num)'] = 'profesor/id/$1'; // Example 4
$route['profesor/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'profesor/id/$1/format/$3$4'; 
$route['profesor']['post'] = 'profesor'; // Example 4 // 

$route['administrador/(:num)'] = 'administrador/id/$1'; // Example 4
$route['administrador/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'administrador/id/$1/format/$3$4'; 
$route['administrador']['post'] = 'administrador'; // Example 4 // 

$route['asignatura/(:num)'] = 'asignatura/id/$1'; // Example 4
$route['asignatura/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'asignatura/id/$1/format/$3$4'; 
$route['asignatura']['post'] = 'asignatura'; // Example 4 // 

$route['asistencia/(:num)'] = 'asistencia/id/$1'; // Example 4
$route['asistencia/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'asistencia/id/$1/format/$3$4'; 
$route['asistencia']['post'] = 'asistencia'; // Example 4 // 

$route['asignatura_has_curso/(:num)'] = 'asignatura_has_curso/id/$1'; // Example 4
$route['asignatura_has_curso/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'asignatura_has_curso/id/$1/format/$3$4'; 
$route['asignatura_has_curso']['post'] = 'asignatura_has_curso'; // Example 4 // 

$route['asignatura_has_curso_has_alumno/(:num)'] = 'asignatura_has_curso_has_alumno/id/$1'; // Example 4
$route['asignatura_has_curso_has_alumno/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'asignatura_has_curso_has_alumno/id/$1/format/$3$4'; 
$route['asignatura_has_curso_has_alumno']['post'] = 'asignatura_has_curso_has_alumno'; // Example 4 // 

$route['centro/(:num)'] = 'centro/id/$1'; // Example 4
$route['centro/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'centro/id/$1/format/$3$4'; 
$route['centro']['post'] = 'centro'; // Example 4 // 

$route['chat/(:num)'] = 'chat/id/$1'; // Example 4
$route['chat/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'chat/id/$1/format/$3$4'; 
$route['chat']['post'] = 'chat'; // Example 4 // 

$route['comentario_alumno/(:num)'] = 'comentario_alumno/id/$1'; // Example 4
$route['comentario_alumno/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'comentario_alumno/id/$1/format/$3$4'; 
$route['comentario_alumno']['post'] = 'comentario_alumno'; // Example 4 // 

$route['comentario_profesor/(:num)'] = 'comentario_profesor/id/$1'; // Example 4
$route['comentario_profesor/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'comentario_profesor/id/$1/format/$3$4'; 
$route['comentario_profesor']['post'] = 'comentario_profesor'; // Example 4 // 

$route['comentarios_sobre_el_alumno/(:num)'] = 'comentarios_sobre_el_alumno/id/$1'; // Example 4
$route['comentarios_sobre_el_alumno/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'comentarios_sobre_el_alumno/id/$1/format/$3$4'; 
$route['comentarios_sobre_el_alumno']['post'] = 'comentarios_sobre_el_alumno'; // Example 4 // 

$route['comunicado/(:num)'] = 'comunicado/id/$1'; // Example 4
$route['comunicado/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'comunicado/id/$1/format/$3$4'; 
$route['comunicado']['post'] = 'comunicado'; // Example 4 // 

$route['curso/(:num)'] = 'curso/id/$1'; // Example 4
$route['curso/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'curso/id/$1/format/$3$4'; 
$route['curso']['post'] = 'curso'; // Example 4 // 

$route['examen/(:num)'] = 'examen/id/$1'; // Example 4
$route['examen/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'examen/id/$1/format/$3$4'; 
$route['examen']['post'] = 'examen'; // Example 4 // 

$route['expediente/(:num)'] = 'expediente/id/$1'; // Example 4
$route['expediente/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'expediente/id/$1/format/$3$4'; 
$route['expediente']['post'] = 'expediente'; // Example 4 // 

$route['foro/(:num)'] = 'foro/id/$1'; // Example 4
$route['foro/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'foro/id/$1/format/$3$4'; 
$route['foro']['post'] = 'foro'; // Example 4 // 

$route['material/(:num)'] = 'material/id/$1'; // Example 4
$route['material/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'material/id/$1/format/$3$4'; 
$route['material']['post'] = 'material'; // Example 4 // 

$route['mencion/(:num)'] = 'mencion/id/$1'; // Example 4
$route['mencion/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'mencion/id/$1/format/$3$4'; 
$route['mencion']['post'] = 'mencion'; // Example 4 // 

$route['mensaje/(:num)'] = 'mensaje/id/$1'; // Example 4
$route['mensaje/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'mensaje/id/$1/format/$3$4'; 
$route['mensaje']['post'] = 'mensaje'; // Example 4 // 

$route['tarea/(:num)'] = 'tarea/id/$1'; // Example 4
$route['tarea/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'tarea/id/$1/format/$3$4'; 
$route['tarea']['post'] = 'tarea'; // Example 4 // 

$route['tipocentro/(:num)'] = 'tipocentro/id/$1'; // Example 4
$route['tipocentro/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'tipocentro/id/$1/format/$3$4'; 
$route['tipocentro']['post'] = 'tipocentro'; // Example 4 // 