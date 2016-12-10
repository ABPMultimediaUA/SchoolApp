package com.cerberus.Controller;

import com.cerberus.Model.Profesor;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by Ricardo on 02/12/2016.
 */

@ApplicationScoped
public class ProfesorController {

    public ProfesorController(){}

    public void addProfesor(Profesor profesor, EntityManager entityManager){

        if(!entityManager.contains(profesor)){
            entityManager.persist(profesor);
        }
    }

    public boolean updateProfesor(Profesor profesorOld, Profesor profesorNew, EntityManager entityManager){

        boolean control = false;

        Profesor aUpdatear = entityManager.find(Profesor.class, profesorOld.getDni());

        if(aUpdatear!=null){
            aUpdatear.setDni(profesorNew.getDni());
            aUpdatear.setNombre(profesorNew.getNombre());
            aUpdatear.setApellidos(profesorNew.getApellidos());
            aUpdatear.setEmail(profesorNew.getEmail());
            aUpdatear.setTelefono(profesorNew.getTelefono());

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

        String query = "SELECT p FROM Profesor p";

        List<Profesor> list = entityManager.createQuery(query).getResultList();

        return list;
    }
}
