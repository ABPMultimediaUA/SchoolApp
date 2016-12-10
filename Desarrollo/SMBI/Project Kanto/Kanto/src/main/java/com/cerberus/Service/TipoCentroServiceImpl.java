package com.cerberus.Service;

import com.cerberus.Store.TipoCentroStore;
import com.cerberus.Model.TipoCentro;

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
public class TipoCentroServiceImpl implements TipoCentroService{

    //Inyectamos el controlador
    @Inject
    private TipoCentroStore tipoCentroStore;

    //Definimos el EntityManager
    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public TipoCentroServiceImpl(){

    }

    //Operaciones CRUD basicas que tendran todas las clases relacionadas con entidades de la BD

    public void addTipoCentro(TipoCentro tipoCentro) {
        tipoCentroStore.addTipoCentro(tipoCentro, entityManager);
    }

    public boolean updateTipoCentro(TipoCentro tipoCentroOld, TipoCentro tipoCentroNew) {
        return tipoCentroStore.updateTipoCentro(tipoCentroOld, tipoCentroNew, entityManager);
    }

    public boolean deleteTipoCentro(TipoCentro tipoCentro) {
        return tipoCentroStore.deleteTipoCentro(tipoCentro, entityManager);
    }

    public List<TipoCentro> findTipoCentroAll() {
        return tipoCentroStore.findTipoCentroAll(entityManager);
    }
}


