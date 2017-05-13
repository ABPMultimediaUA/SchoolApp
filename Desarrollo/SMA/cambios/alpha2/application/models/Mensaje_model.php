<?php

function sortFunction( $a, $b ) {
	return ($a["fecha"]) - ($b["fecha"]);
}

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

		        $mensajes_profesor = $this->db->order_by('fecha', 'ASC')->get_where('mensaje_profesor', array('idProfesor' => $idProfesor, 'idAlumno'=>$idAlumno))->result_array();
		        $mensajes_alumno = $this->db->order_by('fecha', 'ASC')->get_where('mensaje_alumno', array('idProfesor'=>$idProfesor, 'idAlumno'=>$idAlumno))->result_array();

		       $nombreProfesor = $this->db->get_where('profesor', array('idProfesor' => $idProfesor));
		        $nombreProfesor = $nombreProfesor->row_array();
		        $nombreProfesor = $nombreProfesor["nombre"]." ".$nombreProfesor["apellidos"];
		        $nombreAlumno = $this->db->get_where('alumno', array('idAlumno' => $idAlumno));
		        $nombreAlumno = $nombreAlumno->row_array();
		        $nombreAlumno = $nombreAlumno["nombre"]." ".$nombreAlumno["apellidos"];
				  if(!empty($mensajes_profesor)){$idAsignatura = $mensajes_profesor[0]['idAsignatura'];}else{$idAsignatura = $mensajes_padre[0]['idAsignatura'];}
				$asignatura = $this->db->get_where('asignatura', array('idAsignatura'=>$idAsignatura))->row_array();
				$asignatura = $asignatura["nombre"];
		        $mensajes = $this->ordenarMensajes($mensajes_alumno, $mensajes_profesor, $nombreAlumno, $nombreProfesor);
				$res = array('NombreAsignatura'=>$asignatura ,'Mensajes'=>$mensajes);
		        return $res;
		}

		 public function ordenarMensajes($mensajes_alumno, $mensajes_profesor, $nombreAlumno, $nombreProfesor)
		 {
			 for ($i=0;$i<count($mensajes_alumno);$i++)
			 {
				 $fecha = $mensajes_alumno[$i]["fecha"];
				 $fecha = new DateTime($fecha);
				 $mensajes_alumno[$i]["fecha"] = date_format($fecha, 'd/m/Y H:i:s');
				 $mensajes_alumno[$i]["nombreAlumno"] = $nombreAlumno;
			 }
			 for ($i=0;$i<count($mensajes_profesor);$i++)
			 {
				 $fecha = $mensajes_profesor[$i]["fecha"];
				 $fecha = new DateTime($fecha);
				 $mensajes_profesor[$i]["fecha"] = date_format($fecha, 'd/m/Y H:i:s');
				 $mensajes_profesor[$i]["nombreProfesor"] = $nombreProfesor;
			 }



			 $mensajes = [];

			 for($i=0;$i<(count($mensajes_profesor)+count($mensajes_alumno));$i++)
			 {
				 if(isset($mensajes_profesor[$i])&&isset($mensajes_alumno[$i]))
				 {
					 if(strtotime($mensajes_profesor[$i]["fecha"])>strtotime($mensajes_alumno[$i]["fecha"]))
					 {
						 array_push($mensajes, $mensajes_profesor[$i]);
						 array_push($mensajes, $mensajes_alumno[$i]);
					 }
					 else
					 {
						 array_push($mensajes, $mensajes_alumno[$i]);
						 array_push($mensajes, $mensajes_profesor[$i]);
					 }
				 }
				 else if (!isset($mensajes_profesor[$i])&&isset($mensajes_alumno[$i]))
					 array_push($mensajes, $mensajes_alumno[$i]);
				 else if (isset($mensajes_profesor[$i])&&!isset($mensajes_alumno[$i]))
					 array_push($mensajes, $mensajes_profesor[$i]);
			 }
			 return $mensajes;

		 }

		 public function get_mensajesByAlumno($idAlumno)
		 {	 $mensajes_alumno = $this->db->get_where('mensaje_alumno', array('idAlumno'=>$idAlumno))->result_array();
			 if(!empty($mensajes_alumno)){
			 function idp2($n)
			 {
				 return($n["idProfesor"]);
			 }
			 $profesores = array_map('idp2', $mensajes_alumno);
			 $profesores = array_unique($profesores);
			 $res=[];
			 foreach($profesores as $idProfesor){
				 $mensajes_alumno = $this->db->get_where('mensaje_alumno', array('idProfesor'=>$idProfesor, 'idAlumno'=>$idAlumno))->result_array();
				 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idProfesor'=>$idProfesor, 'idAlumno'=>$idAlumno))->result_array();
				  if(!empty($mensajes_alumno))
				 {
							for ($i=0;$i<count($mensajes_alumno);$i++)
					 {
						 $fecha = $mensajes_alumno[$i]["fecha"];
						 $fecha = new DateTime($fecha);
						 $mensajes_alumno[$i]["fecha"] = date_format($fecha, 'd/m/Y H:i:s');
					 }
				}
				 if(!empty($mensajes_profesor))
				 {
							for ($i=0;$i<count($mensajes_profesor);$i++)
					 {
						 $fecha = $mensajes_profesor[$i]["fecha"];
						 $fecha = new DateTime($fecha);
						 $mensajes_profesor[$i]["fecha"] = date_format($fecha, 'd/m/Y H:i:s');
					 }
				}
				 $nombreProfesor = $this->db->get_where('profesor', array('idProfesor' => $idProfesor));
				 $nombreProfesor = $nombreProfesor->row_array();
				 $nombreProfesor = $nombreProfesor["nombre"]." ".$nombreProfesor["apellidos"];
				 $nombreAlumno = $this->db->get_where('alumno', array('idAlumno' => $idAlumno));
				 $nombreAlumno = $nombreAlumno->row_array();
				 $nombreAlumno = $nombreAlumno["nombre"]." ".$nombreAlumno["apellidos"];
				  if(!empty($mensajes_profesor)){$idAsignatura = $mensajes_profesor[0]['idAsignatura'];}else{$idAsignatura = $mensajes_alumno[0]['idAsignatura'];}
				 $asignatura = $this->db->get_where('asignatura', array('idAsignatura'=>$idAsignatura))->row_array();
				 $asignatura = $asignatura["nombre"];
				 $mens = array('NombreAsignatura'=>$asignatura, 'idAsignatura' => $idAsignatura ,'NombreProfesor'=>$nombreProfesor, 'idProfesor'=>$idProfesor, 'MensajesProfesor' => $mensajes_profesor, 'NombreAlumno'=>$nombreAlumno, 'MensajesAlumno' => $mensajes_alumno);
				 array_push($res, $mens);
			 }
			}
			 return $res;
		 }

		  public function get_mensajesByPadre($idPadre)
		 {

			 $mensajes_padre = $this->db->get_where('mensaje_padre', array('idPadre'=>$idPadre))->result_array();
			 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idPadre'=> $idPadre))->result_array();
			 $res=[];
			 if(!empty($mensajes_padre)  ){
			 function idp2($n)
			 {
				 return($n["idProfesor"]);
			 }
			 $profesores = array_map('idp2', $mensajes_padre);
			 $profesores = array_unique($profesores);
			 
			 foreach($profesores as $idProfesor){
				 $mensajes_padre = $this->db->get_where('mensaje_padre', array('idProfesor'=>$idProfesor, 'idPadre'=>$idPadre))->result_array();
				 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idProfesor'=>$idProfesor, 'idPadre'=>$idPadre))->result_array();
				  if(!empty($mensajes_padre))
				 {
							for ($i=0;$i<count($mensajes_padre);$i++)
					 {
						 $fecha = $mensajes_padre[$i]["fecha"];
						 $fecha = new DateTime($fecha);
						 $mensajes_padre[$i]["fecha"] = date_format($fecha, 'd/m/Y H:i:s');
					 }
				}
				 if(!empty($mensajes_profesor))
				 {
							for ($i=0;$i<count($mensajes_profesor);$i++)
					 {
						 $fecha = $mensajes_profesor[$i]["fecha"];
						 $fecha = new DateTime($fecha);
						 $mensajes_profesor[$i]["fecha"] = date_format($fecha, 'd/m/Y H:i:s');
					 }
				}
				 $nombreProfesor = $this->db->get_where('profesor', array('idProfesor' => $idProfesor));
				 $nombreProfesor = $nombreProfesor->row_array();
				 $nombreProfesor = $nombreProfesor["nombre"]." ".$nombreProfesor["apellidos"];
				 $nombrePadre = $this->db->get_where('padre', array('idPadre' => $idPadre));
				 $nombrePadre = $nombrePadre->row_array();
				  if(count($mensajes_padre)<1) $mensajes_padre = NULL;
				  if(count($mensajes_profesor)<1) $mensajes_profesor = NULL;
				 $nombrePadre = $nombrePadre["nombre"]." ".$nombrePadre["apellidos"];
				  if(!empty($mensajes_profesor)){$idAsignatura = $mensajes_profesor[0]['idAsignatura'];}else{$idAsignatura = $mensajes_padre[0]['idAsignatura'];}
				 $asignatura = $this->db->get_where('asignatura', array('idAsignatura'=>$idAsignatura))->row_array();
				 $asignatura = $asignatura["nombre"];
				 $mens = array('NombreAsignatura'=>$asignatura, 'idAsignatura' => $idAsignatura ,'NombreProfesor'=>$nombreProfesor, 'idProfesor'=>$idProfesor, 'MensajesProfesor' => $mensajes_profesor, 'NombrePadre'=>$nombrePadre, 'MensajesPadre' => $mensajes_padre);
				 array_push($res, $mens);
			 }
			}
			else if(!empty($mensajes_profesor))
			{
				 function idp2($n)
			 {
				 return($n["idProfesor"]);
			 }
			 $profesores = array_map('idp2', $mensajes_profesor);
			 $profesores = array_unique($profesores);
			 
			 foreach($profesores as $idProfesor){
				 $mensajes_padre = $this->db->get_where('mensaje_padre', array('idProfesor'=>$idProfesor, 'idPadre'=>$idPadre))->result_array();
				 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idProfesor'=>$idProfesor, 'idPadre'=>$idPadre))->result_array();
				  if(!empty($mensajes_padre))
				 {
							for ($i=0;$i<count($mensajes_padre);$i++)
					 {
						 $fecha = $mensajes_padre[$i]["fecha"];
						 $fecha = new DateTime($fecha);
						 $mensajes_padre[$i]["fecha"] = date_format($fecha, 'd/m/Y H:i:s');
					 }
				}
				 if(!empty($mensajes_profesor))
				 {
							for ($i=0;$i<count($mensajes_profesor);$i++)
					 {
						 $fecha = $mensajes_profesor[$i]["fecha"];
						 $fecha = new DateTime($fecha);
						 $mensajes_profesor[$i]["fecha"] = date_format($fecha, 'd/m/Y H:i:s');
					 }
				}
				 $nombreProfesor = $this->db->get_where('profesor', array('idProfesor' => $idProfesor));
				 $nombreProfesor = $nombreProfesor->row_array();
				 $nombreProfesor = $nombreProfesor["nombre"]." ".$nombreProfesor["apellidos"];
				 $nombrePadre = $this->db->get_where('padre', array('idPadre' => $idPadre));
				 $nombrePadre = $nombrePadre->row_array();
				 $nombrePadre = $nombrePadre["nombre"]." ".$nombrePadre["apellidos"];
				  if(count($mensajes_padre)<1) $mensajes_padre = NULL;
				  if(count($mensajes_profesor)<1) $mensajes_profesor = NULL;
				  if(!empty($mensajes_profesor)){$idAsignatura = $mensajes_profesor[0]['idAsignatura'];}else{$idAsignatura = $mensajes_padre[0]['idAsignatura'];}
				 $asignatura = $this->db->get_where('asignatura', array('idAsignatura'=>$idAsignatura))->row_array();
				 $asignatura = $asignatura["nombre"];
				 $mens = array('NombreAsignatura'=>$asignatura, 'idAsignatura' => $idAsignatura ,'NombreProfesor'=>$nombreProfesor, 'idProfesor'=>$idProfesor, 'MensajesProfesor' => $mensajes_profesor, 'NombrePadre'=>$nombrePadre, 'MensajesPadre' => $mensajes_padre);
				 array_push($res, $mens);
			 }
			}
			 return $res;
		 }

		  public function get_mensajesByProfesor($idProfesor)
		 {
				
		
			$res['Padre'] = $this->ayuda_get_mensajesPadreByProfesor($idProfesor);
			$res['Alumno'] = $this->ayuda_get_mensajesAlumnoByProfesor($idProfesor);
					 
			return $res;
		 }

		 public function ayuda_get_mensajesAlumnoByProfesor($idProfesor)
		 {
			$res=NULL;
			 $mensajes_alumno = $this->db->get_where('mensaje_alumno', array('idProfesor'=>$idProfesor))->result_array();
			 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idProfesor'=>$idProfesor))->result_array();
			 $arraylleno = $mensajes_profesor;
			 if(empty($mensajes_profesor)){$arraylleno = $mensajes_alumno;} 
			// if (!function_exists('idp'))
			if(!empty($arraylleno)){
				 function ida($n)
				 {
					//if(isset($n["idAlumno"]))
					 return($n["idAlumno"]);
				 }
			 
			 $alumnos = array_map('ida', $arraylleno);
			 $alumnos = array_unique($alumnos);
			 $res=[];
			 foreach($alumnos as $idAlumno){
			 if($idAlumno!=NULL){
				 $mensajes_alumno = $this->db->get_where('mensaje_alumno', array('idProfesor'=>$idProfesor, 'idAlumno'=>$idAlumno))->result_array();
				 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idProfesor'=>$idProfesor, 'idAlumno'=>$idAlumno))->result_array();

				 $nombreProfesor = $this->db->get_where('profesor', array('idProfesor' => $idProfesor));
				 $nombreProfesor = $nombreProfesor->row_array();
				 $nombreProfesor = $nombreProfesor["nombre"]." ".$nombreProfesor["apellidos"];
				 $nombreAlumno = $this->db->get_where('alumno', array('idAlumno' => $idAlumno));
				 $nombreAlumno = $nombreAlumno->row_array();
				 $nombreAlumno = $nombreAlumno["nombre"]." ".$nombreAlumno["apellidos"];
				   if(!empty($mensajes_profesor)){$idAsignatura = $mensajes_profesor[0]['idAsignatura'];}else{$idAsignatura = $mensajes_alumno[0]['idAsignatura'];}
				 $asignatura = $this->db->get_where('asignatura', array('idAsignatura'=>$idAsignatura))->row_array();
				 $asignatura = $asignatura["nombre"];
				 $mens = array('NombreAsignatura'=>$asignatura, 'idAsignatura' => $idAsignatura ,'NombreProfesor'=>$nombreProfesor, 'idProfesor'=>$idProfesor, 'MensajesProfesor' => $mensajes_profesor, 'NombreAlumno'=>$nombreAlumno, 'MensajesAlumno' => $mensajes_alumno);
				 array_push($res, $mens);}
			 }
			 }
			 return $res;
		 }

		 public function ayuda_get_mensajesPadreByProfesor($idProfesor)
		 {
			$res=NULL;
			 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idProfesor'=>$idProfesor))->result_array();
			
			 $mensajes_padre = $this->db->get_where('mensaje_padre', array('idProfesor'=>$idProfesor))->result_array();
			 $arraylleno = $mensajes_profesor;
			 if(empty($mensajes_profesor)){$arraylleno = $mensajes_padre;} 
			 
			if (!function_exists('idp'))
			{
   		 
				function idp($n)
				 {
					if(isset($n["idPadre"]))
					 return($n["idPadre"]);
				 }
			 }
			 $padres = array_map('idp', $arraylleno);
			 $padres = array_unique($padres);
			 $res=[];
			 foreach($padres as $idPadre){
			 if($idPadre!=NULL){
				 $mensajes_padre = $this->db->get_where('mensaje_padre', array('idProfesor'=>$idProfesor, 'idPadre'=>$idPadre))->result_array();
				 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idProfesor'=>$idProfesor, 'idPadre'=>$idPadre))->result_array();

				 $nombreProfesor = $this->db->get_where('profesor', array('idProfesor' => $idProfesor));
				 $nombreProfesor = $nombreProfesor->row_array();
				 $nombreProfesor = $nombreProfesor["nombre"]." ".$nombreProfesor["apellidos"];
				 $nombrePadre = $this->db->get_where('padre', array('idPadre' => $idPadre));
				 $nombrePadre = $nombrePadre->row_array();
				 $nombrePadre = $nombrePadre["nombre"]." ".$nombrePadre["apellidos"];

				   if(!empty($mensajes_profesor)){$idAsignatura = $mensajes_profesor[0]['idAsignatura'];}else{$idAsignatura = $mensajes_padre[0]['idAsignatura'];}
				 $asignatura = $this->db->get_where('asignatura', array('idAsignatura'=>$idAsignatura))->row_array();
				 $asignatura = $asignatura["nombre"];
				  if(count($mensajes_padre)<1) $mensajes_padre = NULL;
				  if(count($mensajes_profesor)<1) $mensajes_profesor = NULL;
				 $mens = array('NombreAsignatura'=>$asignatura, 'idAsignatura' => $idAsignatura ,'NombreProfesor'=>$nombreProfesor, 'idProfesor'=>$idProfesor, 'MensajesProfesor' => $mensajes_profesor, 'idPadre'=>$idPadre, 'NombrePadre'=>$nombrePadre, 'MensajesPadre' => $mensajes_padre);
				 array_push($res, $mens);}
			 }
			 
			
			 return $res;
		 }

		 public function separar_mensajesProfesor($mensajes)
		 {
			$mensajes_propa = [];
			foreach($mensajes['MensajesProfesor'] as $mensaje)
			{
				if($mensaje['idPadre']!=NULL && $mensaje['idAlumno']==NULL){array_push($mensajes_propa, $mensaje);}
			}
			$mensajes_proal = [];
			foreach($mensajes['MensajesProfesor'] as $mensaje)
			{
				if($mensaje['idAlumno']!=NULL && $mensaje['idPadre']==NULL){array_push($mensajes_proal, $mensaje);}
			}

			$mensajes = array('MensajesProfesorPadre'=>$mensajes_propa, 'MensajesProfesorAlumno' => $mensajes_proal);
			return $mensajes;
		 }

		 public function get_mensajesByAlumno2($idAlumno, $idProfe)
		 {
			 if ($idAlumno==NULL || $idAlumno<0)
			 {
				 return "";
			 }


			 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idAlumno'=>$idAlumno, 'idProfesor'=>$idProfe))->result_array();
			 if (!function_exists('idprofe'))
			 {
				 function idprofe($n)
				 {
					 return($n["idProfesor"]);
				 }
			 }

			 $profesores = array_map("idprofe", $mensajes_profesor);
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
				 $asignatura = $this->db->get_where('asignatura', array('idAsignatura'=>$mensajes_profesor[0]["idAsignatura"]))->row_array();
				 $asignatura = $asignatura["nombre"];
				 $mens = array('NombreAsignatura'=>$asignatura, 'idAsignatura' => $mensajes_profesor[0]['idProfesor'] ,'NombreProfesor'=>$nombreProfesor, 'idProfesor'=>$mensajes_profesor[0]['idProfesor'], 'MensajesProfesor' => $mensajes_profesor, 'NombreAlumno'=>$nombreAlumno, 'MensajesAlumno' => $mensajes_alumno);
				 array_push($res, $mens);
			 }
			 return $res;
		 }

		  public function get_mensajesByPadre2($idPadre, $idProfe)
		 {
			 if ($idPadre==NULL || $idPadre<0)
			 {
				 return "";
			 }


			 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idPadre'=>$idPadre, 'idProfesor'=>$idProfe))->result_array();
			 if (!function_exists('idprofe'))
			 {
				 function idprofe2($n)
				 {
					 return($n["idProfesor"]);
				 }
			 }

			 $profesores = array_map("idprofe2", $mensajes_profesor);
			 $profesores = array_unique($profesores);
			 $res=[];
			 foreach($profesores as $idProfesor){
				 $mensajes_Padre = $this->db->get_where('mensaje_padre', array('idProfesor'=>$idProfesor, 'idPadre'=>$idPadre))->result_array();
				 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idProfesor'=>$idProfesor, 'idPadre'=>$idPadre))->result_array();

				 $nombreProfesor = $this->db->get_where('profesor', array('idProfesor' => $idProfesor));
				 $nombreProfesor = $nombreProfesor->row_array();
				 $nombreProfesor = $nombreProfesor["nombre"]." ".$nombreProfesor["apellidos"];
				 $nombrePadre = $this->db->get_where('padre', array('idPadre' => $idPadre));
				 $nombrePadre = $nombrePadre->row_array();
				 $nombrePadre = $nombrePadre["nombre"]." ".$nombrePadre["apellidos"];
				   if(!empty($mensajes_profesor)){$idAsignatura = $mensajes_profesor[0]['idAsignatura'];}else{$idAsignatura = $mensajes_padre[0]['idAsignatura'];}
				 $asignatura = $this->db->get_where('asignatura', array('idAsignatura'=>$idAsignatura))->row_array();
				 $asignatura = $asignatura["nombre"];
				 $mens = array('NombreAsignatura'=>$asignatura, 'idAsignatura' => $idAsignatura ,'NombreProfesor'=>$nombreProfesor, 'idProfesor'=>$mensajes_profesor[0]['idProfesor'], 'MensajesProfesor' => $mensajes_profesor, 'NombrePadre'=>$nombrePadre, 'MensajesPadre' => $mensajes_Padre);
				 array_push($res, $mens);
			 }
			 return $res;
		 }

		 public function get_enviadosByAlumno($idAlumno, $idProfesor)
		 {


			 $mensajes_alumno = $this->db->get_where('mensaje_alumno', array('idAlumno'=>$idAlumno, 'idProfesor'=>$idProfesor))->result_array();

			 return $mensajes_alumno;
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
				 $mens = array('NombreProfesor'=>$nombreProfesor, 'MensajesProfesor' => $mensajes_profesor);
				 array_push($res, $mens);
			 }
			 return $res;
		 }

		  public function get_noLeidosByProfesor($idProfesor)
		 {

			 $mensajes_padre = $this->db->get_where('mensaje_padre', array('idProfesor'=>$idProfesor))->result_array();
			 $mensajes_alumno =  $this->db->get_where('mensaje_alumno', array('idProfesor'=>$idProfesor))->result_array();
			 
			 $resPa=[];
			 $resAl=[];
			 foreach($mensajes_alumno as $mensaje){
				if($mensaje['leido']==0){array_push($resAl, $mensaje);}
			 }
			 foreach($mensajes_padre as $mensaje){
				if($mensaje['leido']==0){array_push($resPa, $mensaje);}
			 }
			 $res=[];
			 $res['Alumno'] = $resAl;
			 $res['Padre'] = $resPa;
			 return $res;
		 }

		   public function get_leidosByProfesor($idProfesor)
		 {

			 $mensajes_padre = $this->db->get_where('mensaje_padre', array('idProfesor'=>$idProfesor))->result_array();
			 $mensajes_alumno =  $this->db->get_where('mensaje_alumno', array('idProfesor'=>$idProfesor))->result_array();
			 
			 $resPa=[];
			 $resAl=[];
			 foreach($mensajes_alumno as $mensaje){
				if($mensaje['leido']==1){array_push($resAl, $mensaje);}
			 }
			 foreach($mensajes_padre as $mensaje){
				if($mensaje['leido']==1){array_push($resPa, $mensaje);}
			 }
			 $res=[];
			 $res['Alumno'] = $resAl;
			 $res['Padre'] = $resPa;
			 return $res;
		 }


		  public function get_enviadosByPadre($idPadre, $idProfesor)
		 {


			 $mensajes_padre = $this->db->get_where('mensaje_padre', array('idPadre'=>$idPadre, 'idProfesor'=>$idProfesor))->result_array();

			 return $mensajes_padre;
		 }
		 public function get_recibidosByPadre($idPadre)
		 {
			 if ($idPadre==NULL || $idPadre<0)
			 {
				 return "";
			 }


			 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idPadre'=>$idPadre))->result_array();
			 function idp($n)
			 {
				 return($n["idProfesor"]);
			 }
			 $profesores = array_map('idp', $mensajes_profesor);
			 $profesores = array_unique($profesores);
			 $res=[];
			 foreach($profesores as $idProfesor){

				 $mensajes_profesor = $this->db->get_where('mensaje_profesor', array('idProfesor'=>$idProfesor, 'idPadre'=>$idPadre))->result_array();

				 $nombreProfesor = $this->db->get_where('profesor', array('idProfesor' => $idProfesor));
				 $nombreProfesor = $nombreProfesor->row_array();
				 $nombreProfesor = $nombreProfesor["nombre"]." ".$nombreProfesor["apellidos"];
				 $mens = array('NombreProfesor'=>$nombreProfesor, 'MensajesProfesor' => $mensajes_profesor);
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
		        $res = array('NombreProfesor'=>$nombreProfesor, 'MensajesProfesor' => $mensajes_profesor, 'NombrePadre'=>$nombrePadre, 'MensajesPadre' => $mensajes_padre);
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

				$mensaje = $data;
				$this->db->where('idMensaje', $data['idMensaje']);
				$res = "Error";
				if(isset($mensaje["idAlumno"]) && $mensaje["idAlumno"]!=NULL){
					$res = $this->db->update('mensaje_alumno', $mensaje);
				}
				else if(isset($mensaje["idProfesor"]) && $mensaje["idProfesor"]!=NULL){
					$res = $this->db->update('mensaje_profesor', $mensaje);
					
				}
				else if(isset($mensaje["idPadre"]) && $mensaje["idPadre"]!=NULL)
				{
					$res = $this->db->update('mensaje_padre', $mensaje);
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
			if(isset($mensaje['idMensaje'])) $data1['idMensaje'] = $mensaje["idMensaje"];
			 if(isset($mensaje['idAsignatura'])) $data1['idAsignatura'] = $mensaje["idAsignatura"];
			if(isset($mensaje['idPadre'])) $data1['idPadre'] = $mensaje["idPadre"];
			if(isset($mensaje['texto'])) $data1['texto'] = $mensaje["texto"];
			if(isset($mensaje['leido'])) $data1['leido'] = $mensaje["leido"];
	        return $data1;
		}


}


?>