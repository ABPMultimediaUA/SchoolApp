package com.cerberus.Store;
import com.cerberus.Model.Comentarios_sobre_el_alumno;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;
/**
 * Created by Manuel on 09/12/2016.
 */
@ApplicationScoped
public class Comentarios_sobre_el_alumnoStore {

    public Comentarios_sobre_el_alumnoStore(){}

    public void addComentarios_sobre_el_alumno(Comentarios_sobre_el_alumno comentarios_sobre_el_alumno, EntityManager entityManager){

        if(!entityManager.contains(comentarios_sobre_el_alumno)){
            entityManager.persist(comentarios_sobre_el_alumno);
        }
    }

    public boolean updateComentarios_sobre_el_alumno(Comentarios_sobre_el_alumno comentarios_sobre_el_alumnoOld, Comentarios_sobre_el_alumno comentarios_sobre_el_alumnoNew, EntityManager entityManager){

        boolean control = false;

        Comentarios_sobre_el_alumno aUpdatear = entityManager.find(Comentarios_sobre_el_alumno.class, comentarios_sobre_el_alumnoOld.getIdComentarios_sobre_el_alumno());

        if(aUpdatear!=null){
            aUpdatear.setIdComentarios_sobre_el_alumno(comentarios_sobre_el_alumnoNew.getIdComentarios_sobre_el_alumno());
            aUpdatear.setTitulo(comentarios_sobre_el_alumnoNew.getTitulo());
            aUpdatear.setTexto(comentarios_sobre_el_alumnoNew.getTexto());
            aUpdatear.setIdAsignatura(comentarios_sobre_el_alumnoNew.getIdAsignatura());
            aUpdatear.setIdCurso(comentarios_sobre_el_alumnoNew.getIdCurso());
            aUpdatear.setIdAlumno(comentarios_sobre_el_alumnoNew.getIdAlumno());
            control = true;
        }

        return control;
    }

    public boolean deleteComentarios_sobre_el_alumno(Comentarios_sobre_el_alumno comentarios_sobre_el_alumno, EntityManager entityManager){

        boolean control = false;
        Comentarios_sobre_el_alumno aBorrar = entityManager.find(Comentarios_sobre_el_alumno.class, comentarios_sobre_el_alumno.getIdComentarios_sobre_el_alumno());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Comentarios_sobre_el_alumno> findComentarios_sobre_el_alumnoAll(EntityManager entityManager){

        String query = "SELECT a FROM Comentarios_sobre_el_alumno a";

        List<Comentarios_sobre_el_alumno> list = entityManager.createQuery(query).getResultList();

        return list;
    }
}
