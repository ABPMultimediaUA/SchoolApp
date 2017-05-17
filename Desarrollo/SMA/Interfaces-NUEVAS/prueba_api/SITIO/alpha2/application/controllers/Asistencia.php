<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic asistencia interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Asistencia extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('asistencia_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['asistencia_get']['limit'] = 500; // 500 requests per hour per asistencia/key
        $this->methods['asistencia_post']['limit'] = 100; // 100 requests per hour per asistencia/key
        $this->methods['asistencia_delete']['limit'] = 50; // 50 requests per hour per asistencia/key
    }

    public function asistencia_get()
    {
        // asistencia from a data store e.g. database
       /* $asistencia = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id'); if($id==NULL){$id =  $this->get('idAsistencia');}
        $idAlumno = $this->get('idAlumno');
        $fecha = $this->get('fecha');
		$idCurso = $this->get('idCurso');
		$idProfesor = $this->get('idProfesor');
		$idAsignatura = $this->get('idAsignatura');
		$justificantes = $this->get('justificantes');

		if($idProfesor != NULL && $justificantes!= NULL &&$justificantes )
		{
			$res = $this->asistencia_model->get_justificantesByProfesor($idProfesor);
			if (!empty($res))
            {
                $this->response($res, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else{
                $this->response([
                    'status' => FALSE,
                    'message' => 'No hay coincidencias'
                ], REST_Controller::HTTP_NOT_FOUND);
            }

		}

		else if($idCurso != NULL && $idAsignatura!= NULL && $fecha!=NULL)
		{
			$retrieved = $fecha;
            $date = DateTime::createFromFormat('dmY', $retrieved);
            $fecha = $date->format('Y-m-d');
            $pattern = '/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/';

			if(!preg_match($pattern, $fecha))
			{
				// Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'wrong syntax'
                ], REST_Controller::HTTP_BAD_REQUEST); // NOT_FOUND (404) being the HTTP response code
			}

            $asistencias = $this->asistencia_model->get_listaAsistencias($idAsignatura, $idCurso, $fecha);
			if (!empty($asistencias))
            {
                $this->response($asistencias, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else{
                $this->response([
                    'status' => FALSE,
                    'message' => 'No hay coincidencias'
                ], REST_Controller::HTTP_NOT_FOUND);
            }
		}

        else if($fecha!=NULL && $idAlumno!=NULL)
        {
            $retrieved = $fecha;
            $date = DateTime::createFromFormat('dmY', $retrieved);
            $fecha = $date->format('Y-m-d');
            $pattern = '/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/';

            if(!preg_match($pattern, $fecha))
                {
                     // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'wrong syntax'
                ], REST_Controller::HTTP_BAD_REQUEST); // NOT_FOUND (404) being the HTTP response code
                }

            $asistencias = $this->asistencia_model->get_asistenciasByAlumnoYFecha($idAlumno, $fecha);
             if (!empty($asistencias))
            {
                $this->output->set_output(json_encode($asistencias), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else{
                $this->response([
                    'status' => FALSE,
                    'message' => 'No hay coincidencias'
                ], REST_Controller::HTTP_NOT_FOUND);
            }


        }

        // If the id parameter doesn't exist return all the asistencia

        if ($id === NULL && $idAlumno === NULL && $fecha ===NULL && $idProfesor === NULL)
        {


            $asistencia = $this->asistencia_model->get_asistencia();

            // Check if the asistencia data store contains asistencia (in case the database result returns NULL)
            if ($asistencia)
            {
                // Set the response and exit
                $this->response($asistencia, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No asistencia were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular asistencia.
        else if($id != NULL){
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the asistencia from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $asistencia = $this->asistencia_model->get_asistencia($id);

            if (!empty($asistencia))
            {
                foreach ($asistencia as $key => $value)
                {
                    if (isset($value['idAsistencia']) && $value['idAsistencia'] === $id)
                    {
                        $asistencia = $value;
                    }
                }
            }

            if (!empty($asistencia))
            {
                $this->response(json_encode($asistencia), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->response([
                    'status' => FALSE,
                    'message' => 'asistencia could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

         else if($idAlumno != NULL && $fecha === NULL)
        {
             $idAlumno = (int) $idAlumno;

            // Validate the id.
            if ($idAlumno <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

             $asistencia = $this->asistencia_model->get_asistenciaByAlumno($idAlumno);

             if (!empty($asistencia))
            {
				$nuevoarray=[];
				if($justificantes)
				{
					foreach($asistencia as $element)
					{
						if(isset($element['justificante'])&&$element['justificante']!=NULL) array_push($nuevoarray, $element);
					}
					$asistencia = $nuevoarray;
				}
                $this->response(json_encode($asistencia), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }


        }



    }

    public function asistencia_post()
    {
        $res=$this->asistencia_model->post_asistencia($this->post());
			if($res)
				$this->response($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
			else
				$this->response(array('status'=>FALSE, 'message'=>"Esta falta de asistencia ya existe"), REST_Controller::HTTP_BAD_REQUEST); // CREATED (201) being the HTTP response code
    }

    public function asistencia_delete()
    {
	   $idAlumno = $this->get('idAlumno');
	   $fecha = $this->get('fecha');
	   $idCurso = $this->get('idCurso');
	   $idAsignatura = $this->get('idAsignatura');
	   $idProfesor = $this->get('idProfesor');


	   $retrieved = $fecha;
	   $date = DateTime::createFromFormat('dmY', $retrieved);
	   $fecha = $date->format('Y-m-d');

	   $data = array('idAlumno'=>$idAlumno, 'idProfesor'=>$idProfesor, 'idCurso'=>$idCurso, 'idAsignatura'=>$idAsignatura, 'fecha'=>$fecha);


        $message =  $this->asistencia_model->delete_asistencia($data);

        if(empty($message)||!$message||$message==NULL)
			$this->response(FALSE, REST_Controller::HTTP_BAD_REQUEST); // NO_CONTENT (204) being the HTTP response code
        else

           $this->response(array('message'=>$message), REST_Controller::HTTP_OK);

    }

    public function asistencia_put()
    {
                $res = $this->asistencia_model->put_asistencia($this->put());

				if(!$res){$this->response($res, REST_Controller::HTTP_BAD_REQUEST);}

                else $this->response(array("justificante"=>true), REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code

    }

}
