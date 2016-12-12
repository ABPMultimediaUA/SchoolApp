package com.cerberus.Service;

import com.cerberus.Store.MaterialStore;
import com.cerberus.Model.Material;

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
public class MaterialServiceImpl implements MaterialService{

    //Inyectamos el controlador
    @Inject
    private MaterialStore materialStore;

    //Definimos el EntityManager
    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public MaterialServiceImpl() {
    }

    //Operaciones CRUD basicas que tendran todas las clases relacionadas con entidades de la BD

    public void addMaterial(Material material) {
        materialStore.addMaterial(material, entityManager);
    }

    public boolean updateMaterial(Material materialOld, Material materialNew) {
        return materialStore.updateMaterial(materialOld, materialNew, entityManager);
    }

    public boolean deleteMaterial(Material material) {
        return materialStore.deleteMaterial(material, entityManager);
    }

    public List<Material> findMaterialAll() {
        return materialStore.findMaterialAll(entityManager);
    }
}
