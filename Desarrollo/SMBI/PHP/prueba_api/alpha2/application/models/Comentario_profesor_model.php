<?php
class Comentario_profesor_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_comentario_profesor($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               $query = $this->db->get('comentario_profesor');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('comentario_profesor', array('idComentario' => $id));
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

		

		public function post_comentario_profesor($comentario_profesor)
		{
		        $res=$this->db->set( $this->_setcomentario_profesor($comentario_profesor) )->insert("comentario_profesor");

		        return $res;
		}

		public function put_comentario_profesor($data)
		{
		       
				$comentario_profesor = $this->_setcomentario_profesor($data);
				$this->db->where('idComentario', $data['idComentario']);
				$res = $this->db->update('comentario_profesor', $data);
				return $res;
		}

		public function delete_comentario_profesor($id)
		{
		         $test = $this->db->get_where('comentario_profesor', array('idComentario' => $id));
				
				if (!empty($test))
            {
		        $res=$this->db->delete('comentario_profesor', array('idComentario' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setcomentario_profesor($comentario_profesor)
		{
			$data1 = array(

		        'Foro_idForo' => $comentario_profesor["Foro_idForo"],
		        'texto' => $comentario_profesor["texto"],
		        'fecha' => $comentario_profesor["fecha"],
		        'Profesor_idProfesor' => $comentario_profesor["Profesor_idProfesor"]
	        );

	        return $data1;
		}


}


?>