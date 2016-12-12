package com.cerberus.Service;
import com.cerberus.Store.AsistenciaStore;
import com.cerberus.Model.Asistencia;

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
public class AsistenciaServiceImpl implements AsistenciaService{

    //Inyectamos el controlador
    @Inject
    private AsistenciaStore asistenciaStore;

    //Definimos el EntityManager
    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public AsistenciaServiceImpl(){

    }

    //Operaciones CRUD basicas que tendran todas las clases relacionadas con entidades de la BD

    public void addAsistencia(Asistencia asistencia) {
        asistenciaStore.addAsistencia(asistencia, entityManager);
    }

    public boolean updateAsistencia(Asistencia asistenciaOld, Asistencia asistenciaNew) {
        return asistenciaStore.updateAsistencia(asistenciaOld, asistenciaNew, entityManager);
    }

    public boolean deleteAsistencia(Asistencia asistencia) {
        return asistenciaStore.deleteAsistencia(asistencia, entityManager);
    }

    public List<Asistencia> findAsistenciaAll() {
        return asistenciaStore.findAsistenciaAll(entityManager);
    }
}
    

