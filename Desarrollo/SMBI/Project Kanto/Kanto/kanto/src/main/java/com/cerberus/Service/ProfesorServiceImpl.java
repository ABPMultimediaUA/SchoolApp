package com.cerberus.Service;

import com.cerberus.Controller.ProfesorController;
import com.cerberus.Model.Profesor;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by Ricardo on 02/12/2016.
 */

@Stateless
@TransactionManagement(value = TransactionManagementType.CONTAINER)
public class ProfesorServiceImpl implements ProfesorService{
    @Inject
    private ProfesorController profesorController;

    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public ProfesorServiceImpl(){}

    public void addProfesor(Profesor profesor) {
        profesorController.addProfesor(profesor, entityManager);
    }

    public boolean updateProfesor(Profesor profesorOld, Profesor profesorNew) {
        return profesorController.updateProfesor(profesorOld, profesorNew, entityManager);
    }

    public boolean deleteProfesor(Profesor profesor) {
        return profesorController.deleteProfesor(profesor, entityManager);
    }

    public List<Profesor> findProfesorAll() {
        return profesorController.findProfesorAll(entityManager);
    }
}
