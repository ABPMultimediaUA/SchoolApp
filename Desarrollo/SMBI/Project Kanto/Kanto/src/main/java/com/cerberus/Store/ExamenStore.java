package com.cerberus.Store;
import com.cerberus.Model.Examen;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;
/**
 * Created by Manuel on 09/12/2016.
 */
@ApplicationScoped
public class ExamenStore {

    public ExamenStore(){}

    public void addExamen(Examen examen, EntityManager entityManager){

        if(!entityManager.contains(examen)){
            entityManager.persist(examen);
        }
    }

    public boolean updateExamen(Examen examenOld, Examen examenNew, EntityManager entityManager){

        boolean control = false;

        Examen aUpdatear = entityManager.find(Examen.class, examenOld.getIdExamen());

        if(aUpdatear!=null){
            aUpdatear.setIdExamen(examenNew.getIdExamen());
            aUpdatear.setFecha(examenNew.getFecha());
            aUpdatear.setNota(examenNew.getNota());
            aUpdatear.setIdAsignatura(examenNew.getIdAsignatura());
            aUpdatear.setIdCurso(examenNew.getIdCurso());
            aUpdatear.setIdAlumno(examenNew.getIdAlumno());

            control = true;
        }

        return control;
    }

    public boolean deleteExamen(Examen examen, EntityManager entityManager){

        boolean control = false;
        Examen aBorrar = entityManager.find(Examen.class, examen.getIdExamen());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Examen> findExamenAll(EntityManager entityManager){

        String query = "SELECT a FROM Examen a";

        List<Examen> list = entityManager.createQuery(query).getResultList();

        return list;
    }
}
