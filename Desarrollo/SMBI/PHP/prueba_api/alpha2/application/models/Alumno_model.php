<?php
class Alumno_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }

        public function get_idAlumno($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('alumno', array('idAlumno' => $id));
		        return $query->row_array();
		}

		public function get_alumno($id = FALSE, $datoscurso, $datosasignaturas)
		{
		        if ($id === FALSE)
		        {
		                $query = $this->db->get('alumno');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('alumno', array('idAlumno' => $id));

		        if($datoscurso!=NULL){
		        $curso = $this->get_curso($id);
		        if(!empty($curso)){
		        	return array('Curso'=>$curso, 'Alumno' => $query->row_array());
		        }
		        }

		        if($datosasignaturas!=NULL){
		        $asignaturas = $this->get_asignaturas($id);
		        if(!empty($asignaturas)){
		        	return array('Asignaturas'=>$asignaturas, 'Alumno' => $query->row_array());
		        }
		        }
		        return $query->row_array();
		}

		public function get_alumnoByName($nombre = FALSE)
		{
		        if ($nombre === FALSE )
		        {
		                $query = $this->db->get('alumno');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('alumno', array('nombre' => $nombre));
		        return $query->row_array();
		}

		public function get_alumnoByUserName($username = FALSE)
		{
		        if ($username === FALSE )
		        {
		                return "";
		        }

		        $query = $this->db->get_where('alumno', array('user' => $username));
		        return $query->row_array();
		}

		public function get_expediente($exp = FALSE)
		{
		        if ($exp === FALSE)
		        {
		                
		                return "";
		        }

		        $query = $this->db->get_where('expediente', array('numExpediente' => $exp));
		        return $query->row_array();
		}


		public function get_curso($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                
		                return "";
		        }

		        $query = $this->db->get_where('asignatura_has_curso_has_alumno', array('idAlumno' => $id));
		        if(!empty($query))
		        {
		        	$res= $query->row_array();
		        	$idCurso = $res['idCurso'];
		        	$curso = $this->db->get_where('curso', array('idCurso' =>$idCurso));
		        	$curso = $curso->result_array();
		        	return $curso;
		        }

		        return $query->row_array();
		}

		public function get_asignaturas($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                
		                return "";
		        }

		        $query = $this->db->get_where('asignatura_has_curso_has_alumno', array('idAlumno' => $id));
		        if(!empty($query))
		        {
		        	$res= $query->row_array();
		        	$asignaturas=[];
			        foreach($res as $row)
			        {
			        	$asignatura= $this->db->get_where('asignatura', array('idAsignatura' => $row['idAsignatura']) );
		        	array_push($asignaturas, $asignatura);
			        }
		        	return $asignaturas;
		        }

		        return $query->row_array();
		}

		public function post_alumno($alumno)
		{
		        $this->db->set( $this->_setalumno($alumno) )->insert("alumno");

		        if($this->db->affected_rows()===1)
		        {
		        	return TRUE;
		        }

		        return NULL;
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
				$test = $this->get_idAlumno($id);

				if (!empty($test))
            {
		        $res=$this->db->delete('alumno', array('idAlumno' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setalumno($alumno)
		{
			$data1 = array(

		        'idAlumno' => $alumno["idAlumno"],
		        'nombre' => $alumno["nombre"],
		        'email' => $alumno["email"],
		        'apellidos' => $alumno["apellidos"],
		        'user' => $alumno["user"],
		        'password' => $alumno["password"],
		        'telefono' => $alumno["telefono"],
		        'dni' => $alumno["dni"],
		        'InformeAlumno_numExpediente' => $alumno["InformeAlumno_numExpediente"],
		        'curso_idCurso' => $alumno["curso_idCurso"],
		        'curso_centro_idCentro' => $alumno["curso_centro_idCentro"]
	        
	        );

	        return $data1;
		}


}


?>