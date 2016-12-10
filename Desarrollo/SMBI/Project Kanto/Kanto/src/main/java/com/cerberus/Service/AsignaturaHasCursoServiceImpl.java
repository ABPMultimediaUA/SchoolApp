package com.cerberus.Service;

import com.cerberus.Store.AsignaturaHasCursoStore;
import com.cerberus.Model.AsignaturaHasCurso;

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
public class AsignaturaHasCursoServiceImpl implements AsignaturaHasCursoService{
    //Inyectamos el controlador
    @Inject
    private AsignaturaHasCursoStore asignaturaHasCursoStore;

    //Definimos el EntityManager
    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public AsignaturaHasCursoServiceImpl(){

    }

    public void addAsignaturaHasCursoService(AsignaturaHasCursoService asignaturaHasCursoService){}
    public boolean updateAsignaturaHasCursoService(AsignaturaHasCursoService asignaturaHasCursoServiceOld, AsignaturaHasCursoService asignaturaHasCursoServiceNew){return false;}
    public boolean deleteAsignaturaHasCursoService(AsignaturaHasCursoService asignaturaHasCursoServic){return false;}
    public List<AsignaturaHasCursoService> findAsignaturaHasCursoServiceAll(){return null;}
}
