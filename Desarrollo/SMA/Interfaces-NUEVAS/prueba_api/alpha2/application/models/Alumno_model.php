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

		public function get_alumno($id = FALSE, $datoscurso)
		{
		        if ($id === FALSE)
		        {
		                $query = $this->db->get('alumno');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('alumno', array('idAlumno' => $id));
				$alumno = $query->row_array();
		        if($datoscurso!=NULL){
					$curso = $this->db->get_where('curso', array('idCurso' => $alumno["idCurso"]));
					$curso = $curso->row_array();
					$curso["nombreCurso"] = $curso["nombre"];
					$profesor = $this->db->get_where('profesor', array('idProfesor' => $curso["Profesor_idProfesor"]));
					$profesor = $profesor->row_array();
					$profesor = $profesor["nombre"]." ".$profesor["apellidos"];
		        if(!empty($curso)){
					$alumno["tutor"] = $profesor;
		        	$alumno = $alumno + $curso;
		        }
		        }



		        return $alumno;
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

		public function get_alumnoByAsignaturaByCurso($idAsignatura, $idCurso)
		{
			$alumnos = $this->db->get_where('asignatura_has_curso_has_alumno', array('idCurso'=>$idCurso, 'idAsignatura'=>$idAsignatura))->result_array();
			$lista_alumnos=[];
			foreach($alumnos as $alumno)
			{
				$alumno=$this->db->get_where('alumno', array('idAlumno'=>$alumno['idAlumno']))->row_array();
				array_push($lista_alumnos, $alumno);
			}
			return $lista_alumnos;
		}

		public function get_alumnoByCentroByCurso($idCentro, $idCurso)
		{
			$alumnos = $this->db->get_where('alumno', array('idCurso'=>$idCurso, 'idCentro'=>$idCentro))->result_array();
			
			return $alumnos;
		}

		public function get_alumnoByCurso($curso = FALSE)
		{
		        if ($curso === FALSE )
		        {
		                return "";
		        }

		        $query = $this->db->get_where('alumno', array('idCurso' => $curso));
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
		        	$res= $query->result_array();
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
				$arrayderes=[];
		        $res1 = $this->db->set( $this->_setalumno($alumno) )->insert("alumno"); array_push($arrayderes, $res1);
				$this->db->select_max('idAlumno');
				$idAlumno = $this->db->get('alumno')->row_array()['idAlumno'];
				$ayear1 = explode('-',$alumno['academico'])[0];
				$ayear2 = explode('-',$alumno['academico'])[1];
				$curso_alumno = array("idCurso"=>$alumno['idCurso'], "idAlumno"=>$idAlumno, "anyo"=>$ayear1, "anyo2"=>$ayear2);
				$res2 = $this->db->set($curso_alumno)->insert('alumno_has_curso'); array_push($arrayderes, $res2);
				$jasignaturas = ($alumno['asignaturas']);
				foreach ($jasignaturas as $asignatura)
				{
					$ahcha = array('idAlumno'=>$idAlumno, 'idCurso'=>$alumno['idCurso'], 'idAsignatura'=>$asignatura);
					$res3 = $this->db->set($ahcha)->insert('asignatura_has_curso_has_alumno');
					 array_push($arrayderes, $res3);
				}
				$res = $arrayderes;
		        if($res!="" && $res!=NULL && $res!=FALSE)
		        {
		        	return $res;
		        }
				else{
		        return NULL;}
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
				$res = [];

				if (!empty($test))
            {
		        $res0 = $this->db->delete('alumno', array('idAlumno' => $id));
				$res1 = $this->db->delete('asignatura_has_curso_has_alumno', array('idAlumno'=>$id));
				$res2 = $this->db->delete('alumno_has_curso', array('idAlumno'=>$id));
				$res3 = $this->db->delete('alumno_has_examen', array('alumno_idAlumno'=>$id));
				$res4 = $this->db->delete('alumno_has_padre', array('Alumno_idAlumno'=>$id));
				$res5 = $this->db->delete('alumno_has_tarea', array('idAlumno'=>$id));
				$res6 = $this->db->delete('asistencia', array('idAlumno'=>$id));
				$res7 = $this->db->delete('comentarios_sobre_el_alumno', array('idAlumno'=>$id));
				$res8 = $this->db->delete('comentario_alumno', array('Alumno_idAlumno'=>$id));
				$res9 = $this->db->delete('confirmacion_comunicado', array('alumno_idAlumno'=>$id));
				$res10 = $this->db->delete('mencion', array('idAlumno'=>$id));
				$res11 = $this->db->delete('mensaje_alumno', array('idAlumno'=>$id));
				$res12 = $this->db->delete('mensaje_profesor', array('idAlumno'=>$id));
				$res = array($res0, $res1, $res2, $res3, $res4, $res5, $res6, $res7, $res8, $res9, $res10, $res11, $res12);
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setalumno($alumno)
		{
			$data1 = array();

		        if(isset($alumno["nombre"]))$data1['nombre'] = $alumno["nombre"];
		        if(isset($alumno['email'])) $data1["email"] = $alumno["email"];
		        if(isset($alumno['apellidos'])) $data1["apellidos"] = $alumno["apellidos"];
		        if(isset($alumno['user']))$data1["user"]  = $alumno["user"];
		        if(isset($alumno['password'])) $data1["password"] = $alumno["password"];
		        if(isset($alumno['telefono'])) $data1["telefono"] = $alumno["telefono"];
		        if(isset($alumno['dni'])) $data1["dni"] = $alumno["dni"];
		        //'InformeAlumno_numExpediente' => $alumno["InformeAlumno_numExpediente"],
		        if(isset($alumno['idCurso'])) $data1["idCurso"] = $alumno["idCurso"];
		        if(isset($alumno['idCentro'])) $data1["idCentro"] = $alumno["idCentro"];
				if(isset($alumno['anyo'])) $data1["anyo"] = $alumno["anyo"];
				if(isset($alumno['anyo2'])) $data1["anyo2"] = $alumno["anyo2"];

	        

	        return $data1;
		}


}


?>