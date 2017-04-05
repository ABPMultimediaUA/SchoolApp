<?php
class Profesor_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }

		public function get_profesor($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                $query = $this->db->get('profesor');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('profesor', array('idProfesor' => $id));
		        return $query->row_array();
		}

		public function get_idProfesor($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               return "";
		        }

		        $query = $this->db->get_where('profesor', array('idProfesor' => $id));
		        return $query->row_array();
		}

		public function get_profesorByUserName($username = FALSE)
		{
		        if ($username === FALSE )
		        {
		                return "";
		        }

		        $query = $this->db->get_where('profesor', array('user' => $username));
		        return $query->row_array();
		}

		public function post_profesor($profesor)
		{
		        $this->db->set( $this->_setprofesor($profesor) )->insert("profesor");

		        if($this->db->affected_rows()===1)
		        {
		        	return TRUE;
		        }

		        return NULL;
		}

		public function put_profesor($data)
		{
		       
				$profesor = $this->_setprofesor($data);
				$this->db->where('idProfesor', $data['idProfesor']);
				$res = $this->db->update('profesor', $data);
				return $res;
		}

		public function delete_profesor($id)
		{
		        $test = $this->db->get_where('profesor', array('idProfesor' => $id));
				
				if (!empty($test))
            {
		        $res=$this->db->delete('profesor', array('idProfesor' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setprofesor($profesor)
		{
			$data1 = array(

		        'idProfesor' => $profesor["idProfesor"],
		        'nombre' => $profesor["nombre"],
		        'email' => $profesor["email"],
		        'apellidos' => $profesor["apellidos"],
		        'user' => $profesor["user"],
		        'password' => $profesor["password"],
		        'telefono' => $profesor["telefono"],
		        'dni' => $profesor["dni"]
	        );

	        return $data1;
		}


}


?>