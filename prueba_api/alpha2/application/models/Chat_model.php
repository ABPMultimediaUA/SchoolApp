<?php
class Chat_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


       


		public function get_alumno($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('padre', array('Alumno_idAlumno' => $id));
		        return $query->row_array();
		}
		

		public function get_profesor($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('profesor', array('idProfesor' => $id));
		        return $query->row_array();
		}

		public function post_chat($chat)
		{
		        $res=$this->db->set( $this->_setchat($chat) )->insert("chat");


		        return $res;
		}

		public function put_chat($data)
		{
		       
				$chat = $this->_setchat($data);
				$this->db->where('idChat', $data['idChat']);
				$res = $this->db->update('chat', $data);
				return $res;
		}

		public function delete_chat($id)
		{
		        $res=$this->db->delete('chat', array('idChat' => $id));
		        return $res;
		}

		public function _setchat($chat)
		{
			$data1 = array(

		        'Padre_Alumno_idAlumno' => $chat["Padre_Alumno_idAlumno"],
		        'Profesor_idProfesor' => $chat["Profesor_idProfesor"]
	        
	        );

	        return $data1;
		}


}


?>