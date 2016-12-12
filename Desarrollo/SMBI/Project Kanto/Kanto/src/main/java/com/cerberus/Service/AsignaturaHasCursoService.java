package com.cerberus.Service;

import com.cerberus.Model.AsignaturaHasCurso;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Ricardo on 10/12/2016.
 */

@Local
public interface AsignaturaHasCursoService {

    public void addAsignaturaHasCursoService(AsignaturaHasCursoService asignaturaHasCursoService);
    public boolean updateAsignaturaHasCursoService(AsignaturaHasCursoService asignaturaHasCursoServiceOld, AsignaturaHasCursoService asignaturaHasCursoServiceNew);
    public boolean deleteAsignaturaHasCursoService(AsignaturaHasCursoService asignaturaHasCursoServic);
    public List<AsignaturaHasCursoService> findAsignaturaHasCursoServiceAll();
}
