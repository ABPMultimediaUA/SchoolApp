<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic asignatura_has_curso_has_alumno interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Asignatura_has_curso_has_alumno extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('asignatura_has_curso_has_alumno_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['asignatura_has_curso_has_alumno_get']['limit'] = 500; // 500 requests per hour per asignatura_has_curso_has_alumno/key
        $this->methods['asignatura_has_curso_has_alumno_post']['limit'] = 100; // 100 requests per hour per asignatura_has_curso_has_alumno/key
        $this->methods['asignatura_has_curso_has_alumno_delete']['limit'] = 50; // 50 requests per hour per asignatura_has_curso_has_alumno/key
    }

    public function asignatura_has_curso_has_alumno_get()
    {
        // asignatura_has_curso_has_alumno from a data store e.g. database
       /* $asignatura_has_curso_has_alumno = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');



        // If the id parameter doesn't exist return all the asignatura_has_curso_has_alumno

        if ($id === NULL)
        {

            
            $asignatura_has_curso_has_alumno = $this->asignatura_has_curso_has_alumno_model->get_asignatura_has_curso_has_alumno();

            // Check if the asignatura_has_curso_has_alumno data store contains asignatura_has_curso_has_alumno (in case the database result returns NULL)
            if ($asignatura_has_curso_has_alumno)
            {
                // Set the response and exit
                $this->response($asignatura_has_curso_has_alumno, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No asignatura_has_curso_has_alumno were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular asignatura_has_curso_has_alumno.
        else {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the asignatura_has_curso_has_alumno from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $asignatura_has_curso_has_alumno = $this->asignatura_has_curso_has_alumno_model->get_asignatura_has_curso_has_alumno($id);

            if (!empty($asignatura_has_curso_has_alumno))
            {
                foreach ($asignatura_has_curso_has_alumno as $key => $value)
                {
                    if (isset($value['tipo']) && $value['tipo'] === $id)
                    {
                        $asignatura_has_curso_has_alumno = $value;
                    }
                }
            }

            if (!empty($asignatura_has_curso_has_alumno))
            {   $asignatura_has_curso_has_alumno[0]=$asignatura_has_curso_has_alumno;
                $this->output->set_output($asignatura_has_curso_has_alumno, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->output->set_output([
                    'status' => FALSE,
                    'message' => 'asignatura_has_curso_has_alumno could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }


    public function asignatura_has_curso_has_alumno_getByAsignatura()
    {
        // asignatura_has_curso_has_alumno from a data store e.g. database
       /* $asignatura_has_curso_has_alumno = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');



        // If the id parameter doesn't exist return all the asignatura_has_curso_has_alumno

        if ($id === NULL)
        {

            
            $asignatura_has_curso_has_alumno = $this->asignatura_has_curso_has_alumno_model->get_asignatura_has_curso_has_alumno();

            // Check if the asignatura_has_curso_has_alumno data store contains asignatura_has_curso_has_alumno (in case the database result returns NULL)
            if ($asignatura_has_curso_has_alumno)
            {
                // Set the response and exit
                $this->response($asignatura_has_curso_has_alumno, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No asignatura_has_curso_has_alumno were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular asignatura_has_curso_has_alumno.
        else {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the asignatura_has_curso_has_alumno from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $asignatura_has_curso_has_alumno = $this->asignatura_has_curso_has_alumno_model->get_asignatura_has_curso_has_alumno($id);

            if (!empty($asignatura_has_curso_has_alumno))
            {
                foreach ($asignatura_has_curso_has_alumno as $key => $value)
                {
                    if (isset($value['tipo']) && $value['tipo'] === $id)
                    {
                        $asignatura_has_curso_has_alumno = $value;
                    }
                }
            }

            if (!empty($asignatura_has_curso_has_alumno))
            {   $asignatura_has_curso_has_alumno[0]=$asignatura_has_curso_has_alumno;
                $this->output->set_output($asignatura_has_curso_has_alumno, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->output->set_output([
                    'status' => FALSE,
                    'message' => 'asignatura_has_curso_has_alumno could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }

  

    public function asignatura_has_curso_has_alumno_post()
    {
        
           
        

            $res=$this->asignatura_has_curso_has_alumno_model->post_asignatura_has_curso_has_alumno($this->post());
            if($res==1){$res="Asignatura_has_curso_has_alumno added to database";}

            $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
        
    }

    public function asignatura_has_curso_has_alumno_delete()
    {
        $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        // $this->some_model->delete_something($id);
        $message = [
            'id' => $id,
            'message' => 'Deleted the resource'
        ];

        $this->output->set_output($message, REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code
    }

    public function asignatura_has_curso_has_alumno_put()
    {
                $res = $this->asignatura_has_curso_has_alumno_model->put_asignatura_has_curso_has_alumno($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
            
    }

}
