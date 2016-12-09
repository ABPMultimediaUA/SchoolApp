package com.cerberus.Service;
import com.cerberus.Store.ExamenStore;
import com.cerberus.Model.Examen;

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
    public class ExamenServiceImpl implements ExamenService{

        //Inyectamos el controlador
        @Inject
        private ExamenStore examenStore;

        //Definimos el EntityManager
        @PersistenceContext(unitName = "KantoJPA")
        EntityManager entityManager;

        public ExamenServiceImpl(){

        }

        //Operaciones CRUD basicas que tendran todas las clases relacionadas con entidades de la BD

        public void addExamen(Examen examen) {
            examenStore.addExamen(examen, entityManager);
        }

        public boolean updateExamen(Examen examenOld, Examen examenNew) {
            return examenStore.updateExamen(examenOld, examenNew, entityManager);
        }

        public boolean deleteExamen(Examen examen) {
            return examenStore.deleteExamen(examen, entityManager);
        }

        public List<Examen> findExamenAll() {
            return examenStore.findExamenAll(entityManager);
        }
    }
    

