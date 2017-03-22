<?php
class Expediente_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }

        public function get_expediente2($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               return "";
		        }

		        $query = $this->db->get_where('expediente', array('numExpediente' => $id));
		        return $query->row_array();
		}

		public function get_expediente($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                $query = $this->db->get('expediente');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('expediente', array('numExpediente' => $id));
		        return $query->row_array();
		}

		public function post_expediente($expediente)
		{
		        $exp=$this->db->set( $this->_setexpediente($expediente) )->insert("expediente");

		        if($this->db->affected_rows()===1)
		        {
		        	return $exp;
		        }

		        return $exp;
		}

		public function put_expediente($data)
		{
		       
				$expediente = $this->_setexpediente($data);
				$this->db->where('numExpediente', $expediente['numExpediente']);
				$res = $this->db->update('expediente', $expediente);
				return $res;
		}

		public function delete_expediente($id)
		{
		         $test = $this->db->get_where('expediente', array('numExpediente' => $id));
				
				if (!empty($test))
            {
		        $res=$this->db->delete('expediente', array('numExpediente' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setexpediente($expediente)
		{
			$data1 = array(

		        'numExpediente' => $expediente["numExpediente"]
	        
	        );

	        return $data1;
		}


}


?>