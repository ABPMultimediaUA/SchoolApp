package com.cerberus.Service;

import com.cerberus.Store.AdministradorStore;
import com.cerberus.Model.Administrador;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by Ricardo on 10/12/2016.
 */

@Stateless
@TransactionManagement(value = TransactionManagementType.CONTAINER)
public class AdministradorServiceImpl implements  AdministradorService{

    //Inyectamos el controlador
    @Inject
    private AdministradorStore administradorStore;

    //Definimos el EntityManager
    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public AdministradorServiceImpl() {
    }

    //Operaciones CRUD basicas que tendran todas las clases relacionadas con entidades de la BD

    public void addAdministrador(Administrador administrador) {
        administradorStore.addAdministrador(administrador, entityManager);
    }

    public boolean updateAdministrador(Administrador administradorOld, Administrador administradorNew) {
        return administradorStore.updateAdministrador(administradorOld, administradorNew, entityManager);
    }

    public boolean deleteAdministrador(Administrador administrador) {
        return administradorStore.deleteAdministrador(administrador, entityManager);
    }

    public List<Administrador> findAdministradorAll() {
        return administradorStore.findAdministradorAll(entityManager);
    }

}
