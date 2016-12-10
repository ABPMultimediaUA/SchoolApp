package com.cerberus.Store;

import com.cerberus.Model.Alumno;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by Antonio on 01/12/2016.
 *
 * Bean manejado por EJB que se encarga de implementar mediante JPA y JPQL las operaciones CRUD basicas que tendran
 * todas las entidades. Al ser @ApplicationScoped, el Bean estara vivo durante las invocaciones a los Servlet
 * del servidor de aplicaciones y durante las invocaciones a los WebService que empleemos.
 *
 * Debido a que la BD no esta aun completamente definida, los 4 metodos estan algo mas simplificados
 * de lo que serian en la version definitiva (No tenemos que preocuparnos de claves ajenas).
 */

@ApplicationScoped
public class AlumnoStore {

    public AlumnoStore(){}

    public void addAlumno(Alumno alumno, EntityManager entityManager){

        if(!entityManager.contains(alumno)){
            entityManager.persist(alumno);
        }
    }

    public boolean updateAlumno(Alumno alumnoOld, Alumno alumnoNew, EntityManager entityManager){

        boolean control = false;

        Alumno aUpdatear = entityManager.find(Alumno.class, alumnoOld.getDni());

        if(aUpdatear!=null){
            aUpdatear.setDni(alumnoNew.getDni());
            aUpdatear.setNombre(alumnoNew.getNombre());
            aUpdatear.setApellidos(alumnoNew.getApellidos());

            control = true;
        }

        return control;
    }

    public boolean deleteAlumno(Alumno alumno, EntityManager entityManager){

        boolean control = false;
        Alumno aBorrar = entityManager.find(Alumno.class, alumno.getDni());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Alumno> findAlumnoAll(EntityManager entityManager){

        String query = "SELECT a FROM Alumno a";

        List<Alumno> list = entityManager.createQuery(query).getResultList();

        return list;
    }
}
