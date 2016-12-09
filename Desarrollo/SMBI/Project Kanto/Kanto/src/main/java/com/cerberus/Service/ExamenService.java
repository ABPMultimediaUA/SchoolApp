package com.cerberus.Service;

import com.cerberus.Model.Examen;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Manuel on 09/12/2016.
 */
@Local
public interface ExamenService {
    

    public void addExamen(Examen examen);
    public boolean updateExamen(Examen examenOld, Examen examenNew);
    public boolean deleteExamen(Examen examen);
    public List<Examen> findExamenAll();
}