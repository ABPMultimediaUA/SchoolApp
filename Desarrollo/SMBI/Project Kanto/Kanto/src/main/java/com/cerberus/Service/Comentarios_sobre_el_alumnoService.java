package com.cerberus.Service;

import com.cerberus.Model.Comentarios_sobre_el_alumno;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Manuel on 09/12/2016.
 */
@Local
public interface Comentarios_sobre_el_alumnoService {


    public void addComentarios_sobre_el_alumno(Comentarios_sobre_el_alumno comentarios_sobre_el_alumno);
    public boolean updateComentarios_sobre_el_alumno(Comentarios_sobre_el_alumno comentarios_sobre_el_alumnoOld, Comentarios_sobre_el_alumno comentarios_sobre_el_alumnoNew);
    public boolean deleteComentarios_sobre_el_alumno(Comentarios_sobre_el_alumno comentarios_sobre_el_alumno);
    public List<Comentarios_sobre_el_alumno> findComentarios_sobre_el_alumnoAll();
}