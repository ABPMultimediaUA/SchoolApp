package com.cerberus.Service;

import com.cerberus.Controller.AsignaturaController;
import com.cerberus.Model.Asignatura;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by Antonio on 12/2/2016.
 */

@Stateless
@TransactionManagement(value = TransactionManagementType.CONTAINER)
public class AsignaturaServiceImpl implements AsignaturaService{

    @Inject
    private AsignaturaController asignaturaController;

    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public AsignaturaServiceImpl(){}

    public void addAsignatura(Asignatura asignatura) {
        asignaturaController.addAsignatura(asignatura, entityManager);
    }

    public boolean updateAsignatura(Asignatura asignaturaOld, Asignatura asignaturaNew) {
        return asignaturaController.updateAsignatura(asignaturaOld, asignaturaNew, entityManager);
    }

    public boolean deleteAsignatura(Asignatura asignatura) {
        return asignaturaController.deleteAsignatura(asignatura, entityManager);
    }

    public List<Asignatura> findAsignaturaAll() {
        return asignaturaController.findAsignaturaAll(entityManager);
    }
}
