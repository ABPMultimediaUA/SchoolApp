<?php
class Comentarios_sobre_el_alumno_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_comentarios_sobre_el_alumno($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               $query = $this->db->get('comentarios_sobre_el_alumno');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('comentarios_sobre_el_alumno', array('idComentarios_sobre_el_alumno' => $id));
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

		

		public function post_comentarios_sobre_el_alumno($comentarios_sobre_el_alumno)
		{
		        $res=$this->db->set( $this->_setcomentarios_sobre_el_alumno($comentarios_sobre_el_alumno) )->insert("comentarios_sobre_el_alumno");

		        return $res;
		}

		public function put_comentarios_sobre_el_alumno($data)
		{
		       
				$comentarios_sobre_el_alumno = $this->_setcomentarios_sobre_el_alumno($data);
				$this->db->where('idComentarios_sobre_el_alumno', $data['idComentarios_sobre_el_alumno']);
				$res = $this->db->update('comentarios_sobre_el_alumno', $data);
				return $res;
		}

		public function delete_comentarios_sobre_el_alumno($id)
		{
		         $test = $this->db->get_where('comentarios_sobre_el_alumno', array('idComentarios_sobre_el_alumno' => $id));
				
				if (!empty($test))
            {
		        $res=$this->db->delete('comentarios_sobre_el_alumno', array('idComentarios_sobre_el_alumno' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setcomentarios_sobre_el_alumno($comentarios_sobre_el_alumno)
		{
			$data1 = array(

		        
		        'Asignatura_has_Curso_has_Alumno_idCurso' => $comentarios_sobre_el_alumno["Asignatura_has_Curso_has_Alumno_idCurso"],
		        'Asignatura_has_Curso_has_Alumno_idAsignatura' => $comentarios_sobre_el_alumno["Asignatura_has_Curso_has_Alumno_idAsignatura"],
		        'Asignatura_has_Curso_has_Alumno_idAlumno' => $comentarios_sobre_el_alumno["Asignatura_has_Curso_has_Alumno_idAlumno"],
		        'texto' => $comentarios_sobre_el_alumno["texto"],
		        'titulo' => $comentarios_sobre_el_alumno["titulo"],
	        );

	        return $data1;
		}


}


?>