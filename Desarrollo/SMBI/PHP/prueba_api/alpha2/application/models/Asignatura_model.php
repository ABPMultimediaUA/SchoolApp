<?php
class Asignatura_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_curso($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               return "";
		        }

		        $query = $this->db->get_where('curso', array('idCurso' => $id));
		        return $query->row_array();
		}

		public function get_idAsignatura($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('asignatura', array('idAsignatura' => $id));
		        return $query->row_array();
		}


		public function get_asignatura($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                $query = $this->db->get('asignatura');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('asignatura', array('idAsignatura' => $id));
		        return $query->row_array();
		}

		public function post_asignatura($asignatura)
		{
		        $res = $this->db->set( $this->_setAsignatura($asignatura) )->insert("asignatura");

		        

		        return $res;
		}

		public function put_asignatura($data)
		{
		       
				$asignatura = $this->_setAsignatura($data);
				$this->db->where('idAsignatura', $asignatura['idAsignatura']);
				$res = $this->db->update('asignatura', $asignatura);
				return $res;
		}

		public function delete_asignatura($id)
		{
		        $test = $this->get_idAsignatura($id);
				
				if (!empty($test))
            {
		        $res=$this->db->delete('asignatura', array('idAsignatura' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setAsignatura($asignatura)
		{
			$data1 = array(

		        'idAsignatura' => $asignatura["idAsignatura"],
		        'nombre' => $asignatura["nombre"],
		        'curso' => $asignatura["curso"]
	        
	        );

	        return $data1;
		}


}


?>