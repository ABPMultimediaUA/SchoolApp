package com.cerberus.Store;

import com.cerberus.Model.TipoCentro;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by Ricardo on 10/12/2016.
 */

@ApplicationScoped
public class TipoCentroStore {

    public TipoCentroStore(){}

    public void addTipoCentro(TipoCentro tipoCentro, EntityManager entityManager){

        if(!entityManager.contains(tipoCentro)){
            entityManager.persist(tipoCentro);
        }
    }

    public boolean updateTipoCentro(TipoCentro tipoCentroOld, TipoCentro tipoCentroNew, EntityManager entityManager){

        boolean control = false;

        TipoCentro aUpdatear = entityManager.find(TipoCentro.class, tipoCentroOld.getTipo());

        if(aUpdatear!=null){
            aUpdatear.setTipo(tipoCentroNew.getTipo());
            control = true;
        }

        return control;
    }

    public boolean deleteTipoCentro(TipoCentro tipoCentro, EntityManager entityManager){

        boolean control = false;
        TipoCentro aBorrar = entityManager.find(TipoCentro.class, tipoCentro.getTipo());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<TipoCentro> findTipoCentroAll(EntityManager entityManager){

        String query = "SELECT t FROM tipocentro t";

        List<TipoCentro> list = entityManager.createQuery(query).getResultList();

        return list;
    }
}
