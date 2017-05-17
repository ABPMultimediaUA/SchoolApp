<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic tarea interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Tarea extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('tarea_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['tarea_get']['limit'] = 500; // 500 requests per hour per tarea/key
        $this->methods['tarea_post']['limit'] = 100; // 100 requests per hour per tarea/key
        $this->methods['tarea_delete']['limit'] = 50; // 50 requests per hour per tarea/key
    }

    public function tarea_get()
    {
        // tarea from a data store e.g. database
       /* $tarea = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');
		$hechas = $this->get('hechas');
		$sinhacer = $this->get('sinhacer');
		$idAlumno = $this->get('idAlumno');
		$idCurso = $this->get('idCurso');
		$idAsignatura = $this->get('idAsignatura');
		$alumnos = $this->get('alumnos');
		$idProfesor = $this->get('idProfesor');
		

		if($idProfesor!=NULL)
		{
			$res = $this->tarea_model->get_tareasByProfe($idProfesor);

            // Check if the alumno data store contains alumno (in case the database result returns NULL)
            if ($res)
            {
                // Set the response and exit
                $this->response($res, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No tarea was found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
		}

		else if($idCurso!=NULL && $idAsignatura!=NULL)
		{
			$res = $this->tarea_model->get_alumnosytodastareasByCursoyAsignatura($idCurso, $idAsignatura);

            // Check if the alumno data store contains alumno (in case the database result returns NULL)
            if ($res)
            {
                // Set the response and exit
                $this->response($res, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No tarea was found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }

		}

		else if($idAlumno && $hechas && ($sinhacer==NULL || !$sinhacer))
		{
			$tarea = $this->tarea_model->get_tareasCompletadas($idAlumno);
			if(!empty($tarea)){
				$this->response($tarea, REST_Controller::HTTP_OK);
			}
			else{
				$this->response([
                    'status' => FALSE,
                    'message' => 'No tarea were found'
                ], REST_Controller::HTTP_NOT_FOUND);
			}
		}
		else if($idAlumno && $sinhacer && ($hechas==NULL || !$hechas))
		{
			$tarea = $this->tarea_model->get_tareasNoCompletadas($idAlumno);
			if(!empty($tarea)){
				$this->response($tarea, REST_Controller::HTTP_OK);
			}
			else{
				$this->response([
                    'status' => FALSE,
                    'message' => 'No tarea were found'
                ], REST_Controller::HTTP_NOT_FOUND);
			}
		}



        // If the id parameter doesn't exist return all the tarea

        else if ($id === NULL )
        {


            $tarea = $this->tarea_model->get_tarea();

            // Check if the tarea data store contains tarea (in case the database result returns NULL)
            if ($tarea)
            {
                // Set the response and exit
                $this->response($tarea, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No tarea were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular tarea.
        else {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the tarea from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.
			if( isset($alumnos) && $alumnos)
				$tarea = $this->tarea_model->get_alumnosByTarea($id);
			else
				$tarea = $this->tarea_model->get_tarea($id);


            if (!empty($tarea))
            {
                $this->response($tarea, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->response([
                    'status' => FALSE,
                    'message' => 'tarea could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }

    public function tarea_post()
    {


       $res=$this->tarea_model->post_tarea($this->post());
       if($res){$res=$this->tarea_model->post_alumno_has_tarea(); if($res) $res=["status" => true , "mensaje" => "Tarea added to database"];}
	   if(!$res){
		   $this->response([
				'status' => FALSE,
				'message' => 'Error'
			], REST_Controller::HTTP_BAD_REQUEST);
	   }
	   else{
		   $this->response($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
	   }
    }

    public function tarea_delete()
    {
        $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        $message=$this->tarea_model->delete_tarea($id);
        /*$message = [
            'id' => $id,
            'message' => 'Deleted the resource'
        ];*/
        if($message!=true){$message="Error";}
        $this->output->set_output(json_encode($message), REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code
    }

    public function tarea_put()
    {
                $res = $this->tarea_model->put_tarea($this->put());

				if(!empty($res)){
					$this->response([
                    'status' => TRUE,
                    'message' => 'Correcto'
                ], REST_Controller::HTTP_OK); // CREATED (201) being the HTTP response code
				}
				else{
					$this->response("Datos no válidos" , REST_Controller::HTTP_BAD_REQUEST);
				}
    }

}
