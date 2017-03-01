<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic mencion interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Mencion extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('mencion_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['mencion_get']['limit'] = 500; // 500 requests per hour per mencion/key
        $this->methods['mencion_post']['limit'] = 100; // 100 requests per hour per mencion/key
        $this->methods['mencion_delete']['limit'] = 50; // 50 requests per hour per mencion/key
    }

    public function mencion_get()
    {
        // mencion from a data store e.g. database
       /* $mencion = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');



        // If the id parameter doesn't exist return all the mencion

        if ($id === NULL)
        {

            
            $mencion = $this->mencion_model->get_mencion();

            // Check if the mencion data store contains mencion (in case the database result returns NULL)
            if ($mencion)
            {
                // Set the response and exit
                $this->response($mencion, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No mencion were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular mencion.
        else {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the mencion from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $mencion = $this->mencion_model->get_mencion($id);

            if (!empty($mencion))
            {
                foreach ($mencion as $key => $value)
                {
                    if (isset($value['idMencion']) && $value['idMencion'] === $id)
                    {
                        $mencion = $value;
                    }
                }
            }

            if (!empty($mencion))
            {   
                $this->output->set_output(json_encode($mencion), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->output->set_output([
                    'status' => FALSE,
                    'message' => 'mencion could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }

    public function mencion_post()
    {
       

        $res=$this->mencion_model->post_mencion($this->post());
        if($res==1){$res="Mencion added to database";}
        $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
    
    }

    public function mencion_delete()
    {
         $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        $message=$this->mencion_model->delete_mencion($id);
        /*$message = [
            'id' => $id,
            'message' => 'Deleted the resource'
        ];*/
        if($message!=true){$message="Error";}
        $this->output->set_output(json_encode($message), REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code
    }

public function mencion_put()
    {
                $res = $this->mencion_model->put_mencion($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
            
    }

}
