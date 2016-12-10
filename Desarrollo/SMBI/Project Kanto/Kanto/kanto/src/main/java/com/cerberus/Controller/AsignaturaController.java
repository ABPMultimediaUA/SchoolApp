package com.cerberus.Controller;

import com.cerberus.Model.Asignatura;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by Antonio on 12/2/2016.
 */

@ApplicationScoped
public class AsignaturaController {

    public AsignaturaController(){}

    public void addAsignatura(Asignatura asignatura, EntityManager entityManager){

        if(!entityManager.contains(asignatura)){
            entityManager.persist(asignatura);
        }
    }

    public boolean updateAsignatura(Asignatura asignaturaOld, Asignatura asignaturaNew, EntityManager entityManager){

        boolean control = false;

        Asignatura aUpdatear = entityManager.find(Asignatura.class, asignaturaOld.getId());

        if(aUpdatear!=null){
            aUpdatear.setId(asignaturaNew.getId());
            aUpdatear.setNombre(asignaturaNew.getNombre());
            aUpdatear.setProfesor(asignaturaNew.getProfesor());

            control = true;
        }

        return control;
    }

    public boolean deleteAsignatura(Asignatura asignatura, EntityManager entityManager){

        boolean control = false;
        Asignatura aBorrar = entityManager.find(Asignatura.class, asignatura.getId());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Asignatura> findAsignaturaAll(EntityManager entityManager){

        String query = "SELECT a FROM Asignatura a";

        List<Asignatura> list = entityManager.createQuery(query).getResultList();

        return list;
    }
}
