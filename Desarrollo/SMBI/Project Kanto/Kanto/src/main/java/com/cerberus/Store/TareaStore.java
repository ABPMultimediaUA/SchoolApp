package com.cerberus.Store;
import com.cerberus.Model.Tarea;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;
/**
 * Created by Manuel on 09/12/2016.
 */
@ApplicationScoped
public class TareaStore {

    public TareaStore(){}

    public void addTarea(Tarea tarea, EntityManager entityManager){

        if(!entityManager.contains(tarea)){
            entityManager.persist(tarea);
        }
    }

    public boolean updateTarea(Tarea tareaOld, Tarea tareaNew, EntityManager entityManager){

        boolean control = false;

        Tarea aUpdatear = entityManager.find(Tarea.class, tareaOld.getIdTarea());

        if(aUpdatear!=null){
            aUpdatear.setIdTarea(tareaNew.getIdTarea());
            aUpdatear.setFecha_limite(tareaNew.getFecha_limite());
            aUpdatear.setDescripcion(tareaNew.getDescripcion());
            aUpdatear.setCompletada(tareaNew.getCompletada());
            aUpdatear.setIdAsignatura(tareaNew.getIdAsignatura());
            aUpdatear.setIdCurso(tareaNew.getIdCurso());
            aUpdatear.setIdAlumno(tareaNew.getIdAlumno());
            control = true;
        }

        return control;
    }

    public boolean deleteTarea(Tarea tarea, EntityManager entityManager){

        boolean control = false;
        Tarea aBorrar = entityManager.find(Tarea.class, tarea.getIdTarea());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Tarea> findTareaAll(EntityManager entityManager){

        String query = "SELECT a FROM Tarea a";

        List<Tarea> list = entityManager.createQuery(query).getResultList();

        return list;
    }
}
