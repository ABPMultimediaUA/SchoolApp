package com.cerberus.Service;

import com.cerberus.Model.Padre;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Naiara on 12/12/2016.
 */

@Local
public interface PadreService {

    public void addPadre(Padre padre);
    public boolean updatePadre(Padre padreOld, Padre PadreNew);
    public boolean deletePadre(Padre padre);
    public List<Padre> findPadreAll();
}
