package com.cerberus.Service;

import com.cerberus.Model.Alumno;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Antonio on 01/12/2016.
 */

@Local
public interface AlumnoService {

    /**
     * Interfaz para el EJB donde definimos los metodos que vamos a implementar en la clase de implementacion
     * posteriormente
     * */

    public void addAlumno(Alumno alumno);
    public boolean updateAlumno(Alumno alumnoOld, Alumno alumnoNew);
    public boolean deleteAlumno(Alumno alumno);
    public List<Alumno> findAlumnoAll();
}
