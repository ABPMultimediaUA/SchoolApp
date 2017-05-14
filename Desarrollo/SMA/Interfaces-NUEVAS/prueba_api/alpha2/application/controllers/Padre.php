<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic padre interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Padre extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('padre_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['padre_get']['limit'] = 500; // 500 requests per hour per padre/key
        $this->methods['padre_post']['limit'] = 100; // 100 requests per hour per padre/key
        $this->methods['padre_delete']['limit'] = 50; // 50 requests per hour per padre/key
    }

    public function index_get()
    {
        // padre from a data store e.g. database
       /* $padre = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


       $user = $this->get('usuario');
	   $hijos = $this->get('hijos');
	   $id = $this->get('id');
		if($id==NULL &&$this->get('idPadre')!=NULL) $id = $this->get('idPadre');


        // If the id parameter doesn't exist return all the padre

		if($id != NULL && $hijos != NULL && $hijos)
		{
			$hijos = $this->padre_model->get_alumnos($id);
			if (!empty($hijos))
				{
                $this->response($hijos, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
				}

            else{
                $this->response([
                    'status' => FALSE,
                    'message' => 'No hay coincidencias'
                ], REST_Controller::HTTP_NOT_FOUND);
            }
		}

        else if ($id === NULL && $user === NULL)
        {

            
            $padre = $this->padre_model->get_padre();

            // Check if the padre data store contains padre (in case the database result returns NULL)
            if ($padre)
            {
                // Set the response and exit
                $this->response($padre, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No padre were found'
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

            // Get the padre from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $padre = $this->padre_model->get_padreByUserName($user);

            if (!empty($padre))
            {
                foreach ($padre as $key => $value)
                {
                    if (isset($value['user']) && $value['user'] === $user)
                    {
                        $padre = $value;
                    }
                }
            }

            if (!empty($padre))
            {   $padre[0]=$padre;
                $this->set_response($padre, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->set_response([
                    'usuario' => $user,
                    'status' => FALSE,
                    'message' => 'padre could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular padre.
        else {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the padre from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $padre = $this->padre_model->get_padre($id);

            if (!empty($padre))
            {
                foreach ($padre as $key => $value)
                {
                    if (isset($value['idPadre']) && $value['idPadre'] === $id)
                    {
                        $padre = $value;
                    }
                }
            }

            if (!empty($padre))
            {   
                
                $resPadre=$padre;
                $resAlumnos= $this->padre_model->get_alumnos($id);
                array_push($resPadre, array("Hijos"=>$resAlumnos));
                $this->output->set_output(json_encode($resPadre), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->set_response([
                    'status' => FALSE,
                    'message' => 'padre could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }

    public function padre_post()
    {
        


       

         $res = $this->padre_model->post_padre($this->post());

				if(!empty($res) && $res!=NULL && $res){
					$this->response($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
				} else{$this->response(['status'=>"FAIL"], REST_Controller::HTTP_CREATED);}
    
    }

    public function padre_delete()
    {
        $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }


        $message=$this->padre_model->delete_padre($id);
        if($message!=true && $message!=1)
            {
                $this->response($message, REST_Controller::HTTP_BAD_REQUEST); 
            }
        /*$message = [
            'id' => $id,
            'message' => 'Deleted the resource'
        ];*/

        $this->output->set_output(json_encode($message), REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code
    }

    public function padre_put()
    {
                $res = $this->padre_model->put_padre($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
            
    }

}
