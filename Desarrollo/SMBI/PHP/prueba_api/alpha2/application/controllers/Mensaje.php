<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic mensaje interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class mensaje extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('mensaje_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['mensaje_get']['limit'] = 500; // 500 requests per hour per mensaje/key
        $this->methods['mensaje_post']['limit'] = 100; // 100 requests per hour per mensaje/key
        $this->methods['mensaje_delete']['limit'] = 50; // 50 requests per hour per mensaje/key
    }

    public function mensaje_get()
    {
        // mensaje from a data store e.g. database
       /* $mensaje = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');



        // If the id parameter doesn't exist return all the mensaje

        if ($id === NULL)
        {

            
            $mensaje = $this->mensaje_model->get_mensaje();

            // Check if the mensaje data store contains mensaje (in case the database result returns NULL)
            if ($mensaje)
            {
                // Set the response and exit
                $this->response($mensaje, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No mensaje were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular mensaje.
        else {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the mensaje from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $mensaje = $this->mensaje_model->get_mensaje($id);

            if (!empty($mensaje))
            {
                foreach ($mensaje as $key => $value)
                {
                    if (isset($value['idMensaje']) && $value['idMensaje'] === $id)
                    {
                        $mensaje = $value;
                    }
                }
            }

            if (!empty($mensaje))
            {   
                $this->output->set_output(json_encode($mensaje), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->output->set_output([
                    'status' => FALSE,
                    'message' => 'mensaje could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }

    public function mensaje_post()
    {
        
        

        $res= $this->mensaje_model->post_mensaje($this->post());
        if($res==1){$res="Mensaje added to database";}
        $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
    
    }

    public function mensaje_delete()
    {
         $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        $message=$this->mensaje_model->delete_mensaje($id);
        /*$message = [
            'id' => $id,
            'message' => 'Deleted the resource'
        ];*/
        if($message!=true){$message="Error";}
        $this->output->set_output(json_encode($message), REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code
    }

    public function mensaje_put()
    {
                $res = $this->mensaje_model->put_mensaje($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
            
    }

}
