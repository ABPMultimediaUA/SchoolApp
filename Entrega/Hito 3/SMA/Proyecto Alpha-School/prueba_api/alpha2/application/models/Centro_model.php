<?php
class Centro_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_tipocentro($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                
		                return "";
		        }

		        $query = $this->db->get_where('tipocentro', array('tipo' => $id));
		        return $query->row_array();
		}

		public function get_administrador($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                
		                return "";
		        }

		        $query = $this->db->get_where('administrador', array('idAdministrador' => $id));
		        return $query->row_array();
		}

		public function get_idCentro($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('centro', array('idCentro' => $id));
		        return $query->row_array();
		}

		public function get_centro($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                $query = $this->db->get('centro');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('centro', array('idCentro' => $id));
		        return $query->row_array();
		}

		public function post_centro($centro)
		{
		        $this->db->set( $this->_setCentro($centro) )->insert("centro");

		        if($this->db->affected_rows()===1)
		        {
		        	return TRUE;
		        }

		        return NULL;
		}

		public function put_centro($data)
		{
		       
				$centro = $this->_setcentro($data);
				$this->db->where('idCentro', $data['idCentro']);
				$res = $this->db->update('centro', $data);
				return $res;
		}

		public function delete_centro($id)
		{
		        $test = $this->get_idCentro($id);
				
				if (!empty($test))
            {
		        $res=$this->db->delete('centro', array('idCentro' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setCentro($centro)
		{
			$data1 = array(

		        'idCentro' => $centro["idCentro"],
		        'nombre' => $centro["nombre"],
		        'direccion' => $centro["direccion"],
		        'TipoCentro_tipo' => $centro["TipoCentro_tipo"],
		        'Administrador_idAdministrador' => $centro["Administrador_idAdministrador"]
	        
	        );

	        return $data1;
		}


}


?>