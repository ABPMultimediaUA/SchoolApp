<?php
class User_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_user($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               return "";
		        }

		        $query = $this->db->get_where('foro', array('idForo' => $id));
		        return $query->row_array();
		}


		
		

		public function post_user($foro)
		{
		        $this->db->set( $this->_setforo($foro) )->insert("foro");

		        if($this->db->affected_rows()===1)
		        {
		        	return TRUE;
		        }

		        return NULL;
		}

		public function put_user($data)
		{
		       
				$alumno = $this->_setalumno($data);
				$this->db->where('idAlumno', $data['idAlumno']);
				$res = $this->db->update('alumno', $data);
				return $res;
		}

		public function delete_user($id)
		{
		        $res=$this->db->delete('alumno', array('idAlumno' => $id));
		        return $res;
		}

		public function _setuser($foro)
		{
			$data1 = array(

		        'idForo' => $foro["idForo"],
		        'tema' => $foro["tema"],
		        'Asignatura_has_Curso_Asignatura_idAsignatura' => $foro["Asignatura_has_Curso_Asignatura_idAsignatura"],
		        'Asignatura_has_Curso_Curso_idCurso' => $foro["Asignatura_has_Curso_Curso_idCurso"],
		        'Administrador_idAdministrador' => $foro["Administrador_idAdministrador"],
		        'password' => $foro["password"],
		        'telefono' => $foro["telefono"],
		        'dni' => $foro["dni"]
	        
	        );

	        return $data1;
		}


}


?>