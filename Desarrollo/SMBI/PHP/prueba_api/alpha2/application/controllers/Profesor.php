<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic profesor interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Profesor extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('profesor_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['profesor_get']['limit'] = 500; // 500 requests per hour per profesor/key
        $this->methods['profesor_post']['limit'] = 100; // 100 requests per hour per profesor/key
        $this->methods['profesor_delete']['limit'] = 50; // 50 requests per hour per profesor/key
    }

    public function profesor_get()
    {
        // profesor from a data store e.g. database
       /* $profesor = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');
        $user = $this->get('usuario');


        // If the id parameter doesn't exist return all the profesor

        if ($id === NULL && $user === NULL)
        {

            
            $profesor = $this->profesor_model->get_profesor();

            // Check if the profesor data store contains profesor (in case the database result returns NULL)
            if ($profesor)
            {
                // Set the response and exit
                $this->response($profesor, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No profesor were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular profesor.
        else {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the profesor from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $profesor = $this->profesor_model->get_profesor($id);

            if (!empty($profesor))
            {
                foreach ($profesor as $key => $value)
                {
                    if (isset($value['idProfesor']) && $value['idProfesor'] === $id)
                    {
                        $profesor = $value;
                    }
                }
            }

            if (!empty($profesor))
            {   $profesor[0]=$profesor;
                $this->output->set_output(json_encode($profesor[0]), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }

            else if ($user != NULL)
        {
            // Validate the id.
             if (!preg_match('/^[^<>()[\].,;:\s@"]+(?:\.[^<>()[\].,;:\s@"]+)*@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i', $user))
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the profesor from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $profesor = $this->profesor_model->get_profesorByUserName($user);

            if (!empty($profesor))
            {
                foreach ($profesor as $key => $value)
                {
                    if (isset($value['user']) && $value['user'] === $user)
                    {
                        $profesor = $value;
                    }
                }
            }

            if (!empty($profesor))
            {   $profesor[0]=$profesor;
                $this->set_response($profesor, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->set_response([
                    'usuario' => $user,
                    'status' => FALSE,
                    'message' => 'profesor could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

            else
            {
                $this->output->set_output([
                    'status' => FALSE,
                    'message' => 'profesor could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }

    public function profesor_post()
    {
        
        $idProfesor = $this->profesor_model->get_idProfesor($this->post('idProfesor'));
        if($idProfesor!="")
        {
             $this->output->set_output("El profesor indicado ya existe en la base de datos", REST_Controller::HTTP_BAD_REQUEST);
        }
        else{
            $this->profesor_model->post_profesor($this->post());

            $this->output->set_output("Profesor added to database", REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
        }
    }

    public function profesor_delete()
    {
        $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        $message=$this->profesor_model->delete_profesor($id);
        /*$message = [
            'id' => $id,
            'message' => 'Deleted the resource'
        ];*/
        if($message!=true){$message="Error";}
        $this->output->set_output(json_encode($message), REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code
    }

    public function profesor_put()
    {
                $res = $this->profesor_model->put_profesor($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
            
    }

}
