package com.cerberus.Service;
import com.cerberus.Store.TareaStore;
import com.cerberus.Model.Tarea;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
/**
 * Created by Manuel on 09/12/2016.
 */


@Stateless
@TransactionManagement(value = TransactionManagementType.CONTAINER)
public class TareaServiceImpl implements TareaService{

    //Inyectamos el controlador
    @Inject
    private TareaStore tareaStore;

    //Definimos el EntityManager
    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public TareaServiceImpl(){

    }

    //Operaciones CRUD basicas que tendran todas las clases relacionadas con entidades de la BD

    public void addTarea(Tarea tarea) {
        tareaStore.addTarea(tarea, entityManager);
    }

    public boolean updateTarea(Tarea tareaOld, Tarea tareaNew) {
        return tareaStore.updateTarea(tareaOld, tareaNew, entityManager);
    }

    public boolean deleteTarea(Tarea tarea) {
        return tareaStore.deleteTarea(tarea, entityManager);
    }

    public List<Tarea> findTareaAll() {
        return tareaStore.findTareaAll(entityManager);
    }
}
    

