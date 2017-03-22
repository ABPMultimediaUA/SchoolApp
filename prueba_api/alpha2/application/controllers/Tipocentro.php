<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic tipocentro interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Tipocentro extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('tipocentro_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['tipocentro_get']['limit'] = 500; // 500 requests per hour per tipocentro/key
        $this->methods['tipocentro_post']['limit'] = 100; // 100 requests per hour per tipocentro/key
        $this->methods['tipocentro_delete']['limit'] = 50; // 50 requests per hour per tipocentro/key
    }

    public function tipocentro_get()
    {
        // tipocentro from a data store e.g. database
       /* $tipocentro = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');



        // If the id parameter doesn't exist return all the tipocentro

        if ($id === NULL)
        {

            
            $tipocentro = $this->tipocentro_model->get_tipocentro();

            // Check if the tipocentro data store contains tipocentro (in case the database result returns NULL)
            if ($tipocentro)
            {
                // Set the response and exit
                $this->response($tipocentro, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No tipocentro were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular tipocentro.
        else {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the tipocentro from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $tipocentro = $this->tipocentro_model->get_tipocentro($id);

            if (!empty($tipocentro))
            {
                foreach ($tipocentro as $key => $value)
                {
                    if (isset($value['tipo']) && $value['tipo'] === $id)
                    {
                        $tipocentro = $value;
                    }
                }
            }

            if (!empty($tipocentro))
            {  
                $this->output->set_output(json_encode($tipocentro), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->output->set_output([
                    'status' => FALSE,
                    'message' => 'tipocentro could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }

    public function tipocentro_post()
    {
        $exp=$this->tipocentro_model->post_tipocentro($this->post());
            if($exp==1){$exp="Tipo de centro added to database ";}
            else{$exp="El tipo de centro indicado ya existe o no es valido.";}
            $this->output->set_output($exp, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
    }

    public function tipocentro_delete()
    {
        $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        $message=$this->tipocentro_model->delete_tipocentro($id);
        /*$message = [
            'id' => $id,
            'message' => 'Deleted the resource'
        ];*/
        if($message!=true){$message="Error";}
        $this->output->set_output(json_encode($message), REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code
    }

    public function tipocentro_put()
    {
                $res = $this->tipocentro_model->put_tipocentro($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
            
    }

}
