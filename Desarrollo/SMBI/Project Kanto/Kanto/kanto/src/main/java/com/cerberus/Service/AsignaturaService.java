package com.cerberus.Service;

import com.cerberus.Model.Asignatura;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Antonio on 12/2/2016.
 */

@Local
public interface AsignaturaService {

    public void addAsignatura(Asignatura asignatura);
    public boolean updateAsignatura(Asignatura asignaturaOld, Asignatura asignaturaNew);
    public boolean deleteAsignatura(Asignatura asignatura);
    public List<Asignatura> findAsignaturaAll();
}
