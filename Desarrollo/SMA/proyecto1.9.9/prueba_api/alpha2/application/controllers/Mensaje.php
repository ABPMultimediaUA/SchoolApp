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


        $idProfesor = $this->get('idProfesor');
        $idAlumno = $this->get('idAlumno');
        $idPadre = $this->get('idPadre');
		$noleidos = $this->get('noleidos');
		$leidos = $this->get('leidos');


        if($idProfesor != NULL && $idProfesor>=0 && $idAlumno != NULL && $idAlumno >= 0)
        {
            $mensajes = $this->mensaje_model->get_mensajesByProfesorYAlumno($idAlumno, $idProfesor);
            if (!empty($mensajes))
            {
                $this->response($mensajes, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else{
                $this->response([
                    'status' => FALSE,
                    'message' => 'No hay coincidencias'
                ], REST_Controller::HTTP_NOT_FOUND);
            }
        }

		if($idProfesor == NULL  && $idAlumno != NULL && $idAlumno >= 0)
        {


				if($noleidos!=NULL&&$noleidos)
				{
					$mensajesrecibidos = [];
					$mensajes = $this->mensaje_model->get_recibidosByAlumno($idAlumno);
					if (!empty($mensajes))
					{

						foreach($mensajes as $mensaje)
						{
							$i=0;
							foreach($mensaje["Mensajes Profesor"] as $elemento)
							{
								if(isset($elemento["leido"])&&!$elemento["leido"])
								{
									$elemento["NombreProfesor"]=$mensaje["NombreProfesor"];
									array_push($mensajesrecibidos, $elemento);
								}
								$i++;
							}

						}
					}
					$mensajes = $mensajesrecibidos;
				}
				else if($leidos!=NULL && $leidos)
				{
					$mensajesrecibidos = [];
					$mensajes = $this->mensaje_model->get_recibidosByAlumno($idAlumno);
					if (!empty($mensajes))
					{

						foreach($mensajes as $mensaje)
						{
							$i=0;
							foreach($mensaje["Mensajes Profesor"] as $elemento)
							{
								if(isset($elemento["leido"])&&$elemento["leido"])
								{
									$elemento["NombreProfesor"]=$mensaje["NombreProfesor"];
									array_push($mensajesrecibidos, $elemento);
								}
								$i++;
							}

						}
					}
					$mensajes = $mensajesrecibidos;
				}
				else{
					$mensajes = $this->mensaje_model->get_mensajesByAlumno($idAlumno);
				}
				if (!empty($mensajes))
				{
                $this->response($mensajes, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
				}

            else{
                $this->response([
                    'status' => FALSE,
                    'message' => 'No hay coincidencias'
                ], REST_Controller::HTTP_NOT_FOUND);
            }
        }


        else if($idProfesor != NULL && $idProfesor>=0 && $idPadre != NULL && $idPadre >= 0)
        {
            $mensajes = $this->mensaje_model->get_mensajesByProfesorYPadre($idPadre, $idProfesor);
            if (!empty($mensajes))
            {
                $this->response($mensajes, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else{
                $this->response([
                    'status' => FALSE,
                    'message' => 'No hay coincidencias'
                ], REST_Controller::HTTP_NOT_FOUND);
            }
        }

        else{
                $this->response([
                    'status' => FALSE,
                    'message' => 'Párametros erróneos',
                    'idPadre'=> $idPadre,
                    'idAlumno' => $idAlumno,
                    'idProfesor' => $idProfesor
                ], REST_Controller::HTTP_BAD_REQUEST);
            }
    }

    public function mensaje_post()
    {

		if(isset($this->post()['emisor'])){$emisor = $this->post()['emisor'];}
		if(isset($this->post()['receptor'])){$receptor = $this->post()['receptor'];}
		if(isset($this->post()['idAlumno'])){$idAlumno = $this->post()['idAlumno'];}
		if(isset($this->post()['idProfesor'])){$idProfesor = $this->post()['idProfesor'];}
		if(isset($this->post()['idPadre'])){$idPadre = $this->post()['idPadre'];}

		$flujo = NULL;
		$res = FALSE;
		if($emisor!=NULL && $receptor!=NULL)
		{
			$flujo = $emisor."-".$receptor;
			switch($flujo)
			{
				case "al-pro": if($idAlumno!=NULL && $idProfesor!=NULL)$res = $this->mensaje_model->post_mensajeAlPro($this->post());
					break;
				case "pro-al": if($idAlumno!=NULL && $idProfesor!=NULL)$res = $this->mensaje_model->post_mensajeProAl($this->post());
					break;
				case "pro-pa": if($idPadre!=NULL && $idProfesor!=NULL)$res = $this->mensaje_model->post_mensajeProPa($this->post());
					break;
				case "pa-pro": if($idPadre!=NULL && $idProfesor!=NULL)$res = $this->mensaje_model->post_mensajePaPro($this->post());
					break;
				default : $res= $this->mensaje_model->post_mensaje($this->post());
			}
		}
		else{
			$res= $this->mensaje_model->post_mensaje($this->post());
		}
        if($res){$res="Mensaje added to database"; $this->response(['status'=>true, 'message'=>$res], REST_Controller::HTTP_CREATED);}
		else{$res = "Error"; $this->response(['status'=>false, 'message'=>$res], REST_Controller::HTTP_BAD_REQUEST);}


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
				if($res==1){$res="OK";}
                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code

    }

}
