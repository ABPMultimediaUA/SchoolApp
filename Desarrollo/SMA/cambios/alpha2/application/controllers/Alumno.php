<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic alumno interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Alumno extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('alumno_model');
		$this->load->model('centro_model');
		$this->load->model('curso_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['alumno_get']['limit'] = 500; // 500 requests per hour per alumno/key
        $this->methods['alumno_post']['limit'] = 100; // 100 requests per hour per alumno/key
        $this->methods['alumno_delete']['limit'] = 50; // 50 requests per hour per alumno/key
    }

    public function alumno_get()
    {



        $id = $this->get('id');

        $nombre = $this->get('nombre');

        $user = $this->get('usuario');

        $curso= $this->get('curso');

        $datosCurso = $this->get('datoscurso');

        $asignaturas = $this->get('asignaturas');

		$tarea = $this->get('idTarea');

		$idAsignatura = $this->get('idAsignatura');
		$idCurso = $this->get('idCurso');
		$idCentro = $this->get('idCentro');
		$padres = $this->get('padres');




        // If the id parameter doesn't exist return all the alumno
		if($padres != NULL && $id != NULL )
		{
			$padres = $this->alumno_model->get_padresByAlumno($id);
			 if (!empty($padres))
            {
                // Set the response and exit
                $this->response($padres, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No padres were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
		}
		else if($idCentro!=NULL && $idCurso!=NULL)
		{
			$alumnos = $this->alumno_model->get_alumnoByCentroByCurso($idCentro, $idCurso);
			 if (!empty($alumnos))
            {
                // Set the response and exit
                $this->response($alumnos, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No alumno were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
		}

		else if($idAsignatura!=NULL && $idCurso!=NULL)
		{
			$alumnos = $this->alumno_model->get_alumnoByAsignaturaByCurso($idAsignatura, $idCurso);
			 if (!empty($alumnos))
            {
                // Set the response and exit
                $this->response($alumnos, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No alumno were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
		}

		else if($tarea!=NULL)
		{
			$alumnos = $this->alumno_model->get_alumnosByTarea($tarea);

            // Check if the alumno data store contains alumno (in case the database result returns NULL)
            if ($alumnos)
            {
                // Set the response and exit
                $this->response($alumnos, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No alumno were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
		}

       else if ($id == NULL && $nombre ==NULL && $user == NULL && $curso == NULL && $idCentro==NULL && $idCurso==NULL)
        {


            $alumno = $this->alumno_model->get_alumno();

            // Check if the alumno data store contains alumno (in case the database result returns NULL)
            if ($alumno)
            {
                // Set the response and exit
                $this->response($alumno, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No alumno were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular alumno.
        else if ($id != NULL && $nombre ===NULL && $user == NULL ) {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the alumno from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $alumno = $this->alumno_model->get_alumno($id, $datosCurso, $asignaturas);


            if (!empty($alumno))
            {
                $this->response($alumno, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->set_response([
                    'status' => FALSE,
                    'message' => 'alumno could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        else if ($id === NULL && $nombre != NULL && $user == NULL)
        {


            // Validate the id.
            if (!preg_match("/^\w+$/", $nombre))
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the alumno from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $alumno = $this->alumno_model->get_alumnoByName($nombre);

            if (!empty($alumno))
            {
                foreach ($alumno as $key => $value)
                {
                    if (isset($value['nombre']) && $value['nombre'] === $nombre)
                    {
                        $alumno = $value;
                    }
                }
            }

            if (!empty($alumno))
            {
                $this->set_response($alumno, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->set_response([
                    'nombre' => $nombre,
                    'status' => FALSE,
                    'message' => 'alumno could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        else if (isset($user) && $user != NULL && $id == NULL && $nombre == NULL)
        {
        	// Validate the id.
             if (!preg_match('/^[^<>()[\].,;:\s@"]+(?:\.[^<>()[\].,;:\s@"]+)*@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i', $user))
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the alumno from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $alumno = $this->alumno_model->get_alumnoByUserName($user);

            if (!empty($alumno))
            {
                foreach ($alumno as $key => $value)
                {
                    if (isset($value['user']) && $value['user'] === $user)
                    {
                        $alumno = $value;
                    }
                }
            }

            if (!empty($alumno))
            {
                $this->response($alumno, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->set_response([
                    'usuario' => $user,
                    'status' => FALSE,
                    'message' => 'alumno could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

		else if ($curso != NULL)
        {
        	// Validate the id.
             if (!preg_match('/^[^<>()[\].,;:\s@"]+(?:\.[^<>()[\].,;:\s@"]+)*@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i', $user))
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the alumno from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $alumno = $this->alumno_model->get_alumnosByCurso($curso);

            if (!empty($alumno))
            {
                foreach ($alumno as $key => $value)
                {
                    if (isset($value['user']) && $value['user'] === $user)
                    {
                        $alumno = $value;
                    }
                }
            }

            if (!empty($alumno))
            {
                $this->set_response($alumno, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->set_response([
                    'usuario' => $curso,
                    'status' => FALSE,
                    'message' => 'alumnos could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }



    public function alumno_post()
    {
        //$numExp = $this->expediente_model->get_expediente($this->post('InformeAlumno_numExpediente'));
       /* $idCurso = $this->curso_model->get_curso($this->post('idCurso'));
        $idCentro = $this->centro_model->get_centro($this->post('idCentro'));
        $respuestaError=[];

       /* if($numExp == "")
            {
                array_push($respuestaError,"El numero de expediente indicado no existe. ");
            }

        if($idCurso == "")
            {
                array_push($respuestaError,"El numero de ID de Curso indicado no existe. ");
            }

        if($idCentro == "")
            {
                array_push($respuestaError,"El numero de ID de Centro indicado no existe. ");
            }

        if(count($respuestaError)>=1)
            {
                    $this->response($respuestaError, REST_Controller::HTTP_BAD_REQUEST);
            }
            else
            {*/


                $res = $this->alumno_model->post_alumno($this->post());

				if(!empty($res) && $res!=NULL && $res){
					$this->response($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
				} else{$this->response(['status'=>"FAIL"], REST_Controller::HTTP_CREATED);}
           // }
    }

    public function alumno_put()
    {
                $res = $this->alumno_model->put_alumno($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code

    }

    public function alumno_delete()
    {
        $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }


        $message =  $this->alumno_model->delete_alumno($id);

        if($message!=1 && $message!=true)
        $this->set_response($message, REST_Controller::HTTP_BAD_REQUEST); // NO_CONTENT (204) being the HTTP response code
        else
           $this->output->set_output(json_encode($message), REST_Controller::HTTP_OK);
    }



}
