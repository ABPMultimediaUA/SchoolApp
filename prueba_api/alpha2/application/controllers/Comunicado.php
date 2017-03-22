<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic comunicado interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Comunicado extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('comunicado_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['comunicado_get']['limit'] = 500; // 500 requests per hour per comunicado/key
        $this->methods['comunicado_post']['limit'] = 100; // 100 requests per hour per comunicado/key
        $this->methods['comunicado_delete']['limit'] = 50; // 50 requests per hour per comunicado/key
    }

    public function comunicado_get()
    {
        // comunicado from a data store e.g. database
       /* $comunicado = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');
        $userAlumno = $this->get('user');
        $idProfesor = $this->get('idProfesor');
        
        if($userAlumno != NULL )
        {
            $comunicados=$this->comunicado_model->get_comunicadoByAlumno($userAlumno);
            $this->set_response($comunicados, REST_Controller::HTTP_OK);
        }

        if($idProfesor != NULL )
        {
            $comunicados=$this->comunicado_model->get_comunicadoByProfesor($idProfesor);
            $this->set_response($comunicados, REST_Controller::HTTP_OK);
        }


        // If the id parameter doesn't exist return all the comunicado

        if ($id === NULL)
        {

            
            $comunicado = $this->comunicado_model->get_comunicado();

            // Check if the comunicado data store contains comunicado (in case the database result returns NULL)
            if ($comunicado)
            {
                // Set the response and exit
                $this->response($comunicado, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No comunicado were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular comunicado.
        else {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the comunicado from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $comunicado = $this->comunicado_model->get_comunicado($id);

            if (!empty($comunicado))
            {
                foreach ($comunicado as $key => $value)
                {
                    if (isset($value['idComunicado']) && $value['idComunicado'] === $id)
                    {
                        $comunicado = $value;
                    }
                }
            }

            if (!empty($comunicado))
            {   
                $this->output->set_output(json_encode($comunicado), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->output->set_output([
                    'status' => FALSE,
                    'message' => 'comunicado could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }

    public function comunicado_post()
    {
        $exp=$this->comunicado_model->post_comunicado($this->post());
            if($exp==1){$exp="Comunicado added to database ";}
            //else{$exp="El chat indicado ya existe o no es valido.";}
            $this->output->set_output($exp, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
    }

    public function comunicado_delete()
    {
        $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        
        $message =  $this->comunicado_model->delete_comunicado($id);

        if($message!=1 && $message!=true)
        $this->set_response($message, REST_Controller::HTTP_BAD_REQUEST); // NO_CONTENT (204) being the HTTP response code
        else
           $this->set_response($message, REST_Controller::HTTP_OK); 
    }

    public function comunicado_put()
    {
                $res = $this->comunicado_model->put_comunicado($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
            
    }

}
