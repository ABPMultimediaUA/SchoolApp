package com.cerberus.Controller;

import com.cerberus.Model.Grupo;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by Ricardo on 03/12/2016.
 */
@ApplicationScoped
public class GrupoController {

    public GrupoController(){}

    public void addGrupo(Grupo grupo, EntityManager entityManager){

        if(!entityManager.contains(grupo)){
            entityManager.persist(grupo);
        }
    }

    public boolean updateGrupo(Grupo grupoOld, Grupo grupoNew, EntityManager entityManager){

        boolean control = false;

        Grupo aUpdatear = entityManager.find(Grupo.class, grupoOld.getId());

        if(aUpdatear!=null){
            aUpdatear.setId(grupoNew.getId());
            aUpdatear.setNombre(grupoNew.getNombre());

            control = true;
        }

        return control;
    }

    public boolean deleteGrupo(Grupo grupo, EntityManager entityManager){

        boolean control = false;
        Grupo aBorrar = entityManager.find(Grupo.class, grupo.getId());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Grupo> findGrupoAll(EntityManager entityManager){

        String query = "SELECT g FROM Grupo g";

        List<Grupo> list = entityManager.createQuery(query).getResultList();

        return list;
    }
}
