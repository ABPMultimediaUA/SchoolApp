package com.cerberus.Store;

import com.cerberus.Model.Profesor;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by Naiara on 12/12/2016.
 */
@ApplicationScoped
public class ProfesorStore {

    public ProfesorStore(){}

    public void addProfesor(Profesor profesor, EntityManager entityManager){

        if(!entityManager.contains(profesor)){
            entityManager.persist(profesor);
        }
    }

    public boolean updateProfesor(Profesor profesorOld, Profesor profesorNew, EntityManager entityManager){

        boolean control = false;

        Profesor aUpdatear = entityManager.find(Profesor.class, profesorOld.getDni());

        if(aUpdatear!=null){
            aUpdatear.setIdProfesor(profesorNew.getIdProfesor());
            aUpdatear.setTelefono(profesorNew.getTelefono());
            //aUpdatear.setUser(profesorNew.getUser());
            //aUpdatear.setPassword(profesorNew.getPassword());
            aUpdatear.setEmail(profesorNew.getEmail());
            aUpdatear.setDni(profesorNew.getDni());
            aUpdatear.setNombre(profesorNew.getNombre());
            aUpdatear.setApellidos(profesorNew.getApellidos());

            control = true;
        }

        return control;
    }

    public boolean deleteProfesor(Profesor profesor, EntityManager entityManager){

        boolean control = false;
        Profesor aBorrar = entityManager.find(Profesor.class, profesor.getDni());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Profesor> findProfesorAll(EntityManager entityManager){

        String query = "SELECT pro FROM Profesor pro";

        List<Profesor> list = entityManager.createQuery(query).getResultList();

        return list;
    }

}
