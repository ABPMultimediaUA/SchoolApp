<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic comentarios_sobre_el_alumno interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class comentarios_sobre_el_alumno extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('comentarios_sobre_el_alumno_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['comentarios_sobre_el_alumno_get']['limit'] = 500; // 500 requests per hour per comentarios_sobre_el_alumno/key
        $this->methods['comentarios_sobre_el_alumno_post']['limit'] = 100; // 100 requests per hour per comentarios_sobre_el_alumno/key
        $this->methods['comentarios_sobre_el_alumno_delete']['limit'] = 50; // 50 requests per hour per comentarios_sobre_el_alumno/key
    }

    public function comentarios_sobre_el_alumno_get()
    {
        // comentarios_sobre_el_alumno from a data store e.g. database
       /* $comentarios_sobre_el_alumno = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');



        // If the id parameter doesn't exist return all the comentarios_sobre_el_alumno

        if ($id === NULL)
        {

            
            $comentarios_sobre_el_alumno = $this->comentarios_sobre_el_alumno_model->get_comentarios_sobre_el_alumno();

            // Check if the comentarios_sobre_el_alumno data store contains comentarios_sobre_el_alumno (in case the database result returns NULL)
            if ($comentarios_sobre_el_alumno)
            {
                // Set the response and exit
                $this->response($comentarios_sobre_el_alumno, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No comentarios_sobre_el_alumno were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular comentarios_sobre_el_alumno.
        else {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the comentarios_sobre_el_alumno from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $comentarios_sobre_el_alumno = $this->comentarios_sobre_el_alumno_model->get_comentarios_sobre_el_alumno($id);

            if (!empty($comentarios_sobre_el_alumno))
            {
                foreach ($comentarios_sobre_el_alumno as $key => $value)
                {
                    if (isset($value['idComentarios_sobre_el_alumno']) && $value['idComentarios_sobre_el_alumno'] === $id)
                    {
                        $comentarios_sobre_el_alumno = $value;
                    }
                }
            }

            if (!empty($comentarios_sobre_el_alumno))
            {   
                $this->output->set_output(json_encode($comentarios_sobre_el_alumno), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->output->set_output([
                    'status' => FALSE,
                    'message' => 'comentarios_sobre_el_alumno could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }

    public function comentarios_sobre_el_alumno_post()
    {
         $exp=$this->comentarios_sobre_el_alumno_model->post_comentarios_sobre_el_alumno($this->post());
            if($exp==1){$exp="Comentario added to database ";}
            //else{$exp="El chat indicado ya existe o no es valido.";}
            $this->output->set_output($exp, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
    }

    public function comentarios_sobre_el_alumno_delete()
    {
        $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        
        $message =  $this->comentarios_sobre_el_alumno_model->delete_comentarios_sobre_el_alumno($id);

        if($message!=1 && $message!=true)
        $this->set_response($message, REST_Controller::HTTP_BAD_REQUEST); // NO_CONTENT (204) being the HTTP response code
        else
           $this->set_response($message, REST_Controller::HTTP_OK); 
    }

    public function comentarios_sobre_el_alumno_put()
    {
                $res = $this->comentarios_sobre_el_alumno_model->put_comentarios_sobre_el_alumno($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
            
    }

}
