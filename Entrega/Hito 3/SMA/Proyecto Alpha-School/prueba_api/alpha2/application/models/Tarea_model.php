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



		public function post_tarea($tarea)
		{
		        $res=$this->db->set( $this->_settarea($tarea) )->insert("tarea");
		        return $res;
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
			$data1 = array(

		        'idCurso' => $tarea["idCurso"],
		        'idAsignatura' => $tarea["idAsignatura"],
		        'idAlumno' => $tarea["idAlumno"],
				'idCentro' => $tarea["idCentro"],
		        'completada' => $tarea["completada"],
		        'descripcion' => $tarea["descripcion"],
		        'fecha_limite' => $tarea["fecha_limite"]
	        );

	        return $data1;
		}


}


?>