<?php
class Asignatura_has_curso_has_asignatura_has_curso_has_alumno_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_asignatura_has_curso_has_asignatura_has_curso_has_alumno()
		{
		        if ($id === FALSE)
		        {
		               return "";
		        }

		        $query = $this->db->get_where('asignatura_has_curso_has_asignatura_has_curso_has_alumno_has_curso', array('tipo' => $id));
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

		public function get_asignatura_has_curso_has_alumno($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('asignatura_has_curso_has_alumno', array('idasignatura_has_curso_has_alumno' => $id));
		        return $query->row_array();
		}

		public function post_asignatura_has_curso_has_asignatura_has_curso_has_alumno($asignatura_has_curso_has_asignatura_has_curso_has_alumno)
		{
		        $res=$this->db->set( $this->_setasignatura_has_curso_has_asignatura_has_curso_has_alumno($asignatura_has_curso_has_asignatura_has_curso_has_alumno) )->insert("asignatura_has_curso_has_asignatura_has_curso_has_alumno");
		        return $res;
		      
		}

		public function put_asignatura_has_curso_has_alumno($data)
		{
		       
				$asignatura_has_curso_has_alumno = $this->_setasignatura_has_curso_has_alumno($data);
				$this->db->where('idasignatura_has_curso_has_alumno', $data['idasignatura_has_curso_has_alumno']);
				$res = $this->db->update('asignatura_has_curso_has_alumno', $data);
				return $res;
		}

		public function delete_asignatura_has_curso_has_alumno($id)
		{
		        $res=$this->db->delete('asignatura_has_curso_has_alumno', array('idasignatura_has_curso_has_alumno' => $id));
		        return $res;
		}

		public function _setasignatura_has_curso_has_asignatura_has_curso_has_alumno($asignatura_has_curso_has_asignatura_has_curso_has_alumno)
		{
			$data1 = array(

		        'idAsignatura' => $asignatura_has_curso_has_asignatura_has_curso_has_alumno["idAsignatura"],
		        'idCurso' => $asignatura_has_curso_has_asignatura_has_curso_has_alumno["idCurso"],
		        'idasignatura_has_curso_has_alumno' => $asignatura_has_curso_has_asignatura_has_curso_has_alumno["idasignatura_has_curso_has_alumno"]
	        
	        );

	        return $data1;
		}


}


?>