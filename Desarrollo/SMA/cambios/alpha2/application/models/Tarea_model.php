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

		public function get_tareasCompletadas($id = FALSE)
		{
			if ($id === FALSE)
			{
				return "";
			}

			$query = $this->db->get_where('alumno_has_tarea', array('idAlumno' => $id, 'completada' => true));
			$tareas = [];
			foreach($query->result_array() as $row)
			{
				$tarea = $this->db->get_where('tarea', array('idTarea' =>$row["idTarea"]));
				$tarea = $tarea->row_array();
				$asignatura = $this->db->get_where('asignatura', array('idAsignatura'=>$tarea["idAsignatura"]));
				$asignatura = $asignatura->row_array();
				$tarea["nota"]=$row["nota"];
				$tarea["nombreAsignatura"]=$asignatura["nombre"];
				array_push($tareas, $tarea);
			}
			return $tareas;
		}

		public function get_alumnosByTarea($idTarea)
		{
			$tareas = $this->db->get_where('alumno_has_tarea', array('idTarea' => $idTarea))->result_array();
			$alumnos = [];
			foreach($tareas as $tarea)
			{
				$alumno = $this->db->get_where('alumno', array('idAlumno' => $tarea["idAlumno"]))->row_array();
				$alumno["entregada"] = $tarea["completada"];
				$alumnofinal = [];
				$alumnofinal["nombre"] = $alumno["nombre"];
				$alumnofinal["apellidos"] = $alumno["apellidos"];
				$alumnofinal["idAlumno"] =  $alumno["idAlumno"];
				$alumnofinal["entregada"] = $alumno["entregada"];
				array_push($alumnos, $alumnofinal);
			}
			return $alumnos;

		}

		public function get_alumnosytodastareasByCursoyAsignatura($idcurso, $idasignatura)
		{
			$tareas1 = $this->db->get_where('tarea', array('idCurso' => $idcurso, 'idAsignatura'=>$idasignatura))->result_array();
			$tareas = [];

			foreach ($tareas1 as $tarea1){
				$tareas2 = $this->db->get_where('alumno_has_tarea', array('idTarea' => $tarea1["idTarea"]))->result_array();
				$alumnos = [];
				$tarea1["alumnos"]=[];
				foreach($tareas2 as $tarea2)
				{
					$alumno = $this->db->get_where('alumno', array('idAlumno' => $tarea2["idAlumno"]))->row_array();
					$alumno["entregada"] = $tarea2["completada"];
					array_push($alumnos, $alumno);
				}
				$tarea1["alumnos"]=$alumnos;
				array_push($tareas, $tarea1);
			}
			return $tareas;

		}



		public function get_tareasNoCompletadas($id = FALSE)
		{
			if ($id === FALSE)
			{
				return "";
			}

			$query = $this->db->get_where('alumno_has_tarea', array('idAlumno' => $id, 'completada' => false));
			$tareas = [];
			foreach($query->result_array() as $row)
			{
				$tarea = $this->db->get_where('tarea', array('idTarea' =>$row["idTarea"]));
				$tarea = $tarea->row_array();
				$asignatura = $this->db->get_where('asignatura', array('idAsignatura'=>$tarea["idAsignatura"]));
				$asignatura = $asignatura->row_array();
				$tarea["nota"]=$row["nota"];
				$tarea["nombreAsignatura"]=$asignatura["nombre"];
				array_push($tareas, $tarea);
			}
			return $tareas;
		}


		public function get_tareasByProfe($idProfesor)
		{
			$query = $this->db->get_where('tarea', array('idProfesor' => $idProfesor))->result_array();

			return $query;
		}




		public function post_tarea($tarea)
		{
		        $res=$this->db->set( $this->_settarea($tarea) )->insert("tarea");
		        return $res;
		}
		public function post_alumno_has_tarea()
		{
			$this->db->select_max('idTarea');
			$tarea = $this->db->get('tarea')->row_array();
			$tarea = $this->db->get_where("tarea", array("idTarea" => $tarea["idTarea"]))->row_array();
			$ahchas = $this->db->get_where('asignatura_has_curso_has_alumno', array('idCurso' => $tarea["idCurso"], 'idAsignatura' => $tarea["idAsignatura"]))->result_array();
			foreach($ahchas as $ahcha)
			{
				try{
					$aht = array("idAlumno" => $ahcha["idAlumno"], "idTarea" => $tarea["idTarea"]);
					$res=$this->db->set( $this->_setalumno_has_tarea($aht) )->insert("alumno_has_tarea");
					if(!$res) return false;
				}
				catch (Exception $e)
				{
					return false;
				}
			}
			return true;
		}

		public function put_tarea($data)
		{

			if(isset($data["completada"])&&isset($data["idAlumno"]))
			{
				$tarea1 = $this->db->get_where('alumno_has_tarea', array('idTarea'=>$data["idTarea"], 'idAlumno'=>$data["idAlumno"]));
				$tarea = $tarea1->row_array();
				$tarea["completada"] = $data["completada"];
				if(isset($data["nota"])&&$data["nota"]>=0&&$data["nota"]<=10)
				{
					$tarea["nota"] = $data["nota"];
				}
				$res = $this->db->update('alumno_has_tarea', $tarea, array('idTarea'=>$data["idTarea"], 'idAlumno'=>$data["idAlumno"]));

			}
			else if(isset($data["noCompletada"])&&isset($data["idAlumno"]))
			{
				$tarea1 = $this->db->get_where('alumno_has_tarea', array('idTarea'=>$data["idTarea"], 'idAlumno'=>$data["idAlumno"]));
				$tarea = $tarea1->row_array();
				$tarea["completada"] = false;
				if(isset($data["nota"])&&$data["nota"]>=0&&$data["nota"]<=10)
				{
					$tarea["nota"] = $data["nota"];
				}
				$res = $this->db->update('alumno_has_tarea', $tarea, array('idTarea'=>$data["idTarea"], 'idAlumno'=>$data["idAlumno"]));

			}
			else{
				$tarea = $this->_settarea($data);
				$this->db->where('idTarea', $data['idTarea']);
				$res = $this->db->update('tarea', $data);
			}
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
			$data1 = array();

		        if(isset($tarea["idCurso"])) $data1["idCurso"]=$tarea["idCurso"];
		        if(isset($tarea['idAsignatura'])) $data1["idAsignatura"] = $tarea["idAsignatura"];
				if(isset($tarea['idProfesor'])) $data1["idProfesor"] = $tarea["idProfesor"];
		        if(isset($tarea['descripcion'])) $data1["descripcion"] = $tarea["descripcion"];
				if(isset($tarea['titulo'])) $data1["titulo"] = $tarea["titulo"];
		        if(isset($tarea['fecha_limite'])) $data1["fecha_limite"] = $tarea["fecha_limite"];


	        return $data1;
		}

		public function _setalumno_has_tarea($tarea)
		{
			$data1 = array(

				'idTarea'=> $tarea["idTarea"],
		        'idAlumno' => $tarea["idAlumno"]
	        );

	        return $data1;
		}



}


?>