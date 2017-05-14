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
		public function get_alumnosByExamen($id)
		{
			$query = $this->db->get_where("alumno_has_examen", array('examen_idExamen'=>$id))->result_array();
			$alumnos=[];
			foreach($query as $row)
			{
				$alumno = $this->db->get_where("alumno", array('idAlumno'=>$row["alumno_idAlumno"]))->row_array();
				$alumno["nota"]=$row["nota"];
				array_push($alumnos, $alumno);
			}
			return $alumnos;
		}
		public function get_examenByProfesor($idProfesor = FALSE)
		{
			if ($idProfesor === FALSE)
			{
				return "";
			}

			$query = $this->db->get_where('examen', array('idProfesor' => $idProfesor));
			$examenes = $query->result_array();
			$arrayfinal = [];
			foreach($examenes as $examen)
			{
				$curso = $this->db->get_where("curso", array('idCurso'=>$examen["idCurso"]))->row_array();
				$asignatura = $this->db->get_where("asignatura", array('idAsignatura'=>$examen["idAsignatura"]))->row_array();				$examen["nombreAsignatura"] = $asignatura["nombre"];
				$examen["nombreCurso"] = $curso["nombre"];
				$examen["grupoCurso"] = $curso["grupo"];
				$fecha = strtotime($examen["fecha"]);
				$fecha = date("d/m/Y", $fecha);
				$examen["fecha"] = $fecha;
				array_push($arrayfinal, $examen);

			}

			return $arrayfinal;
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
		        	$examen = $this->db->get_where('examen', array('idExamen' => $row["examen_idExamen"]));
		        	$examen = $examen->row_array();
		        	$asignatura = $this->db->get_where('asignatura', array('idAsignatura' => $examen["idAsignatura"]));

		        	$examen["nota"] = $row["nota"];
		        	$asignatura=$asignatura->row_array();
		        	$examen["nombreAsignatura"] = $asignatura["nombre"];
					$fecha = strtotime($examen["fecha"]);
					$fecha = date("d/m/Y", $fecha);
					$examen["fecha"] = $fecha;
		        	array_push($examenes, $examen);
		        }
		        return $examenes;
		}

		public function get_examenByAlumnoProx($idAlumno = FALSE)
		{
		        if ($idAlumno === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('alumno_has_examen', array('alumno_idAlumno' => $idAlumno));
		        $examenes = [];
		        //$date = new Date();
		        foreach($query->result_array() as $row)
		        {
		        	$examen = $this->db->get_where('examen', array('idExamen' => $row["examen_idExamen"]));
		        	$examen = $examen->row_array();

		        	if($examen["fecha"]>=date("Y-m-d")){
		        	$asignatura = $this->db->get_where('asignatura', array('idAsignatura' => $examen["idAsignatura"]));

		        	$examen["nota"] = $row["nota"];
		        	$asignatura=$asignatura->row_array();
		        	$examen["nombreAsignatura"] = $asignatura["nombre"];
					$fecha = strtotime($examen["fecha"]);
					$fecha = date("d/m/Y", $fecha);
					$examen["fecha"] = $fecha;
		        	array_push($examenes, $examen);
		        }
		        }
		        return $examenes;
		}

		public function get_examenByAlumnoPas($idAlumno = FALSE)
		{

		        if ($idAlumno === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('alumno_has_examen', array('alumno_idAlumno' => $idAlumno));
		        $examenes = [];
		        //$date = new Date();
		        foreach($query->result_array() as $row)
		        {
		        	$examen = $this->db->get_where('examen', array('idExamen' => $row["examen_idExamen"]));
		        	$examen = $examen->row_array();

		        	if($examen["fecha"]<date("Y-m-d")){
		        	$asignatura = $this->db->get_where('asignatura', array('idAsignatura' => $examen["idAsignatura"]));

		        	$examen["nota"] = $row["nota"];
		        	$asignatura=$asignatura->row_array();
		        	$examen["nombreAsignatura"] = $asignatura["nombre"];
					$fecha = strtotime($examen["fecha"]);
					$fecha = date("d/m/Y", $fecha);
					$examen["fecha"] = $fecha;
		        	array_push($examenes, $examen);
		        }
		        }
		        return $examenes;
		}



		public function post_examen($examen)
		{
			$examen = $this->_setexamen($examen);
			$alumnos = $this->db->get_where('asignatura_has_curso_has_alumno', array('idAsignatura'=>$examen['idAsignatura'], 'idCurso'=>$examen["idCurso"]))->result_array();

		        $res=$this->db->set($examen)->insert("examen");
				$this->db->select_max('idExamen');
				$idExamen = $this->db->get('examen')->row_array();
				foreach($alumnos as $alumno)
				{
					$alumno2["alumno_idAlumno"] = $alumno["idAlumno"];
					$alumno2["examen_idExamen"] = $idExamen['idExamen'];
					$this->db->set($alumno2)->insert("alumno_has_examen", $alumno2);
				}
		        return $idExamen["idExamen"];
		}

		public function put_examen($data)
		{

				$examen = $this->_setexamen($data);
				$this->db->where('examen_idExamen', $data['idExamen']);
				$res = $this->db->update('examen', $data);
				return $res;
		}

		public function put_nota($data)
		{

			$this->db->where('examen_idExamen', $data['idExamen']);
			$this->db->where('alumno_idAlumno', $data['idAlumno']);
			$res = $this->db->update('alumno_has_examen',array('nota'=>$data['nota']) );
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

			$data1 = array();

		        if(isset($examen["idCurso"])) $data1["idCurso"]=$examen["idCurso"];
				if(isset($examen["idProfesor"])) $data1["idProfesor"]=$examen["idProfesor"];
		        if(isset($examen["idAsignatura"])) $data1["idAsignatura"]=$examen["idAsignatura"];
				if(isset($examen["titulo"])) $data1["titulo"]=$examen["titulo"];
				if(isset($examen["descripcion"])) $data1["descripcion"]=$examen["descripcion"];
				if(isset($examen["fecha"])) $data1["fecha"]=$examen["fecha"];
		        if(isset($examen["evaluacion"])) $data1["evaluacion"]=$examen["evaluacion"];


	        return $data1;
		}


}


?>