package com.cerberus.Service;

import com.cerberus.Model.Centro;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Ricardo on 10/12/2016.
 */

@Local
public interface CentroService {

    public void addCentro(Centro centro);
    public boolean updateCentro(Centro centroOld, Centro centroNew);
    public boolean deleteCentro(Centro centro);
    public List<Centro> findCentroAll();
}
