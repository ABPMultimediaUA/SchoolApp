<?php
class User extends CI_Controller {

        public function __construct()
        {
                parent::__construct();
                $this->load->model('user_model');
                $this->load->helper('url_helper');
        }

        public function index()
        {
                 $data['user'] = $this->user_model->get_users();
                $data['title'] = 'Alumnos';

                $this->load->view('templates/header', $data);
                $this->load->view('user/index', $data);
                $this->load->view('templates/footer');
        }

        public function user($id = NULL)
        {
                $data['user_item'] = $this->user_model->get_users($id);
                
                if (empty($data['user_item']))
                {
                        show_404();
                }

                $data['nombre'] = $data['user_item']['nombre'];

                $this->load->view('templates/header', $data);
                $this->load->view('user/usuario', $data);
                $this->load->view('templates/footer');
        }


        


}





       

?>