<?php
class News_model extends CI_Model {



        public function __construct()
        {
                $this->load->database();
        }

		public function get_news($slug = FALSE)
		{
		        if ($slug === FALSE)
		        {
		                $query = $this->db->get('news');
		                return $query->result_array();
		        }

		        $query = $this->db->get_where('news', array('slug' => $slug));
		        return $query->row_array();
		}

		public function set_news()
		{
		    $this->load->helper('url');

		    $slug = url_title($this->input->post('title'), 'dash', TRUE);

		    	function normaliza ($cadena){
			    $originales = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŔŕ';
			    $modificadas = 'aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyybyRr';
			    $cadena = utf8_decode($cadena);
			    $cadena = strtr($cadena, utf8_decode($originales), $modificadas);
			    $cadena = strtolower($cadena);
			    return utf8_encode($cadena);
			} 
		    	$slug=normaliza($slug);
		    

		    $data = array(
		        'title' => $this->input->post('title'),
		        'slug' => $slug,
		        'text' => $this->input->post('text')
		    );

		    return $this->db->insert('news', $data);

		   
		}

		 public function update_news($slug)
			{

			$this->load->helper('url');
			function normaliza ($cadena){
			    $originales = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŔŕ';
			    $modificadas = 'aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyybyRr';
			    $cadena = utf8_decode($cadena);
			    $cadena = strtr($cadena, utf8_decode($originales), $modificadas);
			    $cadena = strtolower($cadena);
			    return utf8_encode($cadena);
			} 
		    	$slug2=normaliza(url_title($this->input->post('title'), 'dash', TRUE));
			$data = array(
			               'title' => $this->input->post('title'),
			               'slug' => $slug2,
			               'text' => $this->input->post('text')
			            );

			$this->db->where('slug', $slug);
			$this->db->update('news', $data); 

			}

		public function delete_news($id) 
    {
        $this->db->delete('news', array('id' => $id));
    }


}


?>