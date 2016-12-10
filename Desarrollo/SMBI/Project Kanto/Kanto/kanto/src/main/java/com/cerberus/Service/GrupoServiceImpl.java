package com.cerberus.Service;

import com.cerberus.Controller.GrupoController;
import com.cerberus.Model.Grupo;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by Ricardo on 03/12/2016.
 */

@Stateless
@TransactionManagement(value = TransactionManagementType.CONTAINER)
public class GrupoServiceImpl implements GrupoService{

    @Inject
    private GrupoController grupoController;

    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public GrupoServiceImpl(){}

    public void addGrupo(Grupo grupo) {
        grupoController.addGrupo(grupo, entityManager);
    }

    public boolean updateGrupo(Grupo grupoOld, Grupo grupoNew) {
        return grupoController.updateGrupo(grupoOld, grupoNew, entityManager);
    }

    public boolean deleteGrupo(Grupo grupo) {
        return grupoController.deleteGrupo(grupo, entityManager);
    }

    public List<Grupo> findGrupoAll() {
        return grupoController.findGrupoAll(entityManager);
    }
}
