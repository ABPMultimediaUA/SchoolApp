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
		        $this->db->set( $this->_setPadre($padre) )->insert("padre");

		        if($this->db->affected_rows()===1)
		        {
		        	return TRUE;
		        }

		        return NULL;
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
			$data1 = array(

		        'idPadre' => $padre["idPadre"],
		        'nombre' => $padre["nombre"],
		        'email' => $padre["email"],
		        'apellidos' => $padre["apellidos"],
		        'user' => $padre["user"],
		        'password' => $padre["password"],
		        'telefono' => $padre["telefono"],
		        'dni' => $padre["dni"]
	        
	        );

	        return $data1;
		}

}


?>