<?php
class Padre_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }

        public function get_alumnos($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                
		                return "";
		        }

		        $query1 = $this->db->get_where('alumno_has_padre', array('Padre_idPadre' => $id));
		        $alumnos=[];
		        foreach($query1->result_array() as $row)
		        {
		        	$alumno = $this->db->get_where('alumno', array('idAlumno' => $row['Alumno_idAlumno']) );
		        	$alumno=array('idAlumno'=> $alumno->row_array()['idAlumno'], 'NombreAlumno' => $alumno->row_array()['nombre']." ".$alumno->row_array()['apellidos']);
		        	array_push($alumnos, $alumno);
		        }
		        return $alumnos;
		}

		public function get_padresByAlumno($idAlumno)
		{
			$padres = $this->db->get_where('alumno_has_padre', array('Alumno_idAlumno'=>$idAlumno))->result_array();
			$res = [];
			foreach($padres as $row)
			{
				$padre = $this->db->get_where('padre', array('idPadre'=>$row['Padre_idPadre']))->row_array();
				array_push($res, $padre);
			}

			return $res;
		}
		

		
		public function get_padre($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                $query = $this->db->get('padre');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('padre', array('idPadre' => $id));
		        return $query->row_array();
		}

		public function get_padreByUserName($username = FALSE)
		{
		        if ($username === FALSE )
		        {
		                return "";
		        }

		        $query = $this->db->get_where('padre', array('user' => $username));
		        return $query->row_array();
		}

		public function post_padre($padre)
		{
		        $arrayderes=[];
		        $res1 = $this->db->set( $this->_setpadre($padre) )->insert("padre"); array_push($arrayderes, $res1);
				$this->db->select_max('idPadre');
				$idPadre = $this->db->get('padre')->row_array()['idPadre'];
				$jalumnos = $padre['alumnos'];
				foreach ($jalumnos as $alumno)
				{
					$ahp = array('Alumno_idAlumno'=>$alumno, 'Padre_idPadre'=>$idPadre);
					$res3 = $this->db->set($ahp)->insert('alumno_has_padre');
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

		public function put_padre($data)
		{
		       
				$padre = $this->_setpadre($data);
				$this->db->where('idPadre', $padre['idPadre']);
				$res = $this->db->update('padre', $padre);
				return $res;
		}

		public function delete_padre($id)
		{
		        $test = $this->db->get_where('padre', array('idPadre' => $id));
				
				if (!empty($test))
            {
		        $res=$this->db->delete('padre', array('idPadre' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setPadre($padre)
		{
			$data1 = array();
				if(isset($padre['idPadre'])) $data1['idPadre'] = $padre["idPadre"];
		       if(isset($padre['nombre'])) $data1['nombre'] = $padre["nombre"];
		        if(isset($padre['email'])) $data1['email'] = $padre["email"];
		        if(isset($padre['apellidos'])) $data1['apellidos'] = $padre["apellidos"];
		        if(isset($padre['user'])) $data1['user'] = $padre["user"];
		        if(isset($padre['password'])) $data1['password'] = $padre["password"];
		        if(isset($padre['telefono'])) $data1['telefono'] = $padre["telefono"];
		        if(isset($padre['dni'])) $data1['dni'] = $padre["dni"];
	     
	        return $data1;
		}

}


?>