package com.cerberus.Service;

import com.cerberus.Model.Mencion;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Manuel on 09/12/2016.
 */
@Local
public interface MencionService {


    public void addMencion(Mencion mencion);
    public boolean updateMencion(Mencion mencionOld, Mencion mencionNew);
    public boolean deleteMencion(Mencion mencion);
    public List<Mencion> findMencionAll();
}