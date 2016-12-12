package com.cerberus.Store;

import com.cerberus.Model.Centro;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by Ricardo on 10/12/2016.
 */

@ApplicationScoped
public class CentroStore {

    public CentroStore() {
    }

    public void addCentro(Centro centro, EntityManager entityManager){

        if(!entityManager.contains(centro)){
            entityManager.persist(centro);
        }
    }

    public boolean updateCentro(Centro centroOld, Centro centroNew, EntityManager entityManager){

        boolean control = false;

        Centro aUpdatear = entityManager.find(Centro.class, centroOld.getIdCentro());

        if(aUpdatear!=null){
            aUpdatear.setIdCentro(centroNew.getIdCentro());
            aUpdatear.setNombre(centroNew.getNombre());
            aUpdatear.setDireccion(centroNew.getDireccion());
            aUpdatear.setTipoCentro_tipo(centroNew.getTipoCentro_tipo());
            aUpdatear.setAdministrador_idAdministrador(centroNew.getAdministrador_idAdministrador());

            control = true;
        }

        return control;
    }

    public boolean deleteCentro(Centro centro, EntityManager entityManager){

        boolean control = false;
        Centro aBorrar = entityManager.find(Centro.class, centro.getIdCentro());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Centro> findCentroAll(EntityManager entityManager){

        String query = "SELECT c FROM centro c";

        List<Centro> list = entityManager.createQuery(query).getResultList();

        return list;
    }


}
