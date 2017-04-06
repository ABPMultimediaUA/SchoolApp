<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic foro interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class User extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('alumno_model');
        $this->load->model('profesor_model');
        $this->load->model('padre_model');
        $this->load->model('administrador_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['foro_get']['limit'] = 500; // 500 requests per hour per foro/key
        $this->methods['foro_post']['limit'] = 100; // 100 requests per hour per foro/key
        $this->methods['foro_delete']['limit'] = 50; // 50 requests per hour per foro/key
    }

    public function index_get()
    {
        


        $username = $this->get('username');
        $password = $this->get('password');

            // Validate the id.
            if (!preg_match('/^[^<>()[\].,;:\s@"]+(?:\.[^<>()[\].,;:\s@"]+)*@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i', $username))
            {
                // Invalid id, set the response and exit.
                $this->response("Nombre de usuario no válido", REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the foro from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $user = $this->alumno_model->get_alumnoByUserName($username);
            $tipousuario = "";            

            if($user=="")
            {
                $user = $this->profesor_model->get_profesorByUserName($username);
                if($user=="")
                {
                    $user = $this->administrador_model->get_administradorByUserName($username);
                    if($user=="")
                    {
                         $user = $this->padre_model->get_padreByUserName($username);
                         if($user=="")
                         {
                            $this->set_response("El usuario no existe", REST_Controller::HTTP_NOT_FOUND);
                         }
                         else{
                            $tipousuario = "padre";
                         }
                    }
                    else{
                $tipousuario = "administrador";
                    }
                }
                else{
                $tipousuario = "profesor";
                }
               
            }
            else{
                $tipousuario = "alumno";
            }

            if($user['password'] == $password)
            {   $response = array("usuario"=>$tipousuario);
                $this->set_response($response, REST_Controller::HTTP_OK);
            }
            else
            {
                $this->set_response(FALSE, REST_Controller::HTTP_NOT_FOUND);
            }

           
        
    }

    

   

}
