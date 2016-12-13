package com.cerberus.Store;

import com.cerberus.Model.Alumno;
import com.cerberus.Model.Padre;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by Naiara on 12/12/2016.
 */

@ApplicationScoped
public class PadreStore {
    public PadreStore(){}

    public void addPadre(Padre padre, EntityManager entityManager){

        if(!entityManager.contains(padre)){
            entityManager.persist(padre);
        }
    }

    public boolean updatePadre(Padre padreOld, Padre padreNew, EntityManager entityManager){

        boolean control = false;

        Padre aUpdatear = entityManager.find(Padre.class, padreOld.getDni());

        if(aUpdatear!=null){
            aUpdatear.setTelefono(padreNew.getTelefono());
            aUpdatear.setUser(padreNew.getUser());
            aUpdatear.setPassword(padreNew.getPassword());
            aUpdatear.setIdPadre(padreNew.getIdPadre());
            aUpdatear.setAlumno(padreNew.getAlumno());
            aUpdatear.setEmail(padreNew.getEmail());
            aUpdatear.setDni(padreNew.getDni());
            aUpdatear.setNombre(padreNew.getNombre());
            aUpdatear.setApellidos(padreNew.getApellidos());

            control = true;
        }

        return control;
    }

    public boolean deletePadre(Padre padre, EntityManager entityManager){

        boolean control = false;
        Padre aBorrar = entityManager.find(Padre.class, padre.getDni());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Padre> findPadreAll(EntityManager entityManager){

        String query = "SELECT p FROM Padre p";

        List<Padre> list = entityManager.createQuery(query).getResultList();

        return list;
    }

}
