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

		 public function get_comunicadosByUserAlumno($user= FALSE)
		{
		        if ($user === FALSE)
		        {
		               $query = $this->db->get('comunicado');
		                return $query->result_array();
		        }

		        $alumno = $this->db->get_where('alumno', array('user'=>$user));
		        $idAlumno = $alumno->row_array()["idAlumno"];
		        $query = $this->db->get_where('confirmacion_comunicado', array('alumno_idAlumno' => $idAlumno));
		        $comunicados=[];
		        foreach($query as $row)
		        {
		        	array_push($comunicados, $this->db->get_where('comunicado', array('idComunicado'=>$row["comunicado_idComunicado"])));
		        }
		        return $comunicados;
		}


		 public function get_comunicadosByAlumno($idAlumno = FALSE)
		 {
			 if ($idAlumno === FALSE)
			 {
				 return "";
			 }

			 $query = $this->db->get_where('confirmacion_comunicado', array('alumno_idAlumno' => $idAlumno));
			 $comunicados=[];
			 foreach($query->result_array() as $row)
			 {
				 $comunicado = $this->db->get_where('comunicado', array('idComunicado'=>$row["comunicado_idComunicado"]))->row_array();
				 $tipo = $this->db->get_where('tipocomunicado', array('idTipoComunicado'=>$comunicado["tipo"]))->row_array();
				 $asignatura = $this->db->get_where('asignatura', array('idAsignatura'=>$comunicado["idAsignatura"]))->row_array();
				 $profesor = $this->db->get_where('profesor', array('idProfesor'=>$comunicado["idProfesor"]))->row_array();
				 $comunicado["profesor"] = $profesor["nombre"]." ".$profesor["apellidos"];
				 $comunicado["tipoComunicado"] = $tipo["nombre"];
				 $comunicado["asignatura"] = $asignatura["nombre"];
				 $leido = false;
				 if($row["leidoAlumno"]==1){$leido = true;}
				 $comunicado["leidoAlumno"] = $leido;
				 array_push($comunicados, $comunicado);
			 }
			 return $comunicados;
		 }

		 public function get_comunicadosByProfesor($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               $query = $this->db->get('comunicado');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('comunicado', array('idProfesor' => $id));
		        $comunicados=[];
		        foreach($query as $row)
		        {
		        	array_push($comunicados, $this->db->get_where('comunicado', array('idComunicado'=>$row["idComunicado"])));
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
			if(isset($data["leido"])&&$data["leido"]&&isset($data["idAlumno"])&&isset($data["idComunicado"]))
			{
				$comunicado1 = $this->db->get_where('confirmacion_comunicado', array('comunicado_idComunicado'=>$data["idComunicado"], 'alumno_idAlumno'=>$data["idAlumno"]));
				$comunicado = $comunicado1->row_array();
				$comunicado["leidoAlumno"] = 1;

				$res = $this->db->update('confirmacion_comunicado', $comunicado, array('comunicado_idComunicado'=>$data["idComunicado"], 'alumno_idAlumno'=>$data["idAlumno"]));

			}


			else if(isset($data["noleido"])&&$data["noleido"]&&isset($data["idAlumno"])&&isset($data["idComunicado"]))
			{
				$comunicado1 = $this->db->get_where('confirmacion_comunicado', array('comunicado_idComunicado'=>$data["idComunicado"], 'alumno_idAlumno'=>$data["idAlumno"]));
				$comunicado = $comunicado1->row_array();
				$comunicado["leidoAlumno"] = 0;

				$res = $this->db->update('confirmacion_comunicado', $comunicado, array('comunicado_idComunicado'=>$data["idComunicado"], 'alumno_idAlumno'=>$data["idAlumno"]));

			}



			else{
				$comunicado = $this->_setcomunicado($data);
				$this->db->where('idComunicado', $data['idComunicado']);
				$res = $this->db->set('comunicado', $comunicado);
			}
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


			$data1 = array();
			if(isset($comunicado["idCurso"])){$data["idCurso"]=$comunicado["idCurso"];}
			if(isset($comunicado["idAsignatura"])){$data["idAsignatura"]=$comunicado["idAsignatura"];}
			if(isset($comunicado["texto"])){$data["texto"]=$comunicado["texto"];}
			if(isset($comunicado["tipo"])){$data["tipo"]=$comunicado["tipo"];}
			if(isset($comunicado["fecha"])){$data["fecha"]=$comunicado["fecha"];}
			if(isset($comunicado["titulo"])){$data["titulo"]=$comunicado["titulo"];}
			if(isset($comunicado["idProfesor"])){$data["idProfesor"]=$comunicado["idProfesor"];}

	        return $data1;
		}


}


?>