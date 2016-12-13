package com.cerberus.Service;

import com.cerberus.Store.Comentario_ProfesorStore;
import com.cerberus.Model.Comentario_Profesor;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by Naiara on 12/12/2016.
 */

@Stateless
@TransactionManagement(value = TransactionManagementType.CONTAINER)

//NO VEO EL ERROR!!!!!!!!!!!!!!


public class Comentario_ProfesorServiceImpl implements Comentario_ProfesorService{
    //Inyectamos el controlador
    @Inject
    private Comentario_ProfesorStore comentario_profesorStore;

    //Definimos el EntityManager
    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public Comentario_ProfesorServiceImpl(){

    }

    //Operaciones CRUD basicas que tendran todas las clases relacionadas con entidades de la BD

    public void addComentario_Profesor(Comentario_Profesor comentario_profesor) {
        comentario_profesorStore.addComentario_Profesor(comentario_profesor, entityManager);
    }

    public boolean updateComentario_Profesor(Comentario_Profesor comentario_profesorOld, Comentario_Profesor comentario_profesorNew) {
        return comentario_profesorStore.updateComentario_Profesor(comentario_profesorOld, comentario_profesorNew, entityManager);
    }

    public boolean deleteComentario_Profesor(Comentario_Profesor comentario_profesor) {
        return comentario_profesorStore.deleteComentario_Profesor(comentario_profesor, entityManager);
    }

    public List<Comentario_Profesor> findComentario_ProfesorAll() {
        return comentario_profesorStore.findComentario_ProfesorAll(entityManager);
    }

}
