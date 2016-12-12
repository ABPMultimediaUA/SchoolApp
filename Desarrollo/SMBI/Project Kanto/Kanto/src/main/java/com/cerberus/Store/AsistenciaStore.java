package com.cerberus.Store;
import com.cerberus.Model.Asistencia;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;
/**
 * Created by Manuel on 09/12/2016.
 */
@ApplicationScoped
public class AsistenciaStore {

    public AsistenciaStore(){}

    public void addAsistencia(Asistencia asistencia, EntityManager entityManager){

        if(!entityManager.contains(asistencia)){
            entityManager.persist(asistencia);
        }
    }

    public boolean updateAsistencia(Asistencia asistenciaOld, Asistencia asistenciaNew, EntityManager entityManager){

        boolean control = false;

        Asistencia aUpdatear = entityManager.find(Asistencia.class, asistenciaOld.getIdAsistencia());

        if(aUpdatear!=null){
            aUpdatear.setIdAsistencia(asistenciaNew.getIdAsistencia());
            aUpdatear.setFecha(asistenciaNew.getFecha());
            aUpdatear.setDescripcion(asistenciaNew.getDescripcion());
            aUpdatear.setFalta(asistenciaNew.getFalta());
            aUpdatear.setIdAsignatura(asistenciaNew.getIdAsignatura());
            aUpdatear.setIdCurso(asistenciaNew.getIdCurso());
            aUpdatear.setIdAlumno(asistenciaNew.getIdAlumno());
            control = true;
        }

        return control;
    }

    public boolean deleteAsistencia(Asistencia asistencia, EntityManager entityManager){

        boolean control = false;
        Asistencia aBorrar = entityManager.find(Asistencia.class, asistencia.getIdAsistencia());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Asistencia> findAsistenciaAll(EntityManager entityManager){

        String query = "SELECT a FROM Asistencia a";

        List<Asistencia> list = entityManager.createQuery(query).getResultList();

        return list;
    }
}
