package com.cerberus.Service;

import com.cerberus.Controller.AlumnoController;
import com.cerberus.Model.Alumno;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by Antonio on 01/12/2016.
 *
 * Definimos que el EJB va a ser Stateless, ya que no queremos que guarde informacion entre sesiones, de la
 * persistencia se encargara JPA con la BD. El manejo de transaccionalidad se realizara por parte del contenedor.
 */

@Stateless
@TransactionManagement(value = TransactionManagementType.CONTAINER)
public class AlumnoServiceImpl implements AlumnoService{

    //Inyectamos el controlador
    @Inject
    private AlumnoController alumnoController;

    //Definimos el EntityManager
    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public AlumnoServiceImpl(){

    }

    //Operaciones CRUD basicas que tendran todas las clases relacionadas con entidades de la BD

    public void addAlumno(Alumno alumno) {
        alumnoController.addAlumno(alumno, entityManager);
    }

    public boolean updateAlumno(Alumno alumnoOld, Alumno alumnoNew) {
        return alumnoController.updateAlumno(alumnoOld, alumnoNew, entityManager);
    }

    public boolean deleteAlumno(Alumno alumno) {
        return alumnoController.deleteAlumno(alumno, entityManager);
    }

    public List<Alumno> findAlumnoAll() {
        return alumnoController.findAlumnoAll(entityManager);
    }
}
