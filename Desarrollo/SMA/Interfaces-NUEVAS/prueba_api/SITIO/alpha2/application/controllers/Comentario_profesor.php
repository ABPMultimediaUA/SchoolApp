<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic comentario_profesor interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Comentario_profesor extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('comentario_profesor_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['comentario_profesor_get']['limit'] = 500; // 500 requests per hour per comentario_profesor/key
        $this->methods['comentario_profesor_post']['limit'] = 100; // 100 requests per hour per comentario_profesor/key
        $this->methods['comentario_profesor_delete']['limit'] = 50; // 50 requests per hour per comentario_profesor/key
    }

    public function comentario_profesor_get()
    {
        // comentario_profesor from a data store e.g. database
       /* $comentario_profesor = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');



        // If the id parameter doesn't exist return all the comentario_profesor

        if ($id === NULL)
        {

            
            $comentario_profesor = $this->comentario_profesor_model->get_comentario_profesor();

            // Check if the comentario_profesor data store contains comentario_profesor (in case the database result returns NULL)
            if ($comentario_profesor)
            {
                // Set the response and exit
                $this->response($comentario_profesor, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No comentario_profesor were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular comentario_profesor.
        else {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the comentario_profesor from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $comentario_profesor = $this->comentario_profesor_model->get_comentario_profesor($id);

            if (!empty($comentario_profesor))
            {
                foreach ($comentario_profesor as $key => $value)
                {
                    if (isset($value['idComentario_profesor']) && $value['idComentario_profesor'] === $id)
                    {
                        $comentario_profesor = $value;
                    }
                }
            }

            if (!empty($comentario_profesor))
            {  
                $this->output->set_output(json_encode($comentario_profesor), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->output->set_output([
                    'status' => FALSE,
                    'message' => 'comentario_profesor could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }

    public function comentario_profesor_post()
    {
         $exp=$this->comentario_profesor_model->post_comentario_profesor($this->post());
            if($exp==1){$exp="Comentario added to database ";}
            //else{$exp="El chat indicado ya existe o no es valido.";}
            $this->output->set_output($exp, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
    }

    public function comentario_profesor_delete()
    {
        $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        
        $message =  $this->comentario_profesor_model->delete_comentario_profesor($id);

        if($message!=1 && $message!=true)
        $this->set_response($message, REST_Controller::HTTP_BAD_REQUEST); // NO_CONTENT (204) being the HTTP response code
        else
           $this->set_response($message, REST_Controller::HTTP_OK); 
    }

    public function comentario_profesor_put()
    {
                $res = $this->comentario_profesor_model->put_comentario_profesor($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
            
    }

}
