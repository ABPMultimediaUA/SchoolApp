package com.cerberus.Service;

import com.cerberus.Model.Expediente;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Ricardo on 03/12/2016.
 */
@Local
public interface ExpedienteService {

    public void addExpediente(Expediente expediente);
    public boolean updateExpediente(Expediente expediente, Expediente expedienteNew);
    public boolean deleteExpediente(Expediente expediente);
    public List<Expediente> findExpedienteAll();
}
