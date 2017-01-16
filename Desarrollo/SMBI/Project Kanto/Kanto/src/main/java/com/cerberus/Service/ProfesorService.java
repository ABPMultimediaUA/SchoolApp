package com.cerberus.Service;

import com.cerberus.Model.Profesor;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Naiara on 12/12/2016.
 */

@Local
public interface ProfesorService {
    /**
     * Interfaz para el EJB donde definimos los metodos que vamos a implementar en la clase de implementacion
     * posteriormente
     * */

    public void addProfesor(Profesor profesor);
    public boolean updateProfesor(Profesor profesorOld, Profesor profesorNew);
    public boolean deleteProfesor(Profesor profesor);
    public List<Profesor> findProfesorAll();
}
