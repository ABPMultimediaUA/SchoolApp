<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic administrador interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Administrador extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('administrador_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['administrador_get']['limit'] = 500; // 500 requests per hour per administrador/key
        $this->methods['administrador_post']['limit'] = 100; // 100 requests per hour per administrador/key
        $this->methods['administrador_delete']['limit'] = 50; // 50 requests per hour per administrador/key
    }

    public function administrador_get()
    {
        // administrador from a data store e.g. database
       /* $administrador = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');



        // If the id parameter doesn't exist return all the administrador

        if ($id === NULL)
        {

            
            $administrador = $this->administrador_model->get_administrador();

            // Check if the administrador data store contains administrador (in case the database result returns NULL)
            if ($administrador)
            {
                // Set the response and exit
                $this->response($administrador, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No administrador were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular administrador.
        else {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the administrador from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $administrador = $this->administrador_model->get_administrador($id);

            if (!empty($administrador))
            {
                foreach ($administrador as $key => $value)
                {
                    if (isset($value['idAdministrador']) && $value['idAdministrador'] === $id)
                    {
                        $administrador = $value;
                    }
                }
            }

            if (!empty($administrador))
            {   
                $this->output->set_output(json_encode($administrador), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->set_response([
                    'status' => FALSE,
                    'message' => 'administrador could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }

    public function administrador_post()
    {
        
        $idAdmin = $this->administrador_model->get_idAdministrador($this->post('idAdministrador'));
        if($idAdmin!="")
        {
             $this->output->set_output("El administrador indicado ya existe en la base de datos", REST_Controller::HTTP_BAD_REQUEST);
        }
        else{

            $this->administrador_model->post_administrador($this->post());

            $this->output->set_output("Administrador added to database", REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
        }
    }

    public function administrador_delete()
    {
        $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        
        $message =  $this->administrador_model->delete_administrador($id);

        if($message!=1 && $message!=true)
        $this->set_response($message, REST_Controller::HTTP_BAD_REQUEST); // NO_CONTENT (204) being the HTTP response code
        else
           $this->set_response($message, REST_Controller::HTTP_OK); 
    
    }

     public function administrador_put()
    {
                $res = $this->administrador_model->put_administrador($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
            
    }

    

}
