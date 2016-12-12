package com.cerberus.Service;

import com.cerberus.Model.Administrador;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Ricardo on 10/12/2016.
 */

@Local
public interface AdministradorService {

    public void addAdministrador(Administrador administrador);
    public boolean updateAdministrador(Administrador administradorOld, Administrador administradorNew);
    public boolean deleteAdministrador(Administrador administrador);
    public List<Administrador> findAdministradorAll();
}
