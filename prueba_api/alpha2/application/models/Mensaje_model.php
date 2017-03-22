<?php
class Mensaje_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_mensaje($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               $query = $this->db->get('mensaje');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('mensaje', array('idMensaje' => $id));
		        return $query->row_array();
		}

		 public function get_mensajesByProfesorYAlumno($idAlumno, $idProfesor)
		{
		        if ($idAlumno==NULL || $idAlumno<0 || $idProfesor==NULL || $idProfesor<0)
		        {
		               return "";
		        }

		        $profesor = $this->db->get_where('profesor', array());

		        $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idProfesor' => $idProfesor, 'idAlumno'=>$idAlumno))->result_array();
		        $mensajes_alumno = $this->db->get_where('mensaje_alumno', array('idProfesor'=>$idProfesor, 'idAlumno'=>$idAlumno))->result_array();

		       $nombreProfesor = $this->db->get_where('profesor', array('idProfesor' => $idProfesor));
		        $nombreProfesor = $nombreProfesor->row_array();
		        $nombreProfesor = $nombreProfesor["nombre"]." ".$nombreProfesor["apellidos"];
		        $nombreAlumno = $this->db->get_where('alumno', array('idAlumno' => $idAlumno));
		        $nombreAlumno = $nombreAlumno->row_array();
		        $nombreAlumno = $nombreAlumno["nombre"]." ".$nombreAlumno["apellidos"];
		        $res = array('Nombre Profesor'=>$nombreProfesor, 'Mensajes Profesor' => $mensajes_profesor, 'Nombre Alumno'=>$nombreAlumno, 'Mensajes Alumno' => $mensajes_alumno);
		        return $res;
		}

		 public function get_mensajesByProfesorYPadre($idPadre, $idProfesor)
		{
		        if ($idPadre==NULL || $idPadre<0 || $idProfesor==NULL || $idProfesor<0)
		        {
		               return "";
		        }

		        $profesor = $this->db->get_where('profesor', array());

		        $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idProfesor' => $idProfesor, 'idPadre'=>$idPadre))->result_array();
		        $mensajes_padre = $this->db->get_where('mensaje_padre', array('idProfesor'=>$idProfesor, 'idPadre'=>$idPadre))->result_array();
		        $nombreProfesor = $this->db->get_where('profesor', array('idProfesor' => $idProfesor));
		        $nombreProfesor = $nombreProfesor->row_array();
		        $nombreProfesor = $nombreProfesor["nombre"]." ".$nombreProfesor["apellidos"];
		        $nombrePadre = $this->db->get_where('padre', array('idPadre' => $idPadre));
		        $nombrePadre = $nombrePadre->row_array();
		        $nombrePadre = $nombrePadre["nombre"]." ".$nombrePadre["apellidos"];
		        $res = array('Nombre Profesor'=>$nombreProfesor, 'Mensajes Profesor' => $mensajes_profesor, 'Nombre Padre'=>$nombrePadre, 'Mensajes Padre' => $mensajes_padre);
		        return $res;
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

		public function get_alumno($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('padre', array('Alumno_idAlumno' => $id));
		        return $query->row_array();
		}

		

		public function post_mensaje($mensaje)
		{
		        $res=$this->db->set( $this->_setmensaje($mensaje) )->insert("mensaje");
		        return $res;
		}

		public function put_mensaje($data)
		{
		       
				$mensaje = $this->_setmensaje($data);
				$this->db->where('idMensaje', $data['idMensaje']);
				$res = $this->db->update('mensaje', $data);
				return $res;
		}

		public function delete_mensaje($id)
		{
		        $test = $this->db->get_where('mensaje', array('idMensaje' => $id));
				
				if (!empty($test))
            {
		        $res=$this->db->delete('mensaje', array('idMensaje' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setmensaje($mensaje)
		{
			$data1 = array(

		        'chat_Padre_Alumno_idAlumno' => $mensaje["chat_Padre_Alumno_idAlumno"],
		        'chat_Profesor_idProfesor' => $mensaje["chat_Profesor_idProfesor"],
		        'fecha' => $mensaje["fecha"],
		        'texto' => $mensaje["texto"]
	        );

	        return $data1;
		}


}


?>