package com.cerberus.Service;

import com.cerberus.Model.Material;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Ricardo on 10/12/2016.
 */

@Local
public interface MaterialService {

    public void addMaterial(Material material);
    public boolean updateMaterial(Material materialOld, Material materialNew);
    public boolean deleteMaterial(Material material);
    public List<Material> findMaterialAll();
}
