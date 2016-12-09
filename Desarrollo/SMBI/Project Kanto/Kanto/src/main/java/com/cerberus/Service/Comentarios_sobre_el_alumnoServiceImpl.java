package com.cerberus.Service;
import com.cerberus.Store.Comentarios_sobre_el_alumnoStore;
import com.cerberus.Model.Comentarios_sobre_el_alumno;

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
public class Comentarios_sobre_el_alumnoServiceImpl implements Comentarios_sobre_el_alumnoService{

    //Inyectamos el controlador
    @Inject
    private Comentarios_sobre_el_alumnoStore comentarios_sobre_el_alumnoStore;

    //Definimos el EntityManager
    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public Comentarios_sobre_el_alumnoServiceImpl(){

    }

    //Operaciones CRUD basicas que tendran todas las clases relacionadas con entidades de la BD

    public void addComentarios_sobre_el_alumno(Comentarios_sobre_el_alumno comentarios_sobre_el_alumno) {
        comentarios_sobre_el_alumnoStore.addComentarios_sobre_el_alumno(comentarios_sobre_el_alumno, entityManager);
    }

    public boolean updateComentarios_sobre_el_alumno(Comentarios_sobre_el_alumno comentarios_sobre_el_alumnoOld, Comentarios_sobre_el_alumno comentarios_sobre_el_alumnoNew) {
        return comentarios_sobre_el_alumnoStore.updateComentarios_sobre_el_alumno(comentarios_sobre_el_alumnoOld, comentarios_sobre_el_alumnoNew, entityManager);
    }

    public boolean deleteComentarios_sobre_el_alumno(Comentarios_sobre_el_alumno comentarios_sobre_el_alumno) {
        return comentarios_sobre_el_alumnoStore.deleteComentarios_sobre_el_alumno(comentarios_sobre_el_alumno, entityManager);
    }

    public List<Comentarios_sobre_el_alumno> findComentarios_sobre_el_alumnoAll() {
        return comentarios_sobre_el_alumnoStore.findComentarios_sobre_el_alumnoAll(entityManager);
    }
}
    

