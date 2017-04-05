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
		        $res = array('NombreProfesor'=>$nombreProfesor, 'Mensajes Profesor' => $mensajes_profesor, 'Nombre Alumno'=>$nombreAlumno, 'Mensajes Alumno' => $mensajes_alumno);
		        return $res;
		}


		 public function get_mensajesByAlumno($idAlumno)
		 {
			 if ($idAlumno==NULL || $idAlumno<0)
			 {
				 return "";
			 }


			 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idAlumno'=>$idAlumno))->result_array();
			 function idp($n)
			 {
				 return($n["idProfesor"]);
			 }
			 $profesores = array_map('idp', $mensajes_profesor);
			 $profesores = array_unique($profesores);
			 $res=[];
			 foreach($profesores as $idProfesor){
				 $mensajes_alumno = $this->db->get_where('mensaje_alumno', array('idProfesor'=>$idProfesor, 'idAlumno'=>$idAlumno))->result_array();
				 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idProfesor'=>$idProfesor, 'idAlumno'=>$idAlumno))->result_array();

				 $nombreProfesor = $this->db->get_where('profesor', array('idProfesor' => $idProfesor));
				 $nombreProfesor = $nombreProfesor->row_array();
				 $nombreProfesor = $nombreProfesor["nombre"]." ".$nombreProfesor["apellidos"];
				 $nombreAlumno = $this->db->get_where('alumno', array('idAlumno' => $idAlumno));
				 $nombreAlumno = $nombreAlumno->row_array();
				 $nombreAlumno = $nombreAlumno["nombre"]." ".$nombreAlumno["apellidos"];
				 $mens = array('NombreProfesor'=>$nombreProfesor, 'Mensajes Profesor' => $mensajes_profesor, 'Nombre Alumno'=>$nombreAlumno, 'Mensajes Alumno' => $mensajes_alumno);
				 array_push($res, $mens);
			 }
			 return $res;
		 }

		 public function get_recibidosByAlumno($idAlumno)
		 {
			 if ($idAlumno==NULL || $idAlumno<0)
			 {
				 return "";
			 }


			 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idAlumno'=>$idAlumno))->result_array();
			 function idp($n)
			 {
				 return($n["idProfesor"]);
			 }
			 $profesores = array_map('idp', $mensajes_profesor);
			 $profesores = array_unique($profesores);
			 $res=[];
			 foreach($profesores as $idProfesor){

				 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idProfesor'=>$idProfesor, 'idAlumno'=>$idAlumno))->result_array();

				 $nombreProfesor = $this->db->get_where('profesor', array('idProfesor' => $idProfesor));
				 $nombreProfesor = $nombreProfesor->row_array();
				 $nombreProfesor = $nombreProfesor["nombre"]." ".$nombreProfesor["apellidos"];
				 $mens = array('NombreProfesor'=>$nombreProfesor, 'Mensajes Profesor' => $mensajes_profesor);
				 array_push($res, $mens);
			 }
			 return $res;
		 }

		 public function get_mensajesByProfesorYPadre($idPadre, $idProfesor)
		{
		        if ($idPadre==NULL || $idPadre<0 || $idProfesor==NULL || $idProfesor<0)
		        {
		               return "";
		        }


		        $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idProfesor' => $idProfesor, 'idPadre'=>$idPadre))->result_array();
		        $mensajes_padre = $this->db->get_where('mensaje_padre', array('idProfesor'=>$idProfesor, 'idPadre'=>$idPadre))->result_array();
		        $nombreProfesor = $this->db->get_where('profesor', array('idProfesor' => $idProfesor));
		        $nombreProfesor = $nombreProfesor->row_array();
		        $nombreProfesor = $nombreProfesor["nombre"]." ".$nombreProfesor["apellidos"];
		        $nombrePadre = $this->db->get_where('padre', array('idPadre' => $idPadre));
		        $nombrePadre = $nombrePadre->row_array();
		        $nombrePadre = $nombrePadre["nombre"]." ".$nombrePadre["apellidos"];
		        $res = array('NombreProfesor'=>$nombreProfesor, 'Mensajes Profesor' => $mensajes_profesor, 'Nombre Padre'=>$nombrePadre, 'Mensajes Padre' => $mensajes_padre);
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

		public function post_mensajeAlPro($mensaje)
		{
			$res=$this->db->set( $this->_setmensaje($mensaje) )->insert("mensaje_alumno");
			return $res;
		}

		public function post_mensajeProAl($mensaje)
		{
			$res=$this->db->set( $this->_setmensaje($mensaje) )->insert("mensaje_profesor");
			return $res;
		}

		public function post_mensajePaPro($mensaje)
		{
			$res=$this->db->set( $this->_setmensaje($mensaje) )->insert("mensaje_padre");
			return $res;
		}

		public function post_mensajeProPa($mensaje)
		{
			$res=$this->db->set( $this->_setmensaje($mensaje) )->insert("mensaje_profesor");
			return $res;
		}

		public function put_mensaje($data)
		{

				$mensaje = $this->_setmensaje($data);
				$this->db->where('idMensaje', $data['idMensaje']);
				$res = "Error";
				if($mensaje["idAlumno"]!=NULL){
					$res = $this->db->update('mensaje_profesor', $mensaje);
				}
				else if($mensaje["idProfesor"]!=NULL){
					if($mensaje["padre"]!=NULL)$res = $this->db->update('mensaje_padre', $mensaje);
					else if($mensaje["alumno"]!=NULL)$res = $this->db->update('mensaje_alumno', $mensaje);
				}
				else if($mensaje["idPadre"]!=NULL)
				{
					$res = $this->db->update('mensaje_profesor', $mensaje);
				}
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
			$data1 = array();

			if(isset($mensaje['asunto'])) $data1['asunto'] = $mensaje["asunto"];
		    if(isset($mensaje['idAlumno'])) $data1['idAlumno'] = $mensaje["idAlumno"];
		    if(isset($mensaje['idProfesor'])) $data1['idProfesor'] = $mensaje["idProfesor"];
			if(isset($mensaje['idPadre'])) $data1['idPadre'] = $mensaje["idPadre"];
			if(isset($mensaje['texto'])) $data1['texto'] = $mensaje["texto"];
			if(isset($mensaje['leido'])) $data1['leido'] = $mensaje["leido"];
	        return $data1;
		}


}


?>