package com.cerberus.Service;

import com.cerberus.Model.Asignatura_has_curso_has_alumno;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Manuel on 09/12/2016.
 */
@Local
public interface Asignatura_has_curso_has_alumnoService {


    public void addAsignatura_has_curso_has_alumno(Asignatura_has_curso_has_alumno asignatura_has_curso_has_alumno);
    public boolean updateAsignatura_has_curso_has_alumno(Asignatura_has_curso_has_alumno asignatura_has_curso_has_alumnoOld, Asignatura_has_curso_has_alumno asignatura_has_curso_has_alumnoNew);
    public boolean deleteAsignatura_has_curso_has_alumno(Asignatura_has_curso_has_alumno asignatura_has_curso_has_alumno);
    public List<Asignatura_has_curso_has_alumno> findAsignatura_has_curso_has_alumnoAll();
}