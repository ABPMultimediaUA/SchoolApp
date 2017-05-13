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


		public function get_listaAsistencias($idAsignatura, $idCurso, $fecha)
		{


			$res=[];
			$alumnos = $this->db->get_where('asignatura_has_curso_has_alumno', array('idCurso'=> $idCurso, 'idAsignatura'=>$idAsignatura))->result_array();

			foreach($alumnos as $row){
				$alumno = $this->db->get_where('alumno', array('idAlumno'=>$row['idAlumno']))->row_array();
				$alumno1['idAlumno'] = $alumno['idAlumno'];
				$alumno1['nombre']=$alumno["nombre"];
				$alumno1['apellidos']=$alumno["apellidos"];
				$alumno1['falta'] = 0;
				$comprobacion = $this->db->get_where('asistencia', array('idAsignatura' => $idAsignatura, 'idCurso'=> $idCurso, 'fecha'=>$fecha, 'idAlumno'=>$row['idAlumno']))->row_array();
				if(!empty($comprobacion))
				{
					$alumno1['falta'] = 1;
					if($comprobacion["justificada"]==0)
					{
						$alumno1["idAsistencia"]=$comprobacion['idAsistencia'];
					}
					else
					{
						$alumno1["idAsistencia"]=$comprobacion['idAsistencia'];
						$alumno1['falta'] = 0;
					}
				}
				else{
					unset($alumno1["justificada"]);
					unset($alumno1["idAsistencia"]);
					$alumno1['falta'] = 0;
				}

				array_push($res, $alumno1);
			}


			return $res;
		}


		public function get_asignatura($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('idAsignatura', array('idAsignatura' => $id));
		        return $query->row_array();
		}
		public function get_curso($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('idCurso', array('idCurso' => $id));
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

		        $query = $this->db->get_where('asistencia', array('idAlumno' => $alumno));

		        $res=[];

		        foreach($query->result_array() as $row)
		        {

		        	if($row["fecha"]==$fecha){
			        	

						$asignatura = $this->db->get_where('asignatura', array('idAsignatura' => $row["idAsignatura"]));

						$profesor = $this->db->get_where('profesor', array('idProfesor' => $row["idProfesor"]));

						$row['profesor']=$profesor->row_array()["nombre"]." ".$profesor->row_array()["apellidos"];
						$row["NombreAsignatura"]=$asignatura->row_array()["nombre"];


						array_push($res, $row);
					}
		        }




		        return $res;
		}

		public function get_justificantesByProfesor($idProfesor)
		{
			$query = $this->db->get_where('asistencia', array('idProfesor'=>$idProfesor))->result_array();
			$justificantes = [];
			foreach($query as $row)
			{
				if($row['justificante']!=NULL){
					$asignatura = $this->db->get_where('asignatura', array('idAsignatura'=>$row['idAsignatura']))->row_array();
					$curso = $this->db->get_where('curso', array('idCurso'=>$row['idCurso']))->row_array();
					$alumno = $this->db->get_where('alumno', array('idAlumno'=>$row['idAlumno']))->row_array();
					$padre = $this->db->get_where('alumno_has_padre', array('Alumno_idAlumno'=>$row['idAlumno']))->row_array();
					$padre = $this->db->get_where('padre', array('idPadre'=>$padre['Padre_idPadre']))->row_array();
					$row['NombrePadre'] = $padre['nombre'];
					$row['ApellidosPadre'] = $padre['apellidos'];
					$row['DNI_Padre'] = $padre['dni'];
					$row['NombreAlumno'] = $alumno['nombre'];
					$row['ApellidosAlumno'] = $alumno['apellidos'];
					$row['NombreAsignatura'] = $asignatura['nombre'];
					$row['NombreCurso'] = $curso['nombre'];
					$row['GrupoCurso'] = $curso['grupo'];
					$retrieved = $row['fecha'];
					$date = DateTime::createFromFormat('Y-m-d', $retrieved);
					$fecha = $date->format('d/m/Y');
					$row["fecha"] = $fecha;
					array_push($justificantes, $row);
				}
			}
			return $justificantes;
		}

		public function get_asistenciaByAlumno($alumno = FALSE)
		{
		        if ($alumno === FALSE)
		        {

		                return "";
		        }

		        $query = $this->db->get_where('asistencia', array('idAlumno' => $alumno));

		        $res=[];

		        foreach($query->result_array() as $row)
		        {
		        	

					$asignatura = $this->db->get_where('asignatura', array('idAsignatura' => $row["idAsignatura"]));

					$profesor = $this->db->get_where('profesor', array('idProfesor' => $row["idProfesor"]));

					$row['profesor']=$profesor->row_array()["nombre"]." ".$profesor->row_array()["apellidos"];

					$row["NombreAsignatura"]=$asignatura->row_array()["nombre"];


					$retrieved = $row['fecha'];
				$date = DateTime::createFromFormat('Y-m-d', $retrieved);
				$fecha = $date->format('d/m/Y');
				$row["fecha"] = $fecha;

					array_push($res, $row);
		        }


		        return $res;
		}







		public function post_asistencia($asistencia)
		{
				$asistencia = $this->_setasistencia($asistencia);
		        if($asistencia!="")
					$res= $this->db->set( $asistencia)->insert("asistencia");
				else
					$res = FALSE;

		       return $res;
		}

		public function put_asistencia($data)
		{
			$res = FALSE;
				$asistencia = $this->_setasistenciaPUT($data);
				if(isset($asistencia['idAsistencia'])){
					$this->db->where('idAsistencia', $asistencia['idAsistencia']);
					$res = $this->db->update('asistencia', $asistencia);
				}
				else {

					$id=$this->db->get_where('asistencia', array('idAlumno'=>$asistencia['idAlumno'], 'idAsignatura'=>$asistencia['idAsignatura'], 'idCurso'=>$asistencia['idCurso'], 'idProfesor'=>$asistencia['idProfesor'], 'fecha'=>$asistencia['fecha'] ))->row_array()['idAsistencia'];
					$this->db->set($asistencia);
					$this->db->where('idAsistencia', $id);
					$res=$this->db->update('asistencia');
				}
				return $res;
		}

		public function delete_asistencia($data)
		{
			$id=$this->db->get('asistencia', array('idAlumno'=>$data['idAlumno'], 'idAsignatura'=>$data['idAsignatura'], 'idCurso'=>$data['idCurso'], 'idProfesor'=>$data['idProfesor'], 'fecha'=>$data['fecha'] ))->row_array()['idAsistencia'];

		        $res=$this->db->delete('asistencia', array('idAsistencia'=>$id ));
			return $res;
		}

		public function _setasistencia($asistencia)
		{

			$data1 = array();
			$comprobacion = false;
				if(isset ($asistencia['idCurso'])) $data1["idCurso"] = $asistencia["idCurso"];
		        if(isset ($asistencia['idAsignatura'])) $data1["idAsignatura"] = $asistencia["idAsignatura"];
				if(isset ($asistencia['idAsistencia'])) $data1["idAsistencia"] = $asistencia["idAsistencia"];
				if(isset ($asistencia['idProfesor'])) $data1["idProfesor"] = $asistencia["idProfesor"];
		        if(isset ($asistencia['idAlumno'])) $data1["idAlumno"] = $asistencia["idAlumno"];
		        if(isset ($asistencia['descripcion'])) $data1["descripcion"] = $asistencia["descripcion"];
		        if(isset ($asistencia['justificada'])) $data1["justificada"] = $asistencia["justificada"];
				if(isset ($asistencia['justificante'])) $data1["justificante"] = $asistencia["justificante"];
		        if(isset ($asistencia['fecha'])){
					$retrieved = $asistencia['fecha'];
					$date = DateTime::createFromFormat('dmY', $retrieved);
					$fecha = $date->format('Y-m-d');
					$data1["fecha"] = $fecha;
					$comprobacion = $this->db->get_where('asistencia', array('idAlumno'=>$asistencia['idAlumno'], 'fecha'=>$fecha, 'idCurso'=>$asistencia['idCurso'], 'idAsignatura'=>$asistencia['idAsignatura'], 'idProfesor'=>$asistencia['idProfesor'] ))->row_array();
					if(!empty($comprobacion)){$comprobacion=true;}
				}

				if($comprobacion){$data1 = "";}
	        return $data1;
		}

		public function _setasistenciaPUT($asistencia)
		{

			$data1 = array();
			$comprobacion = false;
			if(isset ($asistencia['idCurso'])) $data1["idCurso"] = $asistencia["idCurso"];
			if(isset ($asistencia['idAsignatura'])) $data1["idAsignatura"] = $asistencia["idAsignatura"];
			if(isset ($asistencia['id'])) $data1["idAsistencia"] = $asistencia["id"];
			if(isset ($asistencia['idAsistencia'])) $data1["idAsistencia"] = $asistencia["idAsistencia"];
			if(isset ($asistencia['idProfesor'])) $data1["idProfesor"] = $asistencia["idProfesor"];
			if(isset ($asistencia['idAlumno'])) $data1["idAlumno"] = $asistencia["idAlumno"];
			if(isset ($asistencia['descripcion'])) $data1["descripcion"] = $asistencia["descripcion"];
			if(isset ($asistencia['justificada'])) $data1["justificada"] = $asistencia["justificada"];
			if(isset ($asistencia['justificante'])) $data1["justificante"] = $asistencia["justificante"];
			if(isset ($asistencia['fecha'])){
				$retrieved = $asistencia['fecha'];
				$date = DateTime::createFromFormat('dmY', $retrieved);
				$fecha = $date->format('Y-m-d');
				$data1["fecha"] = $fecha;

			}

	        return $data1;
		}


}


?>