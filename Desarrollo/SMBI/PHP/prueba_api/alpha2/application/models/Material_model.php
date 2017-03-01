<?php
class Material_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }


        public function get_material($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		               $query = $this->db->get('material');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('material', array('idMaterial' => $id));
		        return $query->row_array();
		}


		public function get_asignatura($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('Asignatura_has_Curso', array('Asignatura_idAsignatura' => $id));
		        return $query->row_array();
		}
		public function get_curso($id = FALSE)
		{
		        if ($id === FALSE)
		        {
		                return "";
		        }

		        $query = $this->db->get_where('Asignatura_has_Curso', array('Curso_idCurso' => $id));
		        return $query->row_array();
		}

		

		public function post_material($material)
		{
		        $res=$this->db->set( $this->_setmaterial($material) )->insert("material");
		        return $res;
		}

		public function put_material($data)
		{
		       
				$material = $this->_setmaterial($data);
				$this->db->where('idMaterial', $material['idMaterial']);
				$res = $this->db->update('material', $material);
				return $res;
		}

		public function delete_material($id)
		{
		         $test = $this->db->get_where('material', array('idMaterial' => $id));
				
				if (!empty($test))
            {
		        $res=$this->db->delete('material', array('idMaterial' => $id));
		    }

		    else
		    	{$res = FALSE;}

		        return $res;
		}

		public function _setmaterial($material)
		{
			$data1 = array(

		        
		        'asignatura_has_curso_Curso_idCurso' => $material["asignatura_has_curso_Curso_idCurso"],
		        'asignatura_has_curso_Asignatura_idAsignatura' => $material["asignatura_has_curso_Asignatura_idAsignatura"],
		        'contenido' => $material["contenido"]
	        );

	        return $data1;
		}


}


?>