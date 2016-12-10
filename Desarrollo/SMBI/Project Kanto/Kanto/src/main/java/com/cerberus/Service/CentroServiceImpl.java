package com.cerberus.Service;

import com.cerberus.Store.CentroStore;
import com.cerberus.Model.Centro;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by Ricardo on 10/12/2016.
 */

@Stateless
@TransactionManagement(value = TransactionManagementType.CONTAINER)
public class CentroServiceImpl implements CentroService{

    //Inyectamos el controlador
    @Inject
    private CentroStore centroStore;

    //Definimos el EntityManager
    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public CentroServiceImpl(){

    }

    //Operaciones CRUD basicas que tendran todas las clases relacionadas con entidades de la BD

    public void addCentro(Centro centro) {
        centroStore.addCentro(centro, entityManager);
    }

    public boolean updateCentro(Centro centroOld, Centro centroNew) {
        return centroStore.updateCentro(centroOld, centroNew, entityManager);
    }

    public boolean deleteCentro(Centro centro) {
        return centroStore.deleteCentro(centro, entityManager);
    }

    public List<Centro> findCentroAll() {
        return centroStore.findCentroAll(entityManager);
    }
}
