<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic examen interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Examen extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('examen_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['examen_get']['limit'] = 500; // 500 requests per hour per examen/key
        $this->methods['examen_post']['limit'] = 100; // 100 requests per hour per examen/key
        $this->methods['examen_delete']['limit'] = 50; // 50 requests per hour per examen/key
    }

    public function examen_get()
    {
        // examen from a data store e.g. database
       /* $examen = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');
        $idAlumno = $this->get('idAlumno');
        



        if($idAlumno!=NULL && $idAlumno>=0)
        {
            $idAlumno = (int) $idAlumno;
            $examenes = $this->examen_model->get_examenByAlumno();

            if(!empty($examenes))
            {
                $this->response($examenes, REST_Controller::HTTP_OK); 
            }
            else{
                $this->response([
                    'status' => FALSE,
                    'message' => 'No hay coincidencias'
                ], REST_Controller::HTTP_NOT_FOUND); 
            }

        }



        // If the id parameter doesn't exist return all the examen

       else if ($id === NULL && $idAlumno === NULL)
        {

            
            $examen = $this->examen_model->get_examen();

            // Check if the examen data store contains examen (in case the database result returns NULL)
            if ($examen)
            {
                // Set the response and exit
                $this->response($examen, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No examen were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular examen.
        else {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the examen from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $examen = $this->examen_model->get_examen($id);

            if (!empty($examen))
            {
                foreach ($examen as $key => $value)
                {
                    if (isset($value['idExamen']) && $value['idExamen'] === $id)
                    {
                        $examen = $value;
                    }
                }
            }

            if (!empty($examen))
            {   
                $this->output->set_output(json_encode($examen), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->output->set_output([
                    'status' => FALSE,
                    'message' => 'examen could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }

    public function examen_post()
    {
        

        $res=$this->examen_model->post_examen($this->post());
        if($res==1){$res="Examen added to database";}
        $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
    
    }

    public function examen_delete()
    {
         $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        $message=$this->examen_model->delete_examen($id);
        /*$message = [
            'id' => $id,
            'message' => 'Deleted the resource'
        ];*/
        if($message!=true){$message="Error";}
        $this->output->set_output(json_encode($message), REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code
    }

    public function examen_put()
    {
                $res = $this->examen_model->put_examen($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
            
    }

}
