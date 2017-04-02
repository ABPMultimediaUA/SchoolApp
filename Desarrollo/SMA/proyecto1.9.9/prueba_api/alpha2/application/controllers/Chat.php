<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic chat interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Chat extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->database();
        $this->load->model('chat_model');
        $this->load->helper('url_helper');

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['chat_get']['limit'] = 500; // 500 requests per hour per chat/key
        $this->methods['chat_post']['limit'] = 100; // 100 requests per hour per chat/key
        $this->methods['chat_delete']['limit'] = 50; // 50 requests per hour per chat/key
    }

    public function chat_get()
    {
        // chat from a data store e.g. database
       /* $chat = [
            ['id' => 1, 'name' => 'John', 'email' => 'john@example.com', 'fact' => 'Loves coding'],
            ['id' => 2, 'name' => 'Jim', 'email' => 'jim@example.com', 'fact' => 'Developed on CodeIgniter'],
            ['id' => 3, 'name' => 'Jane', 'email' => 'jane@example.com', 'fact' => 'Lives in the USA', ['hobbies' => ['guitar', 'cycling']]],
        ];*/


        $id = $this->get('id');



        // If the id parameter doesn't exist return all the chat

        if ($id === NULL)
        {

            
            $chat = $this->chat_model->get_chat();

            // Check if the chat data store contains chat (in case the database result returns NULL)
            if ($chat)
            {
                // Set the response and exit
                $this->response($chat, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No chat were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular chat.
        else {
            $id = (int) $id;

            // Validate the id.
            if ($id <= 0)
            {
                // Invalid id, set the response and exit.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            // Get the chat from the array, using the id as key for retrieval.
            // Usually a model is to be used for this.

            $chat = $this->chat_model->get_chat($id);

            if (!empty($chat))
            {
                foreach ($chat as $key => $value)
                {
                    if (isset($value['idChat']) && $value['idChat'] === $id)
                    {
                        $chat = $value;
                    }
                }
            }

            if (!empty($chat))
            {   $chat[0]=$chat;
                $this->output->set_output($chat, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                $this->output->set_output([
                    'status' => FALSE,
                    'message' => 'chat could not be found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }


   


    public function chat_post()
    {
       
        $exp=$this->chat_model->post_chat($this->post());
            if($exp==1){$exp="Chat added to database ";}
            //else{$exp="El chat indicado ya existe o no es valido.";}
            $this->output->set_output($exp, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
    }

    public function chat_delete()
    {
        $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        // $this->some_model->delete_something($id);
        $message = [
            'id' => $id,
            'message' => 'Deleted the resource'
        ];

        $this->output->set_output($message, REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code
    }

    public function chat_put()
    {
                $res = $this->chat_model->put_chat($this->put());

                $this->output->set_output($res, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
            
    }

}
