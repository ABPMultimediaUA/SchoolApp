package com.cerberus.Store;

import com.cerberus.Model.Administrador;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by Ricardo on 10/12/2016.
 */

@ApplicationScoped
public class AdministradorStore {

    public AdministradorStore() {
    }

    public void addAdministrador(Administrador administrador, EntityManager entityManager){

        if(!entityManager.contains(administrador)){
            entityManager.persist(administrador);
        }
    }

    public boolean updateAdministrador(Administrador administradorOld, Administrador administradorNew, EntityManager entityManager){

        boolean control = false;

        Administrador aUpdatear = entityManager.find(Administrador.class, administradorOld.getIdAdministrador());

        if(aUpdatear!=null){
            aUpdatear.setIdAdministrador(administradorNew.getIdAdministrador());
            aUpdatear.setNombre(administradorNew.getNombre());
            aUpdatear.setApellidos(administradorNew.getApellidos());
            aUpdatear.setUser(administradorNew.getUser());
            aUpdatear.setPassword(administradorNew.getPassword());
            aUpdatear.setEmail(administradorNew.getEmail());
            aUpdatear.setTelefono(administradorNew.getTelefono());

            control = true;
        }

        return control;
    }

    public boolean deleteAdministrador(Administrador administrador, EntityManager entityManager){

        boolean control = false;
        Administrador aBorrar = entityManager.find(Administrador.class, administrador.getIdAdministrador());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Administrador> findAdministradorAll(EntityManager entityManager){

        String query = "SELECT a FROM Administrador a";

        List<Administrador> list = entityManager.createQuery(query).getResultList();

        return list;
    }
}
