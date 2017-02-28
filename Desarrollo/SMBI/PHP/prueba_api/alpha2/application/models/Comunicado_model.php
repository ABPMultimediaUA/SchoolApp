<?php
class Comunicado_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_comunicado($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               $query = $this->db->get('comunicado');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('comunicado', array('idComunicado' => $id));
		        return $query->row_array();
		}

		 public function get_comunicadosByAlumno($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               $query = $this->db->get('comunicado');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('confirmacion_comunicado', array('alumno_idAlumno' => $id));
		        $comunicados=[];
		        foreach($query as $row)
		        {
		        	array_push($comunicados, $this->db->get_where('comunicado', array('idComunicado'=>$row["comunicado_idComunicado"]);
		        }
		        return $comunicados;
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

		

		public function post_comunicado($comunicado)
		{
		        $res=$this->db->set( $this->_setcomunicado($comunicado) )->insert("comunicado");
		        return $res;
		      
		}

		public function put_comunicado($data)
		{
		       
				$comunicado = $this->_setcomunicado($data);
				$this->db->where('idComunicado', $data['idComunicado']);
				$res = $this->db->update('comunicado', $data);
				return $res;
		}

		public function delete_comunicado($id)
		{
		         $test = $this->db->get_where('comunicado', array('idComunicado' => $id));
				
				if (!empty($test))
            {
		        $res=$this->db->delete('comunicado', array('idComunicado' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setcomunicado($comunicado)
		{
			$data1 = array(
		        'Asignatura_has_Curso_Curso_idCurso' => $comunicado["Asignatura_has_Curso_Curso_idCurso"],
		        'Asignatura_has_Curso_Asignatura_idAsignatura' => $comunicado["Asignatura_has_Curso_Asignatura_idAsignatura"],
		        'texto' => $comunicado["texto"],
		        'tipo' => $comunicado["tipo"],
		        'firmado' => $comunicado["firmado"],
		        'fecha' => $comunicado["fecha"],
		        'Alumno_idAlumno' => $comunicado["Alumno_idAlumno"]
	        );

	        return $data1;
		}


}


?>