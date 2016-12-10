package com.cerberus.Service;

import com.cerberus.Controller.ExpedienteController;
import com.cerberus.Model.Expediente;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by Ricardo on 03/12/2016.
 */

@Stateless
@TransactionManagement(value = TransactionManagementType.CONTAINER)
public class ExpedienteServiceImpl implements ExpedienteService{

    @Inject
    private ExpedienteController expedienteController;

    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public ExpedienteServiceImpl(){}

    public void addExpediente(Expediente expediente) {
        expedienteController.addExpediente(expediente, entityManager);
    }

    public boolean updateExpediente(Expediente expedienteOld, Expediente expedienteNew) {
        return expedienteController.updateExpediente(expedienteOld, expedienteNew, entityManager);
    }

    public boolean deleteExpediente(Expediente expediente) {
        return expedienteController.deleteExpediente(expediente, entityManager);
    }

    public List<Expediente> findExpedienteAll() {
        return expedienteController.findExpedienteAll(entityManager);
    }
}
