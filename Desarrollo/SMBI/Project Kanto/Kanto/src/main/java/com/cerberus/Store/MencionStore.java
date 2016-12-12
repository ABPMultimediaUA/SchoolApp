package com.cerberus.Store;
import com.cerberus.Model.Mencion;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;
/**
 * Created by Manuel on 09/12/2016.
 */
@ApplicationScoped
public class MencionStore {

    public MencionStore(){}

    public void addMencion(Mencion mencion, EntityManager entityManager){

        if(!entityManager.contains(mencion)){
            entityManager.persist(mencion);
        }
    }

    public boolean updateMencion(Mencion mencionOld, Mencion mencionNew, EntityManager entityManager){

        boolean control = false;

        Mencion aUpdatear = entityManager.find(Mencion.class, mencionOld.getIdMencion());

        if(aUpdatear!=null){
            aUpdatear.setIdMencion(mencionNew.getIdMencion());
            aUpdatear.setTitulo(mencionNew.getTitulo());
            control = true;
        }

        return control;
    }

    public boolean deleteMencion(Mencion mencion, EntityManager entityManager){

        boolean control = false;
        Mencion aBorrar = entityManager.find(Mencion.class, mencion.getIdMencion());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Mencion> findMencionAll(EntityManager entityManager){

        String query = "SELECT a FROM Mencion a";

        List<Mencion> list = entityManager.createQuery(query).getResultList();

        return list;
    }
}
