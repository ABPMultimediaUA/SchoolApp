<?php
class Asignatura_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
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

		public function get_idAsignatura($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('asignatura', array('idAsignatura' => $id));
		        return $query->row_array();
		}


		public function get_asignatura($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                $query = $this->db->get('asignatura');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('asignatura', array('idAsignatura' => $id));
		        return $query->row_array();
		}


		public function get_asignaturasByCurso($idCurso)
		{
			$asignaturas_curso = $this->db->get_where('asignatura_has_curso_has_centro', array('Curso_idCurso'=>$idCurso))->result_array();
			$asignaturas=[];
			foreach($asignaturas_curso as $asignatura_curso)
			{
				$asignatura = $this->db->get_where('asignatura', array('idAsignatura'=>$asignatura_curso['Asignatura_idAsignatura']))->row_array();
				array_push($asignaturas, $asignatura);
			}
			return $asignaturas;
		}


		public function get_asignaturasByAlumno($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }


				$curso = $this->db->get_where('alumno_has_curso', array('idAlumno' => $id, 'anyo <=' => date("Y"), 'anyo2 >=' => date("Y")))->row_array();
				$query = $this->db->get_where('asignatura_has_curso_has_alumno', array('idAlumno' => $id, 'idCurso'=>$curso["idCurso"]));
		        $asignaturas=[];

		        foreach($query->result_array() as $row )
		        {

		        	$asig1 = $this->db->get_where('asignatura', array('idAsignatura' => $row["idAsignatura"]));
		        	$asig2 = $asig1->row_array();
		        	$ahchc = $this->db->get_where('asignatura_has_curso_has_centro', array('Asignatura_idAsignatura' => $asig2["idAsignatura"]))->row_array();
		        	$profesor = $this->db->get_where('profesor', array('idProfesor' => $ahchc["Profesor_idProfesor"]))->row_array();
					$dia = $this->db->get_where('dia_semana', array('idDia' => $ahchc["diaSemana"]))->row_array();

		        	$asig2["idProfesor"] = $profesor["idProfesor"];
		        	$asig2["nombreProfesor"] = $profesor["nombre"]." ".$profesor["apellidos"];
					$asig2["hora"] = $ahchc["hora"];
					$asig2["diaSemana"] = $dia["letra"];
					$asig2["notaEvaluacion1"] = $row["notaEvaluacion1"];
					$asig2["notaEvaluacion2"] = $row["notaEvaluacion2"];
					$asig2["notaEvaluacion3"] = $row["notaEvaluacion3"];
					$asig2["NotaFinal"] = $row["NotaFinal"];
					$curso2 = $this->db->get_where('alumno_has_curso', array('idAlumno'=>$id, 'idCurso'=>$row["idCurso"]))->row_array();
					$anyoacademico = $curso2["anyo"]."-".$curso2["anyo2"];
					$asig2["curso"] = $anyoacademico;

		        	array_push($asignaturas, $asig2);

		        }

		        return $asignaturas;
		}

		public function get_todasAsignaturasByAlumno($id = FALSE)
		{
			if ($id === FALSE)
			{
				return "";
			}


			$curso = $this->db->get_where('alumno_has_curso', array('idAlumno' => $id, 'anyo <=' => date("Y"), 'anyo2 >=' => date("Y")))->row_array();
			$query = $this->db->get_where('asignatura_has_curso_has_alumno', array('idAlumno' => $id));
			$asignaturas=[];

			foreach($query->result_array() as $row )
			{
				if($row["idCurso"]!=$curso['idCurso']){
				$asig1 = $this->db->get_where('asignatura', array('idAsignatura' => $row["idAsignatura"]));
				$asig2 = $asig1->row_array();
				$ahchc = $this->db->get_where('asignatura_has_curso_has_centro', array('Asignatura_idAsignatura' => $asig2["idAsignatura"]))->row_array();
				$profesor = $this->db->get_where('profesor', array('idProfesor' => $ahchc["Profesor_idProfesor"]))->row_array();
				$dia = $this->db->get_where('dia_semana', array('idDia' => $ahchc["diaSemana"]))->row_array();

				$asig2["idProfesor"] = $profesor["idProfesor"];
				$asig2["nombreProfesor"] = $profesor["nombre"]." ".$profesor["apellidos"];
				$asig2["hora"] = $ahchc["hora"];
				$asig2["diaSemana"] = $dia["letra"];
				$asig2["notaEvaluacion1"] = $row["notaEvaluacion1"];
				$asig2["notaEvaluacion2"] = $row["notaEvaluacion2"];
				$asig2["notaEvaluacion3"] = $row["notaEvaluacion3"];
				$asig2["NotaFinal"] = $row["NotaFinal"];
				$curso2 = $this->db->get_where('alumno_has_curso', array('idAlumno'=>$id, 'idCurso'=>$row["idCurso"]))->row_array();
				$anyoacademico = $curso2["anyo"]."-".$curso2["anyo2"];
				$asig2["curso"] = $anyoacademico;

				array_push($asignaturas, $asig2);
				}

			}

			return $asignaturas;
		}


		public function get_asignaturasByProfesor($id = FALSE)
		{
			if ($id === FALSE)
			{
				return "";
			}

			$query = $this->db->get_where('asignatura_has_curso_has_centro', array('Profesor_idProfesor' => $id));
			$resquery = $query->result_array();
			$asignaturas=[];

			foreach($resquery as $row )
			{
				$asig1 = $this->db->get_where('asignatura', array('idAsignatura' => $row["Asignatura_idAsignatura"]));
				$asig2 = $asig1->row_array();
				$centro = $this->db->get_where('centro', array('idCentro' => $row["centro_idCentro"]))->row_array();
				$curso = $this->db->get_where('curso', array('idCurso' => $row["Curso_idCurso"]))->row_array();
				$dia = $this->db->get_where('dia_semana', array('idDia' => $row["diaSemana"]))->row_array();
				$asig2["hora"] = $row["hora"];
				$asig2["diaSemana"] = $dia["letra"];
				$asig2["centro"] = $centro["nombre"];
				$asig2["grupo"] = $curso["grupo"];
				$asig2["idCurso"] = $curso["idCurso"];
				$asig2["grupo"] = $curso["grupo"];

				array_push($asignaturas, $asig2);

			}

			return $asignaturas;
		}

		public function post_asignatura($asignatura)
		{
				$setAsignatura = array('nombre'=> $asignatura['nombre']);
		        $res1 = $this->db->set( $setAsignatura)->insert("asignatura");
				$this->db->select_max('idAsignatura');
				$idAsignatura = $this->db->get('asignatura')->row_array()['idAsignatura'];
				$ahchc = array('Asignatura_idAsignatura' => $idAsignatura, 'Centro_idCentro' => $asignatura['idCentro'], 'Curso_idCurso' => $asignatura['idCurso'] );
				$res2 = $this->db->set($ahchc)->insert("asignatura_has_curso_has_centro");
				$res = array($res1, $res2);
		        return $res;
		}

		public function put_asignatura($data)
		{
				if(isset($data['idProfesor'])){
				$array  = array('Asignatura_idAsignatura' => $data['idAsignatura'], 'Curso_idCurso' => $data['idCurso'], 'Centro_idCentro'=>$data['idCentro']);
				$ahchc = $this->db->get_where('asignatura_has_curso_has_centro', $array )->row_array();
				$this->db->where($array);
				$array['Profesor_idProfesor']=$data['idProfesor'];
				$res = $this->db->update('asignatura_has_curso_has_centro', $array);
					}
					else $res = FALSE;
				return $res;
		}

		public function delete_asignatura($id)
		{
		        $test = $this->get_idAsignatura($id);

				if (!empty($test))
            {
		        $res=$this->db->delete('asignatura', array('idAsignatura' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setAsignatura($asignatura)
		{
			$data1 = array(

		        'idAsignatura' => $asignatura["idAsignatura"],
		        'nombre' => $asignatura["nombre"]

	        );

	        return $data1;
		}


}


?>