<?php
class Asistencia_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_idasistencia($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               return "";
		        }

		        $query = $this->db->get_where('asistencia', array('idAsistencia' => $id));
		        return $query->row_array();
		}


		public function get_asignatura($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('Asignatura_has_Curso_has_asistencia_idAsignatura', array('idAsignatura' => $id));
		        return $query->row_array();
		}
		public function get_curso($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('Asignatura_has_Curso_has_asistencia_idCurso', array('idCurso' => $id));
		        return $query->row_array();
		}

		public function get_asistencia($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('asistencia', array('idAsistencia' => $id));
		        return $query->row_array();
		}

		

		public function post_asistencia($asistencia)
		{
		        $res= $this->db->set( $this->_setasistencia($asistencia) )->insert("asistencia");

		       return $res;
		}

		public function put_asistencia($data)
		{
		       
				$asistencia = $this->_setasistencia($data);
				$this->db->where('idAsistencia', $data['idAsistencia']);
				$res = $this->db->update('asistencia', $data);
				return $res;
		}

		public function delete_asistencia($id)
		{
		        $test = $this->get_idAsistencia($id);
				
				if (!empty($test))
            {
		        $res=$this->db->delete('asistencia', array('idAsistencia' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setasistencia($asistencia)
		{
			$data1 = array(

		        'Asignatura_has_Curso_has_Asistencia_idCurso' => $asistencia["Asignatura_has_Curso_has_Alumno_idCurso"],
		        'Asignatura_has_Curso_has_Alumno_idAsignatura' => $asistencia["Asignatura_has_Curso_has_Alumno_idAsignatura"],
		        'Asignatura_has_Curso_has_Alumno_idAlumno' => $asistencia["Asignatura_has_Curso_has_Alumno_idAlumno"],
		        'descripcion' => $asistencia["descripcion"],
		        'falta' => $asistencia["falta"],
		        'fecha' => $asistencia["fecha"]
	        );

	        return $data1;
		}


}


?>