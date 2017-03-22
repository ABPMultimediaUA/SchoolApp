<?php
class Curso_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_centro($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               return "";
		        }

		        $query = $this->db->get_where('centro', array('idCentro' => $id));
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

		public function get_idcurso($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('curso', array('idCurso' => $id));
		        return $query->row_array();
		}


		public function get_curso($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                $query = $this->db->get('curso');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('curso', array('idCurso' => $id));
		        return $query->row_array();
		}

		public function post_curso($curso)
		{
		        $this->db->set( $this->_setcurso($curso) )->insert("curso");

		        if($this->db->affected_rows()===1)
		        {
		        	return TRUE;
		        }

		        return NULL;
		}

		public function put_curso($data)
		{
		       
				$curso = $this->_setcurso($data);
				$this->db->where('idCurso', $data['idCurso']);
				$res = $this->db->update('curso', $data);
				return $res;
		}

		public function delete_curso($id)
		{
		        $test = $this->db->get_where('curso', array('idCurso' => $id));
				
				if (!empty($test))
            {
		        $res=$this->db->delete('curso', array('idCurso' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setcurso($curso)
		{
			$data1 = array(

		        'centro_idCentro' => $curso["centro_idCentro"],
		        'Profesor_idProfesor' => $curso["Profesor_idProfesor"],
		        'grupo' => $curso["grupo"],
		        'nombre' => $curso["nombre"]

	        
	        );

	        return $data1;
		}


}


?>