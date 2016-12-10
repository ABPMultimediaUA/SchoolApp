package com.cerberus.Controller;

import com.cerberus.Model.Expediente;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by Ricardo on 03/12/2016.
 */

@ApplicationScoped
public class ExpedienteController {

    public ExpedienteController(){}

    public void addExpediente(Expediente expediente, EntityManager entityManager){

        if(!entityManager.contains(expediente)){
            entityManager.persist(expediente);
        }
    }

    public boolean updateExpediente(Expediente expedienteOld, Expediente expedienteNew, EntityManager entityManager){

        boolean control = false;

        Expediente aUpdatear = entityManager.find(Expediente.class, expedienteOld.getNumExpediente());

        if(aUpdatear!=null){
            aUpdatear.setNumExpediente(expedienteNew.getNumExpediente());
            aUpdatear.setCalificaciones(expedienteNew.getCalificaciones());
            aUpdatear.setNotaMedia(expedienteNew.getNotaMedia());

            control = true;
        }

        return control;
    }

    public boolean deleteExpediente(Expediente expediente, EntityManager entityManager){

        boolean control = false;
        Expediente aBorrar = entityManager.find(Expediente.class, expediente.getNumExpediente());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Expediente> findExpedienteAll(EntityManager entityManager){

        String query = "SELECT e FROM Expediente e";

        List<Expediente> list = entityManager.createQuery(query).getResultList();

        return list;
    }
}
