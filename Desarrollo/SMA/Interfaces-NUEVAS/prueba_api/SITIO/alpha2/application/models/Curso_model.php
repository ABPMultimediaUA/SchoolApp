<?php
class Curso_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


		public function get_cursoByAlumno($idAlumno)
		{


			$query = $this->db->get_where('alumno_has_curso', array('idAlumno' => $idAlumno));
			$cursos=[];
			foreach($query->result_array() as $row)
			{
				$curso =  $this->db->get_where('curso', array('idCurso' => $row["idCurso"]))->row_array();
				$curso["curso"]=$row["anyo"]."-".$row["anyo2"];
				array_push($cursos, $curso);
			}
			return $cursos;
		}

		public function get_cursoByProfesor($idProfesor)
		{


			$query = $this->db->get_where('asignatura_has_curso_has_centro', array('Profesor_idProfesor' => $idProfesor));
			$cursos=[];
			foreach($query->result_array() as $row)
			{
				$curso =  $this->db->get_where('curso', array('idCurso' => $row["Curso_idCurso"]))->row_array();
				//$curso["curso"]=$row["anyo"]."-".$row["anyo2"];
				if(!in_array($curso, $cursos))
				array_push($cursos, $curso);
			}
			return $cursos;
		}

		public function get_cursosByCentro($idCentro)
		{


			$query = $this->db->get_where('curso', array('centro_idCentro' => $idCentro))->result_array();
			
			return $query;
		}


        public function get_centro($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               return "";
		        }

		        $query = $this->db->get_where('centro', array('idCentro' => $id));
		        return $query->row_array();
		}
		public function get_profesor($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               return "";
		        }

		        $query = $this->db->get_where('profesor', array('idProfesor' => $id));
		        return $query->row_array();
		}

		public function get_idcurso($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('curso', array('idCurso' => $id));
		        return $query->row_array();
		}


		public function get_curso($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                $query = $this->db->get('curso');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('curso', array('idCurso' => $id));
		        return $query->row_array();
		}

		public function post_curso($curso)
		{
		       $res = $this->db->set( $this->_setcurso($curso) )->insert("curso");
		        return $res;
		}

		public function put_curso($data)
		{

				$curso = $this->_setcurso($data);
				$this->db->where('idCurso', $data['idCurso']);
				$this->db->where('centro_idCentro', $data['idCentro']);
				$res = $this->db->update('curso', $curso);
				return $res;
		}

		public function delete_curso($id)
		{
		        $test = $this->db->get_where('curso', array('idCurso' => $id));

				if (!empty($test))
            {
		        $res=$this->db->delete('curso', array('idCurso' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setcurso($curso)
		{
			$data1 = array();

		       if(isset($curso["idProfesor"]))$data1['Profesor_idProfesor'] = $curso["idProfesor"];
		       if(isset($curso['grupo'])) $data1['grupo'] = $curso["grupo"];
		       if(isset($curso[ 'nombre'])) $data1['nombre'] = $curso["nombre"];
			   if(isset($curso['idCentro'])) $data1['centro_idCentro'] = $curso["idCentro"];

	        return $data1;
		}


}


?>