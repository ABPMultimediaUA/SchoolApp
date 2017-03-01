<?php
class tarea_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_tarea($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               $query = $this->db->get('tarea');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('tarea', array('idTarea' => $id));
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

		

		public function post_tarea($tarea)
		{
		        $res=$this->db->set( $this->_settarea($tarea) )->insert("tarea");
		        return $res;
		}

		public function put_tarea($data)
		{
		       
				$tarea = $this->_settarea($data);
				$this->db->where('idTarea', $data['idTarea']);
				$res = $this->db->update('tarea', $data);
				return $res;
		}

		public function delete_tarea($id)
		{
		        $test = $this->db->get_where('tarea', array('idTarea' => $id));
				
				if (!empty($test))
            {
		        $res=$this->db->delete('tarea', array('idTarea' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _settarea($tarea)
		{
			$data1 = array(

		        'Asignatura_has_Curso_has_Alumno_idCurso' => $tarea["Asignatura_has_Curso_has_Alumno_idCurso"],
		        'Asignatura_has_Curso_has_Alumno_idAsignatura' => $tarea["Asignatura_has_Curso_has_Alumno_idAsignatura"],
		        'Asignatura_has_Curso_has_Alumno_idAlumno' => $tarea["Asignatura_has_Curso_has_Alumno_idAlumno"],
		        'completada' => $tarea["completada"],
		        'descripcion' => $tarea["descripcion"],
		        'fecha_limite' => $tarea["fecha_limite"]
	        );

	        return $data1;
		}


}


?>