package com.cerberus.Store;

import com.cerberus.Model.Comentario_Profesor;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by Naiara on 12/12/2016.
 *
 * Bean manejado por EJB que se encarga de implementar mediante JPA y JPQL las operaciones CRUD basicas que tendran
 * todas las entidades. Al ser @ApplicationScoped, el Bean estara vivo durante las invocaciones a los Servlet
 * del servidor de aplicaciones y durante las invocaciones a los WebService que empleemos.
 *
 * Debido a que la BD no esta aun completamente definida, los 4 metodos estan algo mas simplificados
 * de
 */

@ApplicationScoped
public class Comentario_ProfesorStore {
    public Comentario_ProfesorStore(){}

    public void addComentario_Profesor(Comentario_Profesor comentario_profesor, EntityManager entityManager){

        if(!entityManager.contains(comentario_profesor)){
            entityManager.persist(comentario_profesor);
        }
    }

    public boolean updateComentario_Profesor(Comentario_Profesor comentario_profesorOld, Comentario_Profesor comentario_profesorNew, EntityManager entityManager){

        boolean control = false;

        Comentario_Profesor aUpdatear = entityManager.find(Comentario_Profesor.class, comentario_profesorOld.getIdComentario());

        if(aUpdatear!=null){
            aUpdatear.setTexto(comentario_profesorNew.getTexto());
            aUpdatear.setFecha(comentario_profesorNew.getFecha());
            aUpdatear.setForo_idForo(comentario_profesorNew.getForo_idForo());
            aUpdatear.setIdComentario(comentario_profesorNew.getIdComentario());
            aUpdatear.setFecha(comentario_profesorNew.getFecha());

            control = true;
        }

        return control;
    }

    public boolean deleteComentario_Profesor(Comentario_Profesor comentario_profesor, EntityManager entityManager){

        boolean control = false;
        Comentario_Profesor aBorrar = entityManager.find(Comentario_Profesor.class, comentario_profesor.getIdComentario());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Comentario_Profesor> findComentario_ProfesorAll(EntityManager entityManager){

        String query = "SELECT com_prof FROM Comentario_Profesor com_prof";

        List<Comentario_Profesor> list = entityManager.createQuery(query).getResultList();

        return list;
    }
}
