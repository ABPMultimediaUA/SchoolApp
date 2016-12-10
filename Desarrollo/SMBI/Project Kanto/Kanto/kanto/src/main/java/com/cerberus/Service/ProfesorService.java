package com.cerberus.Service;

import com.cerberus.Model.Profesor;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Ricardo on 02/12/2016.
 */
@Local
public interface ProfesorService {

    public void addProfesor(Profesor profesor);
    public boolean updateProfesor(Profesor profesorOld, Profesor profesorNew);
    public boolean deleteProfesor(Profesor profesor);
    public List<Profesor> findProfesorAll();
}
