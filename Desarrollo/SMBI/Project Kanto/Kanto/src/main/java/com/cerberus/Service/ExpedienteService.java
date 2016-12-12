package com.cerberus.Service;

import com.cerberus.Model.Expediente;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by IO on 12/10/2016.
 */

@Local
public interface ExpedienteService {

    public void addExpediente(Expediente expediente);
    public boolean updateExpediente(Expediente expedienteOld, Expediente expedienteNew);
    public boolean deleteExpediente(Expediente expediente);
    public List<Expediente> findExpedienteAll();
}
