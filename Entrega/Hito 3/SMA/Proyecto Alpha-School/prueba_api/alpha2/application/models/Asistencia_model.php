<?php
class Asistencia_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_idasistencia($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               return "";
		        }

		        $query = $this->db->get_where('asistencia', array('idAsistencia' => $id));
		        return $query->row_array();
		}


		public function get_asignatura($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('Asignatura_has_Curso_has_asistencia_idAsignatura', array('idAsignatura' => $id));
		        return $query->row_array();
		}
		public function get_curso($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('Asignatura_has_Curso_has_asistencia_idCurso', array('idCurso' => $id));
		        return $query->row_array();
		}

		public function get_asistencia($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('asistencia', array('idAsistencia' => $id));
		        return $query->row_array();
		}

		public function get_asistenciasByAlumnoYFecha($alumno , $fecha )
		{
		        if ($fecha==""||$fecha==NULL||$alumno==""||$alumno==NULL)
		        {
		               
		                return "";
		        }

		        $query = $this->db->get_where('asistencia', array('Asignatura_has_Curso_has_Alumno_idAlumno' => $alumno));

		        $res=[];

		        foreach($query->result_array() as $row)
		        {
		        	
		        	if($row["fecha"]==$fecha){
			        	if($row["justificada"]==0)
						{
							$row["justificada"]="No";
						}
						else
						{
							$row["justificada"]="Sí";
						}

						$asignatura = $this->db->get_where('asignatura', array('idAsignatura' => $row["Asignatura_has_Curso_has_Alumno_idAsignatura"]));

						$profesor = $this->db->get_where('profesor', array('idProfesor' => $row["idProfesor"]));

						$row['profesor']=$profesor->row_array()["nombre"]." ".$profesor->row_array()["apellidos"];
						$row["NombreAsignatura"]=$asignatura->row_array()["nombre"];


						array_push($res, $row);
					}
		        }


			
		       
		        return $res;
		}



		public function get_asistenciaByAlumno($alumno = FALSE)
		{
		        if ($alumno === FALSE)
		        {
		               
		                return "";
		        }

		        $query = $this->db->get_where('asistencia', array('Asignatura_has_Curso_has_Alumno_idAlumno' => $alumno));

		        $res=[];

		        foreach($query->result_array() as $row)
		        {
		        	if($row["justificada"]==0)
					{
						$row["justificada"]="No";
					}
					else
					{
						$row["justificada"]="Sí";
					}

					$asignatura = $this->db->get_where('asignatura', array('idAsignatura' => $row["Asignatura_has_Curso_has_Alumno_idAsignatura"]));

					$profesor = $this->db->get_where('profesor', array('idProfesor' => $row["idProfesor"]));

					$row['profesor']=$profesor->row_array()["nombre"]." ".$profesor->row_array()["apellidos"];

					$row["NombreAsignatura"]=$asignatura->row_array()["nombre"];

					array_push($res, $row);
		        }
			
		       
		        return $res;
		}


		


		

		public function post_asistencia($asistencia)
		{
		        $res= $this->db->set( $this->_setasistencia($asistencia) )->insert("asistencia");

		       return $res;
		}

		public function put_asistencia($data)
		{
		       
				$asistencia = $this->_setasistencia($data);
				$this->db->where('idAsistencia', $data['idAsistencia']);
				$res = $this->db->update('asistencia', $data);
				return $res;
		}

		public function delete_asistencia($id)
		{
		        $test = $this->get_idAsistencia($id);
				
				if (!empty($test))
            {
		        $res=$this->db->delete('asistencia', array('idAsistencia' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setasistencia($asistencia)
		{
			$data1 = array(

		        'Asignatura_has_Curso_has_Asistencia_idCurso' => $asistencia["Asignatura_has_Curso_has_Alumno_idCurso"],
		        'Asignatura_has_Curso_has_Alumno_idAsignatura' => $asistencia["Asignatura_has_Curso_has_Alumno_idAsignatura"],
		        'Asignatura_has_Curso_has_Alumno_idAlumno' => $asistencia["Asignatura_has_Curso_has_Alumno_idAlumno"],
		        'descripcion' => $asistencia["descripcion"],
		        'justificada' => $asistencia["justificada"],
		        'fecha' => $asistencia["fecha"]
	        );

	        return $data1;
		}


}


?>