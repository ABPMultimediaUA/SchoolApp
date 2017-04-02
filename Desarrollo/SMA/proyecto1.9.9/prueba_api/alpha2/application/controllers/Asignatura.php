<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic asignatura interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Asignatura extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('asignatura_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['asignatura_get']['limit'] = 500; // 500 requests per hour per asignatura/key
        $this->methods['asignatura_post']['limit'] = 100; // 100 requests per hour per asignatura/key
        $this->methods['asignatura_delete']['limit'] = 50; // 50 requests per hour per asignatura/key
    }

    public function asignatura_get()
    {
        // asignatura from a data store e.g. database
       /* $asignatura = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');
        $idAlumno = $this->get('idAlumno');
		$idProfesor = $this->get('idProfesor');
		$todas = $this->get('todas');



		if($idProfesor != NULL)
        {
            $idProfesor = (int) $idProfesor;
            if($idProfesor>0)
            {
                $res = $this->asignatura_model->get_asignaturasByProfesor($idProfesor);
            }

            if(!empty($res))
            {
                $this->response($res, REST_Controller::HTTP_OK);
            }
            else{
				$this->response([
				   'status' => FALSE,
				   'message' => 'No asignatura were found'
			   ], REST_Controller::HTTP_NOT_FOUND);
            }
        }

        else if($idAlumno != NULL && $id == NULL)
        {
			$idAlumno = (int) $idAlumno;
			if($todas!=NULL && $todas)
			{
				if($idAlumno>0)
				{
					$res = $this->asignatura_model->get_todasAsignaturasByAlumno($idAlumno);

				}
			}

           else if($idAlumno>0)
            {
                $res = $this->asignatura_model->get_asignaturasByAlumno($idAlumno);
            }

            if(!empty($res))
            {
                $this->response($res, REST_Controller::HTTP_OK);
            }
            else{
                 $this->response([
                    'status' => FALSE,
                    'message' => 'No asignatura were found'
                ], REST_Controller::HTTP_NOT_FOUND);
            }
        }

		else if($idAlumno != NULL && $id != NULL)
		{
			$res = $this->asignatura_model->get_asignaturasByAlumno($idAlumno);
			if(!empty($res))
			{
				$item = null;

				foreach($res as $asignatura) {
					if ($id == $asignatura["idAsignatura"]) {
						$item = $asignatura;
						break;
					}
				}
				if($item!=NULL){
			$res = array('nombreProfesor'=>$item["nombreProfesor"], 'idProfesor' => $item["idProfesor"]);

						$this->response($res, REST_Controller::HTTP_OK);
					}}
					else{
						$this->response([
						   'status' => FALSE,
						   'message' => 'No asignatura were found'
					   ], REST_Controller::HTTP_NOT_FOUND);
					}

		}



        // If the id parameter doesn't exist return all the asignatura

        else if ($id === NULL && $idAlumno === NULL)
        {


            $asignatura = $this->asignatura_model->get_asignatura();

            // Check if the asignatura data store contains asignatura (in case the database result returns NULL)
            if ($asignatura)
            {
                // Set the response and exit
                $this->response($asignatura, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No asignatura were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular asignatura.
        else {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the asignatura from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $asignatura = $this->asignatura_model->get_asignatura($id);

            if (!empty($asignatura))
            {
                foreach ($asignatura as $key => $value)
                {
                    if (isset($value['idAsignatura']) && $value['idAsignatura'] === $id)
                    {
                        $asignatura = $value;
                    }
                }
            }

            if (!empty($asignatura))
            {   $asignatura[0]=$asignatura;
                $this->output->set_output(json_encode($asignatura), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->output->set_output(json_encode([
                    'status' => FALSE,
                    'message' => 'Asignatura could not be found'
                ]), REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }

    public function asignatura_post()
    {
       /* $curso = $this->asignatura_model->get_curso($this->post('curso'));
        $idAsignatura = $this->asignatura_model->get_idAsignatura($this->post('idAsignatura'));
        if($curso=="")
        {
            $this->output->set_output("El curso indicado no existe en la base de datos", REST_Controller::HTTP_BAD_REQUEST);
        }

        else if($idAsignatura!="")
        {
            $this->output->set_output("La ID de asignatura indicada ya existe en la base de datos", REST_Controller::HTTP_BAD_REQUEST);
        }

        else
        {


            $this->asignatura_model->post_asignatura($this->post());

            $this->output->set_output("Asignatura added to database", REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
        }*/

        $exp=$this->asignatura_model->post_asignatura($this->post());
            if($exp==1){$exp="Asignatura added to database ";}
            //else{$exp="El numero de expediente indicado ya existe o no es valido.";}
            $this->output->set_output($exp, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
    }

    public function asignatura_delete()
    {
       $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }


        $message =  $this->asignatura_model->delete_asignatura($id);

        if($message!=1 && $message!=true)
        $this->set_response($message, REST_Controller::HTTP_BAD_REQUEST); // NO_CONTENT (204) being the HTTP response code
        else
           $this->set_response($message, REST_Controller::HTTP_OK);
    }

     public function asignatura_put()
    {
                $res = $this->asignatura_model->put_asignatura($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code

    }



}
