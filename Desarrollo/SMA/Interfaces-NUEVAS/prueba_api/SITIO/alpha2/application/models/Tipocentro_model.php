<?php
class Tipocentro_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        


		public function get_tipocentro($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                $query = $this->db->get('tipocentro');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('tipocentro', array('tipo' => $id));
		        return $query->row_array();
		}

		public function post_tipocentro($tipocentro)
		{
		        $this->db->set( $this->_settipocentro($tipocentro) )->insert("tipocentro");

		        if($this->db->affected_rows()===1)
		        {
		        	return TRUE;
		        }

		        return NULL;
		}

		public function put_tipocentro($data)
		{
		       
				$tipocentro = $this->_settipocentro($data);
				$this->db->where('tipo', $data['tipo']);
				$res = $this->db->update('tipocentro', $data);
				return $res;
		}

		public function delete_tipocentro($id)
		{
		        $test = $this->db->get_where('tipocentro', array('tipo' => $id));
				
				if (!empty($test))
            {
		        $res=$this->db->delete('tipocentro', array('tipo' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _settipocentro($tipocentro)
		{
			$data1 = array(

		        'tipo' => $tipocentro["tipo"],
		        'descripcion' => $tipocentro["descripcion"]
	        
	        );

	        return $data1;
		}


}


?>