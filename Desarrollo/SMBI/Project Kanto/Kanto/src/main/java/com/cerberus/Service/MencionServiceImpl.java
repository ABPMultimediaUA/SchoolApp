package com.cerberus.Service;
import com.cerberus.Store.MencionStore;
import com.cerberus.Model.Mencion;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
/**
 * Created by Manuel on 09/12/2016.
 */


@Stateless
@TransactionManagement(value = TransactionManagementType.CONTAINER)
public class MencionServiceImpl implements MencionService{

    //Inyectamos el controlador
    @Inject
    private MencionStore mencionStore;

    //Definimos el EntityManager
    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public MencionServiceImpl(){

    }

    //Operaciones CRUD basicas que tendran todas las clases relacionadas con entidades de la BD

    public void addMencion(Mencion mencion) {
        mencionStore.addMencion(mencion, entityManager);
    }

    public boolean updateMencion(Mencion mencionOld, Mencion mencionNew) {
        return mencionStore.updateMencion(mencionOld, mencionNew, entityManager);
    }

    public boolean deleteMencion(Mencion mencion) {
        return mencionStore.deleteMencion(mencion, entityManager);
    }

    public List<Mencion> findMencionAll() {
        return mencionStore.findMencionAll(entityManager);
    }
}
    

