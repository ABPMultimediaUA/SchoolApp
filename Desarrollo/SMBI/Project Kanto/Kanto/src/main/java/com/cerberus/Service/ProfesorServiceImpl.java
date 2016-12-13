package com.cerberus.Service;

import com.cerberus.Store.ProfesorStore;
import com.cerberus.Model.Profesor;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by Naiara on 12/12/2016.
 */

@Stateless
@TransactionManagement(value = TransactionManagementType.CONTAINER)
public class ProfesorServiceImpl implements ProfesorService{

        //Inyectamos el controlador
        @Inject
        private ProfesorStore profesorStore;

        //Definimos el EntityManager
        @PersistenceContext(unitName = "KantoJPA")
        EntityManager entityManager;

        public ProfesorServiceImpl(){

        }

        //Operaciones CRUD basicas que tendran todas las clases relacionadas con entidades de la BD

        public void addProfesor(Profesor profesor) {
            profesorStore.addProfesor(profesor, entityManager);
        }

        public boolean updateProfesor(Profesor profesorOld, Profesor profesorNew) {
            return profesorStore.updateProfesor(profesorOld, profesorNew, entityManager);
        }

        public boolean deleteProfesor(Profesor profesor) {
            return profesorStore.deleteProfesor(profesor, entityManager);
        }

        public List<Profesor> findProfesorAll() {
            return profesorStore.findProfesorAll(entityManager);
        }

}

