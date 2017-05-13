<?php
class Administrador_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }

		public function get_administrador($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                $query = $this->db->get('administrador');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('administrador', array('idAdministrador' => $id));
		        return $query->row_array();
		}

		public function get_idAdministrador($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('administrador', array('idAdministrador' => $id));
		        return $query->row_array();
		}

		public function get_administradorByUserName($username = FALSE)
		{
		        if ($username === FALSE )
		        {
		                return "";
		        }

		        $query = $this->db->get_where('administrador', array('user' => $username));
		        return $query->row_array();
		}

		public function post_administrador($admin)
		{
		        $this->db->set( $this->_setAdmin($admin) )->insert("administrador");

		        if($this->db->affected_rows()===1)
		        {
		        	return TRUE;
		        }

		        return NULL;
		}

		public function put_administrador($data)
		{
		       
				$administrador = $this->_setAdmin($data);
				$this->db->where('idAdministrador', $data['idAdministrador']);
				$res = $this->db->update('administrador', $data);
				return $res;
		}

		public function delete_administrador($id)
		{
		        $test = $this->get_idAdministrador($id);
				
				if (!empty($test))
            {
		        $res=$this->db->delete('administrador', array('idAdministrador' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setAdmin($usuario)
		{
			$data1 = array(

		        'idAdministrador' => $usuario["idAdministrador"],
		        'nombre' => $usuario["nombre"],
		        'email' => $usuario["email"],
		        'apellidos' => $usuario["apellidos"],
		        'user' => $usuario["user"],
		        'password' => $usuario["password"],
		        'telefono' => $usuario["telefono"],
		        'dni' => $usuario["dni"]
	        
	        );

	        return $data1;
		}


}


?>