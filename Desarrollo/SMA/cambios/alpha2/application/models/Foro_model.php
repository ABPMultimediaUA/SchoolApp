<?php
class Foro_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_foro($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               $query = $this->db->get('foro');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('foro', array('idForo' => $id));
		        return $query->row_array();
		}


		public function get_asignatura($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('asignatura', array('idAsignatura' => $id));
		        return $query->row_array();
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

		

		public function post_foro($foro)
		{
		        $res=$this->db->set( $this->_setforo($foro) )->insert("foro");
		        return $res;
		}

		public function put_foro($data)
		{
		       
				$foro = $this->_setforo($data);
				$this->db->where('idForo', $data['idForo']);
				$res = $this->db->update('foro', $data);
				return $res;
		}

		public function delete_foro($id)
		{
		         $test = $this->db->get_where('foro', array('idForo' => $id));
				
				if (!empty($test))
            {
		        $res=$this->db->delete('foro', array('idForo' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setforo($foro)
		{
			$data1 = array(

		        'tema' => $foro["tema"],
		        'Asignatura_has_Curso_Asignatura_idAsignatura' => $foro["Asignatura_has_Curso_Asignatura_idAsignatura"],
		        'Asignatura_has_Curso_Curso_idCurso' => $foro["Asignatura_has_Curso_Curso_idCurso"]
	        
	        );

	        return $data1;
		}


}


?>