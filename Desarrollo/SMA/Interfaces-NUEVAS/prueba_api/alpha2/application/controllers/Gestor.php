<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;
 
/**
 * This is an example of a few basic gestor interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Gestor extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('gestor_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['gestor_get']['limit'] = 500; // 500 requests per hour per gestor/key
        $this->methods['gestor_post']['limit'] = 100; // 100 requests per hour per gestor/key
        $this->methods['gestor_delete']['limit'] = 50; // 50 requests per hour per gestor/key
    }

    public function gestor_get()
    {
        // gestor from a data store e.g. database
       /* $gestor = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');

        $user = $this->get('usuario');



        // If the id parameter doesn't exist return all the gestor

        if ($id === NULL && $user === NULL)
        {


            $gestor = $this->gestor_model->get_gestor();

            // Check if the gestor data store contains gestor (in case the database result returns NULL)
            if ($gestor)
            {
                // Set the response and exit
                $this->response($gestor, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No gestor were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

         else if ($user != NULL)
        {
            // Validate the id.
             if (!preg_match('/^[^<>()[\].,;:\s@"]+(?:\.[^<>()[\].,;:\s@"]+)*@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i', $user))
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the gestor from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $gestor = $this->gestor_model->get_gestorByUserName($user);

            if (!empty($gestor))
            {
                foreach ($gestor as $key => $value)
                {
                    if (isset($value['user']) && $value['user'] === $user)
                    {
                        $gestor = $value;
                    }
                }
            }

            if (!empty($gestor))
            {   $gestor[0]=$gestor;
                $this->set_response($gestor, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->set_response([
                    'usuario' => $user,
                    'status' => FALSE,
                    'message' => 'gestor could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular gestor.
        else {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the gestor from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $gestor = $this->gestor_model->get_gestor($id);

            if (!empty($gestor))
            {
                foreach ($gestor as $key => $value)
                {
                    if (isset($value['idGestor']) && $value['idGestor'] === $id)
                    {
                        $gestor = $value;
                    }
                }
            }

            if (!empty($gestor))
            {
                $this->output->set_output(json_encode($gestor), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->set_response([
                    'status' => FALSE,
                    'message' => 'gestor could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }

    public function gestor_post()
    {


           $res =  $this->gestor_model->post_gestor($this->post());

            $this->response($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
        
    }

    public function gestor_delete()
    {
        $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }


        $message =  $this->gestor_model->delete_gestor($id);

        if($message!=1 && $message!=true)
        $this->set_response($message, REST_Controller::HTTP_BAD_REQUEST); // NO_CONTENT (204) being the HTTP response code
        else
           $this->set_response($message, REST_Controller::HTTP_OK);

    }

     public function gestor_put()
    {
                $res = $this->gestor_model->put_gestor($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code

    }



}
