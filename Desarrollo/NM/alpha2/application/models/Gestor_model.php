<?php
class Gestor_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }

		public function get_gestor($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                $query = $this->db->get('gestor');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('gestor', array('idGestor' => $id));
		        return $query->row_array();
		}

		public function get_idGestor($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('gestor', array('idGestor' => $id));
		        return $query->row_array();
		}

		public function get_gestorByUserName($username = FALSE)
		{
		        if ($username === FALSE )
		        {
		                return "";
		        }

		        $query = $this->db->get_where('gestor', array('usuario' => $username));
		        return $query->row_array();
		}

		public function post_gestor($gestor)
		{
		        $res = $this->db->set( $this->_setGestor($gestor) )->insert("gestor");
		        return $res;
		}

		public function put_gestor($data)
		{
		       
				$gestor = $this->_setGestor($data);
				$this->db->where('idGestor', $data['idGestor']);
				$res = $this->db->update('gestor', $data);
				return $res;
		}

		public function delete_gestor($id)
		{
		        $test = $this->get_idGestor($id);
				
				if (!empty($test))
            {
		        $res=$this->db->delete('gestor', array('idGestor' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setGestor($usuario)
		{
			$data1 = array();

		       if(isset($usuario['idGestor'])) $data1['idGestor'] = $usuario["idGestor"];
			   if(isset($usuario['idCentro'])) $data1['idCentro'] = $usuario["idCentro"];
		        if(isset($usuario['nombre']))$data1['nombre'] = $usuario["nombre"];
		        if(isset($usuario['email']))$data1['email'] = $usuario["email"];
		        if(isset($usuario['apellidos']))$data1['apellidos'] = $usuario["apellidos"];
		       if(isset($usuario['usuario'])) $data1['usuario'] = $usuario["usuario"];
		        if(isset($usuario['password']))$data1['password'] = $usuario["password"];
		        if(isset($usuario['telefono']))$data1['telefono'] = $usuario["telefono"];
		        if(isset($usuario['dni']))$data1['dni'] = $usuario["dni"];
	        
	        return $data1;
		}


}


?>