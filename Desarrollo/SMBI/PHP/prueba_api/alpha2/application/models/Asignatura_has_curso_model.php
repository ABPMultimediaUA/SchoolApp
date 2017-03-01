<?php
class Asignatura_has_curso_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_asignatura_has_curso($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               return "";
		        }

		        $query = $this->db->get_where('asignatura_has_curso_has_curso', array('tipo' => $id));
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

		public function get_profesor($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('profesor', array('idProfesor' => $id));
		        return $query->row_array();
		}

		public function post_asignatura_has_curso($asignatura_has_curso)
		{
		        $res=$this->db->set( $this->_setAsignatura_has_curso($asignatura_has_curso) )->insert("asignatura_has_curso");
		        return $res;
		}

		public function put_alumno($data)
		{
		       
				$alumno = $this->_setalumno($data);
				$this->db->where('idAlumno', $data['idAlumno']);
				$res = $this->db->update('alumno', $data);
				return $res;
		}

		public function delete_alumno($id)
		{
		        $res=$this->db->delete('alumno', array('idAlumno' => $id));
		        return $res;
		}

		public function _setAsignatura_has_curso($asignatura_has_curso)
		{
			$data1 = array(

		        'Asignatura_idAsignatura' => $asignatura_has_curso["Asignatura_idAsignatura"],
		        'Curso_idCurso' => $asignatura_has_curso["Curso_idCurso"],
		        'Profesor_idProfesor' => $asignatura_has_curso["Profesor_idProfesor"]
	        
	        );

	        return $data1;
		}


}


?>