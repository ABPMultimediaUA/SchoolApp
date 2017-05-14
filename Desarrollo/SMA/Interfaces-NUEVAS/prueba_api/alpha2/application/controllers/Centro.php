<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic centro interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Centro extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('centro_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['centro_get']['limit'] = 500; // 500 requests per hour per centro/key
        $this->methods['centro_post']['limit'] = 100; // 100 requests per hour per centro/key
        $this->methods['centro_delete']['limit'] = 50; // 50 requests per hour per centro/key
    }

    public function centro_get()
    {
        // centro from a data store e.g. database
       /* $centro = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');



        // If the id parameter doesn't exist return all the centro

        if ($id === NULL)
        {

            
            $centro = $this->centro_model->get_centro();

            // Check if the centro data store contains centro (in case the database result returns NULL)
            if ($centro)
            {
                // Set the response and exit
                $this->response($centro, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No centro were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular centro.
        else {


            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }


            // Get the centro from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $centro = $this->centro_model->get_centro($id);

            if (!empty($centro))
            {
                foreach ($centro as $key => $value)
                {
                    if (isset($value['idCentro']) && $value['idCentro'] === $id)
                    {
                        $centro = $value;
                    }
                }
            }

            if (!empty($centro))
            {   
                $this->output->set_output(json_encode($centro), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->output->set_output([
                    'status' => FALSE,
                    'message' => 'centro could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }

    public function centro_post()
    {

        $tipo = $this->centro_model->get_tipocentro($this->post('TipoCentro_tipo'));
        $admin = $this->centro_model->get_administrador($this->post('Administrador_idAdministrador'));
        $idCentro = $this->centro_model->get_idCentro($this->post('idCentro'));
        $respuestaError=[];


        if($tipo == "")
            {
                array_push($respuestaError,['tipo' => "El tipo de centro indicado no existe. "]);
            }

        if($admin == "")
            {
                array_push($respuestaError,['admin' => "El numero de ID de administrador indicado no existe. "]);
            }

        if($idCentro != "")
            {
                array_push($respuestaError,['admin' => "El numero de ID de centro indicado ya existe en la base de datos. "]);
            }

        if(count($respuestaError)>=1)
            {
                    $this->output->set_output(json_encode($respuestaError), REST_Controller::HTTP_BAD_REQUEST); 
            }

            else
            {
      

        $this->centro_model->post_centro($this->post());

        $this->output->set_output("Centro added to database", REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
    }
    }

    public function centro_delete()
    {
        $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        
        $message =  $this->centro_model->delete_centro($id);

        if($message!=1 && $message!=true)
        $this->set_response($message, REST_Controller::HTTP_BAD_REQUEST); // NO_CONTENT (204) being the HTTP response code
        else
           $this->set_response($message, REST_Controller::HTTP_OK); 
    }

    public function centro_put()
    {
                $res = $this->centro_model->put_centro($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
            
    }

}
