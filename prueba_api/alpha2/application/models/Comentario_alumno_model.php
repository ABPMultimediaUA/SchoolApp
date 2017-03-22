<?php
class Comentario_alumno_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_comentario_alumno($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               $query = $this->db->get('comentario_alumno');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('comentario_alumno', array('idComentario' => $id));
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

		

		public function post_comentario_alumno($comentario_alumno)
		{
		        $res=$this->db->set( $this->_setcomentario_alumno($comentario_alumno) )->insert("comentario_alumno");
		        return $res;
		}

		public function put_comentario_alumno($data)
		{
		       
				$comentario_alumno = $this->_setcomentario_alumno($data);
				$this->db->where('idComentario', $data['idComentario']);
				$res = $this->db->update('comentario_alumno', $data);
				return $res;
		}

		public function delete_comentario_alumno($id)
		{
		        $test = $this->db->get_where('comentario_alumno', array('idComentario' => $id));
				
				if (!empty($test))
            {
		        $res=$this->db->delete('comentario_alumno', array('idComentario' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setcomentario_alumno($comentario_alumno)
		{
			$data1 = array(

		        'Foro_idForo' => $comentario_alumno["Foro_idForo"],
		        'texto' => $comentario_alumno["texto"],
		        'fecha' => $comentario_alumno["fecha"],
		        'Alumno_idAlumno' => $comentario_alumno["Alumno_idAlumno"]
	        );

	        return $data1;
		}


}


?>