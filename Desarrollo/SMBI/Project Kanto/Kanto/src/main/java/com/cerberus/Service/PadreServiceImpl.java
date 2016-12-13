package com.cerberus.Service;

import com.cerberus.Store.PadreStore;
import com.cerberus.Model.Padre;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by Naiara on 12/12/2016.
 */

@Stateless
@TransactionManagement(value = TransactionManagementType.CONTAINER)
public class PadreServiceImpl implements PadreService {
    //Inyectamos el controlador
    @Inject
    private PadreStore padreStore;

    //Definimos el EntityManager
    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public PadreServiceImpl(){

    }

    //Operaciones CRUD basicas que tendran todas las clases relacionadas con entidades de la BD

    public void addPadre(Padre padre) {
        padreStore.addPadre(padre, entityManager);
    }

    public boolean updatePadre(Padre padreOld, Padre padreNew) {
        return padreStore.updatePadre(padreOld, padreNew, entityManager);
    }

    public boolean deletePadre(Padre padre) {
        return padreStore.deletePadre(padre, entityManager);
    }

    public List<Padre> findPadreAll() {
        return padreStore.findPadreAll(entityManager);
    }

}
