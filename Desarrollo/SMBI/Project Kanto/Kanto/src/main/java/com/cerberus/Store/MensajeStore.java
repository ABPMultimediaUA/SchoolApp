package com.cerberus.Store;

import com.cerberus.Model.Mensaje;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by Naiara on 13/12/2016.
 */

@ApplicationScoped
public class MensajeStore {

    public MensajeStore(){}

    public void addMensaje(Mensaje mensaje, EntityManager entityManager){

        if(!entityManager.contains(mensaje)){
            entityManager.persist(mensaje);
        }
    }

    public boolean updateMensaje(Mensaje mensajeOld, Mensaje mensajeNew, EntityManager entityManager){

        boolean control = false;

        Mensaje aUpdatear = entityManager.find(Mensaje.class, mensajeOld.getIdmensaje());

        if(aUpdatear!=null){
            aUpdatear.setChat_Padre(mensajeNew.getChat_Padre());
            aUpdatear.setChat_Profesor(mensajeNew.getChat_Profesor());
            aUpdatear.setProfesor(mensajeNew.getProfesor());
            aUpdatear.setTexto(mensajeNew.getTexto());
            aUpdatear.setIdmensaje(mensajeNew.getIdmensaje());

            control = true;
        }

        return control;
    }

    public boolean deleteMensaje(Mensaje alumno, EntityManager entityManager){

        boolean control = false;
        Mensaje aBorrar = entityManager.find(Mensaje.class, alumno.getIdmensaje());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Mensaje> findMensajeAll(EntityManager entityManager){

        String query = "SELECT men FROM Mensaje men";

        List<Mensaje> list = entityManager.createQuery(query).getResultList();

        return list;
    }
}
