package com.cerberus.Service;

import com.cerberus.Model.Expediente;
import com.cerberus.Store.ExpedienteStore;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by IO on 12/10/2016.
 */

@Stateless
@TransactionManagement(value = TransactionManagementType.CONTAINER)
public class ExpedienteServiceImpl {

    @Inject
    ExpedienteStore expedienteStore;

    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public ExpedienteServiceImpl(){}

    public void addExpediente(Expediente expediente) {
        expedienteStore.addExpediente(expediente, entityManager);
    }

    public boolean updateExpediente(Expediente expedienteOld, Expediente expedienteNew) {
        return expedienteStore.updateExpediente(expedienteOld, expedienteNew, entityManager);
    }

    public boolean deleteExpediente(Expediente expediente) {
        return expedienteStore.deleteExpediente(expediente, entityManager);
    }

    public List<Expediente> findExpedienteAll() {
        return expedienteStore.findExpedienteAll(entityManager);
    }
}
