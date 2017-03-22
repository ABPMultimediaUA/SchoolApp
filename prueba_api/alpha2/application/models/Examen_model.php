<?php
class Examen_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_examen($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               $query = $this->db->get('examen');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('examen', array('idExamen' => $id));
		        return $query->row_array();
		}


		public function get_asignatura($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('Asignatura_has_Curso_has_alumno_idAsignatura', array('idAsignatura' => $id));
		        return $query->row_array();
		}
		public function get_curso($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('Asignatura_has_Curso_has_alumno_idCurso', array('idCurso' => $id));
		        return $query->row_array();
		}

		public function get_alumno($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('Asignatura_has_Curso_has_alumno_idAlumno', array('idAlumno' => $id));
		        return $query->row_array();
		}


		public function get_examenByAlumno($idAlumno = FALSE)
		{
		        if ($idAlumno === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('alumno_has_examen', array('alumno_idAlumno' => $idAlumno));
		        $examenes = [];
		        foreach($query->result_array() as $row)
		        {
		        	$examen = $this->db->get_where('examen', array('idExamen' => $row["idExamen"]));
		        	$examen = $examen->result_array();
		        	$examen = $examen->row_array();
		        	$examen["nota"] = $row["nota"];
		        	array_push($examenes, $examen);
		        }
		        return $examenes;
		}

		

		public function post_examen($examen)
		{
		        $res=$this->db->set( $this->_setexamen($examen) )->insert("examen");
		        return $res;
		}

		public function put_examen($data)
		{
		       
				$examen = $this->_setexamen($data);
				$this->db->where('idExamen', $data['idExamen']);
				$res = $this->db->update('examen', $data);
				return $res;
		}

		public function delete_examen($id)
		{
		         $test = $this->db->get_where('examen', array('idExamen' => $id));
				
				if (!empty($test))
            {
		        $res=$this->db->delete('examen', array('idExamen' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setexamen($examen)
		{
			$data1 = array(

		        'Asignatura_has_Curso_has_Alumno_idCurso' => $examen["Asignatura_has_Curso_has_Alumno_idCurso"],
		        'Asignatura_has_Curso_has_Alumno_idAsignatura' => $examen["Asignatura_has_Curso_has_Alumno_idAsignatura"],
		        'Asignatura_has_Curso_has_Alumno_idAlumno' => $examen["Asignatura_has_Curso_has_Alumno_idAlumno"],
		        'nota' => $examen["nota"],
		        'fecha' => $examen["fecha"]
	        );

	        return $data1;
		}


}


?>