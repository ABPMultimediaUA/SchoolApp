package com.cerberus.Store;

import com.cerberus.Model.Material;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by Ricardo on 10/12/2016.
 */

@ApplicationScoped
public class MaterialStore {

    public MaterialStore() {
    }

    public void addMaterial(Material material, EntityManager entityManager){

        if(!entityManager.contains(material)){
            entityManager.persist(material);
        }
    }

    public boolean updateMaterial(Material materialOld, Material materialNew, EntityManager entityManager){

        boolean control = false;

        Material aUpdatear = entityManager.find(Material.class, materialOld.getIdMaterial());

        if(aUpdatear!=null){
            aUpdatear.setIdMaterial(materialNew.getIdMaterial());
            aUpdatear.setContenido(materialNew.getContenido());
            aUpdatear.setAsignatura_has_curso_Asgnatura_id_Asignatura(materialNew.getAsignatura_has_curso_Asgnatura_id_Asignatura());
            aUpdatear.setAsignatura_has_curso_Curso_id_Curso(materialNew.getAsignatura_has_curso_Curso_id_Curso());

            control = true;
        }

        return control;
    }

    public boolean deleteMaterial(Material material, EntityManager entityManager){

        boolean control = false;
        Material aBorrar = entityManager.find(Material.class, material.getIdMaterial());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Material> findMaterialAll(EntityManager entityManager){

        String query = "SELECT m FROM Material m";

        List<Material> list = entityManager.createQuery(query).getResultList();

        return list;
    }
}
