<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic curso interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Curso extends REST_Controller {

	private $anyo;

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('curso_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['curso_get']['limit'] = 500; // 500 requests per hour per curso/key
        $this->methods['curso_post']['limit'] = 100; // 100 requests per hour per curso/key
        $this->methods['curso_delete']['limit'] = 50; // 50 requests per hour per curso/key
    }

    public function curso_get()
    {
        // curso from a data store e.g. database
       /* $curso = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');
		$idAlumno = $this->get('idAlumno');
		$soloanyos = $this->get('soloanyos');
		$idProfesor = $this->get('idProfesor');
		$idCentro = $this->get('idCentro');

		$academicos = $this->get('academicos');

		if($academicos!=NULL)
		{
			$fecha = new DateTime();
			$time = $fecha->getTimestamp();
			//$time = DateTime::getTimeStamp();// here you put timestamp, it also may be strtotime(smth);
			$ayears = [];
			$year = date('Y', $time);
			if(date('n', $time) < 8){
				 $ayear1 = ($year - 1).'-'.$year;
				 $ayear2 = ($year).'-'.($year + 1);
				 $ayear3 = ($year+1).'-'.($year + 2);
				 $ayears = array('ayear1'=>$ayear1,  'ayear2'=>$ayear2, "ayear3"=>$ayear3);
				 }
			else{
				$ayear1 = ($year).'-'.($year + 1);
				$ayear2 = ($year+1).'-'.($year + 2);
				$ayear3 = ($year+2).'-'.($year + 3);
				$ayears = array('ayear1'=>$ayear1,  'ayear2'=>$ayear2, "ayear3"=>$ayear3);
				}

				$this->response($ayears, REST_Controller::HTTP_OK);


		}

		else if($idCentro!=NULL)
		{
			$res = $this->curso_model->get_cursosByCentro($idCentro);

			if(!empty($res))
			{
				$this->response($res, REST_Controller::HTTP_OK);
			}
			else{
				$this->response([
				   'status' => FALSE,
				   'message' => 'No curso were found'
			   ], REST_Controller::HTTP_NOT_FOUND);
			}
		}

		else if($idProfesor!=NULL)
		{
			$res = $this->curso_model->get_cursoByProfesor($idProfesor);

			if(!empty($res))
			{
				$this->response($res, REST_Controller::HTTP_OK);
			}
			else{
				$this->response([
				   'status' => FALSE,
				   'message' => 'No curso were found'
			   ], REST_Controller::HTTP_NOT_FOUND);
			}
		}

		else if($idAlumno != NULL)
		{

			$res = $this->curso_model->get_cursoByAlumno($idAlumno);

			if(!empty($res))
			{
				if($soloanyos)
				{
					$anyoactual = date('Y');
					$anyopasado = date('Y')-1;
					$anyofuturo = date('Y')+1;
					if(date('m')>7){$this->anyo = $anyoactual."-".$anyofuturo;} else{$this->anyo = $anyopasado."-".$anyoactual;}

					function sa($n)
					{
						return(array("anyo"=>$n["curso"]));
					}
					$res = array_map('sa', $res);
					$res2 = [];
					foreach($res as $anyo)
					{
						if($anyo["anyo"]!=$this->anyo)
						{
							array_push($res2, $anyo);
						}
					}

				}
				$this->response($res2, REST_Controller::HTTP_OK);
			}
			else{
				$this->response([
				   'status' => FALSE,
				   'message' => 'No curso were found'
			   ], REST_Controller::HTTP_NOT_FOUND);
			}
		}
		else{

			// If the id parameter doesn't exist return all the curso

			if ($id === NULL)
			{


				$curso = $this->curso_model->get_curso();

				// Check if the curso data store contains curso (in case the database result returns NULL)
				if ($curso)
				{
					// Set the response and exit
					$this->response($curso, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
				}
				else
				{
					// Set the response and exit
					$this->response([
						'status' => FALSE,
						'message' => 'No curso were found'
					], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
				}
			}

			// Find and return a single record for a particular curso.
			else {
				$id = (int) $id;

				// Validate the id.
				if ($id <= 0)
				{
					// Invalid id, set the response and exit.
					$this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
				}

				// Get the curso from the array, using the id as key for retrieval.
				// Usually a model is to be used for this.

				$curso = $this->curso_model->get_curso($id);

				if (!empty($curso))
				{
					foreach ($curso as $key => $value)
					{
						if (isset($value['idCurso']) && $value['idCurso'] === $id)
						{
							$curso = $value;
						}
					}
				}

				if (!empty($curso))
				{
					$this->output->set_output(json_encode($curso), REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
				}
				else
				{
					$this->output->set_output([
						'status' => FALSE,
						'message' => 'curso could not be found'
					], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
				}
			}
		}
    }

    public function curso_post()
    {
       
        $exp=$this->curso_model->post_curso($this->post());
            if($exp==1){$exp="Comunicado added to database ";}
            //else{$exp="El chat indicado ya existe o no es valido.";}
            $this->response($exp, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
    }

    public function curso_delete()
    {
         $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        $message=$this->curso_model->delete_curso($id);
        /*$message = [
            'id' => $id,
            'message' => 'Deleted the resource'
        ];*/
        if($message!=true){$message="Error";}
        $this->output->set_output(json_encode($message), REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code
    }

    public function curso_put()
    {
                $res = $this->curso_model->put_curso($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code

    }

}
